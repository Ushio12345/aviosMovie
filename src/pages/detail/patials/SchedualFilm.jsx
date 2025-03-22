import React, { useState } from "react";
import { useEffect } from "react";
import { getThongTinLichChieuPhim } from "../../cinema/services/FilmsServices";
import { ExpandMore } from "@mui/icons-material";
import SelectedDate from "./SelectedDate";
import { useNavigate } from "react-router-dom";
export default function SchedualFilm({ maPhim }) {
    const [inforFilm, setInforFilm] = useState({});
    const [listHeThong, setListHeThong] = useState([]);
    const [selectedNgay, setSelectedNgay] = useState(null);
    const [selectedHeThong, setSelectedHeThong] = useState(null);
    const [isOpenTime, setIsOpenTime] = useState(null);
    const [maLichChieu, setMalichChieu] = useState(null);
    const navigator = useNavigate();
    useEffect(() => {
        fetchInforFilm();
    }, [maPhim]);

    const fetchInforFilm = async () => {
        try {
            const res = await getThongTinLichChieuPhim(maPhim);
            if (!res) return;
            const heThongRap = res.data.content || [];
            // console.log(
            //     "malich",
            //     heThongRap.heThongRapChieu.flatMap((ht) => ht.cumRapChieu.flatMap((cum) => cum.lichChieuPhim.flatMap((lich) => lich.maLichChieu)))
            // );

            setInforFilm(heThongRap);
            setListHeThong(res.data.content.heThongRapChieu);
            if (res.data.content.heThongRapChieu.length > 0) {
                setSelectedHeThong(res.data.content.heThongRapChieu[0].maHeThongRap);
            }
        } catch (error) {
            console.error("Có lỗi trong quá trình láy thông tin lịch chiếu phim của phim với id:", maPhim, error);
        }
    };

    const filteredRapChieu = listHeThong
        .filter((heThong) => heThong.maHeThongRap === selectedHeThong)
        .map((ht) => ({
            ...ht,
            cumRapChieu: ht.cumRapChieu
                .map((cum) => ({
                    ...cum,
                    lichChieuPhim: cum.lichChieuPhim.filter((lich) => new Date(lich.ngayChieuGioChieu).toLocaleDateString("vi-VI") === selectedNgay),
                }))
                .filter((cum) => cum.lichChieuPhim.length > 0),
        }))
        .filter((heThong) => heThong.cumRapChieu.length > 0);

    const renderListHeThong = () => {
        return listHeThong && listHeThong.length > 0 ? (
            <div className="flex items-center gap-4 my-5">
                {listHeThong.map((ht) => (
                    <div
                        key={ht.maHeThongRap}
                        className={`w-[70px] logo ${ht.maHeThongRap === selectedHeThong ? "active" : ""}`}
                        onClick={() => setSelectedHeThong(ht.maHeThongRap || ht[0].maHeThongRap)}
                    >
                        <img src={ht.logo} alt="Logo" className="w-full h-full" />
                    </div>
                ))}
            </div>
        ) : (
            <div>
                <p>Hiện không có hệ thống nào chiếu phim này.</p>
            </div>
        );
    };

    const toogleOpenTime = (maCumRap) => {
        setIsOpenTime((prev) => (prev === maCumRap ? null : maCumRap));
    };

    // cum và lich chieu
    const renderThongTinLichChieu = () => {
        if (!filteredRapChieu) return;

        return filteredRapChieu.length > 0 ? (
            <div>
                {filteredRapChieu.flatMap((ht) =>
                    ht.cumRapChieu.map((cum) => {
                        const isOpen = isOpenTime === cum.maCumRap;

                        return (
                            <div key={cum.maCumRap} className="flex flex-col">
                                <div className="flex items-center gap-3 py-4 cum-item">
                                    <div className="img-cum w-[10%]">
                                        <img src={cum.hinhAnh} alt="Ảnh Cụm Rạp" />
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        {/* Tiêu đề cụm rạp - bấm vào để toggle */}
                                        <div
                                            className="flex items-center justify-between cursor-pointer"
                                            onClick={() => toogleOpenTime(cum.maCumRap || cum[0].maCumRap)}
                                        >
                                            <div>
                                                <h4 className="text-orange-600 font-bold text-xl md:text-2xl">{cum.tenCumRap}</h4>
                                                <p>{cum.diaChi}</p>
                                            </div>

                                            <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                                                <ExpandMore />
                                            </div>
                                        </div>

                                        {/* Lịch chiếu*/}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${
                                                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <div className="flex flex-wrap gap-2 py-2">
                                                {cum.lichChieuPhim.map((lich) => (
                                                    <div key={lich.ngayChieuGioChieu} className="time">
                                                        {/* {new Date(lich.ngayChieuGioChieu).toLocaleDateString("vi-VI")} */}

                                                        <div onClick={() => handleDatVe(lich.maLichChieu)}>
                                                            {" "}
                                                            {new Date(lich.ngayChieuGioChieu).toLocaleTimeString("vi-VN", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        ) : (
            <div>
                <p>Hiện không có cụm nào chiếu phim này</p>
            </div>
        );
    };

    const handleDatVe = (maLichChieu) => {
        if (!maLichChieu) {
            console.error("maLichChieu bị undefined:", maLichChieu);
            return;
        }

        navigator(`/ticket/${maLichChieu}`);
        setMalichChieu((prev) => (prev === maLichChieu ? null : maLichChieu));
    };

    return (
        <div>
            <div className="flex flex-col gap-4 py-4">
                <h3>THÔNG TIN LỊCH CHIẾU</h3>
                <div>
                    <SelectedDate heThongRapChieu={listHeThong} onSelectNgay={setSelectedNgay}></SelectedDate>
                </div>
                {/* <div className="">
                    <NgayChieuSlider />
                </div> */}
                <div className="infor">
                    <div>{renderListHeThong()}</div>

                    <div>{renderThongTinLichChieu()}</div>
                </div>
            </div>
        </div>
    );
}
