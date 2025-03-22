import React, { useEffect, useMemo, useState } from "react";
import Loading from "../../../../components/loading/Loading";
import { useNavigate } from "react-router-dom";

function FilmItems({ listFilmInHeThong, loading }) {
    console.log("film iitem");

    const navigator = useNavigate();
    const [maLichChieu, setMaLichChieu] = useState(null);
    // console.log("====================================");
    // console.log(listFilmInHeThong);
    // console.log("====================================");
    useEffect(() => {
        if (maLichChieu) {
            handleDatVe(maLichChieu);
        }
    }, [maLichChieu]);
    const handleDatVe = (maLichChieu) => {
        if (!maLichChieu) {
            console.error("maLichChieu bị undefined:", maLichChieu);
            return;
        }

        navigator(`/ticket/${maLichChieu}`);
        setMaLichChieu((prev) => (prev === maLichChieu ? null : maLichChieu));
    };
    const renderListFilmInHeThong = () => {
        return listFilmInHeThong.length > 0 ? (
            <div>
                {listFilmInHeThong.map((film) => (
                    <div key={film.maPhim} className="flex gap-3 p-1 border-b-2">
                        <div className="img-films w-[20%] h-[200px]">
                            <img src={film.hinhAnh} alt="Anh Phim" />
                        </div>
                        <div className="content-film w-[80%]">
                            <h3>
                                {film.tenPhim} - {film.maPhim}
                            </h3>

                            <div className="lichChieu grid grid-cols-3 gap-3">
                                {film.lstLichChieuTheoPhim && film.lstLichChieuTheoPhim.length > 0 ? (
                                    film.lstLichChieuTheoPhim.map((lich) => (
                                        <div key={lich.maLichChieu} className="">
                                            <div className="flex gap-2 bg-gray-200 p-1 lichItem" onClick={() => handleDatVe(lich.maLichChieu)}>
                                                <p className="text-green-600">{new Date(lich.ngayChieuGioChieu).toLocaleDateString("vi-VN")}</p>
                                                <span>～</span>
                                                <p className="text-orange-600">
                                                    {new Date(lich.ngayChieuGioChieu).toLocaleTimeString("vi-VN", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Chưa có lịch chiếu</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div>
                <p>Hiện không tìm thấy phim nào trong hệ thống</p>
            </div>
        );
    };

    return <div>{loading ? <Loading /> : renderListFilmInHeThong()}</div>;
}
export default React.memo(FilmItems);
