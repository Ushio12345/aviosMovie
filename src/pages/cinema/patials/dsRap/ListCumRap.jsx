import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCumTheoHeThong } from "../../services/CinemaServices";
import { setSelectedCinemaSystem } from "../../../../action/actions";

export default function ListCumRap() {
    const [cum, setCum] = useState([]);
    const dispatch = useDispatch();
    const selectedCinema = useSelector((state) => state.counter.selectedCinema);
    console.log(selectedCinema);

    useEffect(() => {
        const fetchCumTheoHeThong = async () => {
            try {
                if (!selectedCinema?.maHeThongRap) return;
                const response = await getCumTheoHeThong(selectedCinema.maHeThongRap);

                console.log("Danh sách cụm rạp:", response.data.content);

                const listCumRap = response.data.content || [];
                setCum(listCumRap);

                // set gtri tranh null cho maCumRap
                if (!selectedCinema?.maCumRap && listCumRap.length > 0) {
                    dispatch(setSelectedCinemaSystem(selectedCinema.maHeThongRap, listCumRap[0].maCumRap));
                }
            } catch (error) {
                console.error("Lỗi khi lấy cụm rạp:", error);
            }
        };

        fetchCumTheoHeThong();
    }, [selectedCinema?.maHeThongRap, dispatch]);
    const renderCumRapTheoHeThong = () => {
        return cum.length > 0 ? (
            <div>
                {cum.map((c) => (
                    <div
                        key={c.maCumRap}
                        onClick={() => dispatch(setSelectedCinemaSystem(selectedCinema.maHeThongRap, c.maCumRap))}
                        className={`${selectedCinema.maCumRap === c.maCumRap ? "active" : ""} h-[70px] cum`}
                    >
                        <button>
                            <div>
                                <h3 className="text-start">{c.tenCumRap}</h3>
                                <p className="text-start">
                                    <strong>Địa chỉ: </strong>
                                    {c.diaChi.length > 30 ? `${c.diaChi.slice(0, 30)}...` : c.diaChi}
                                </p>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <div>
                <p>Không có cụm rạp nào</p>
            </div>
        );
    };

    return <div className="listCum">{renderCumRapTheoHeThong()}</div>;
}
