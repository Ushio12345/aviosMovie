import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getCumTheoHeThong } from "../../services/CinemaServices";
import { setSelectedCinemaSystem } from "../../../../action/actions";

export default function ListCumRap() {
    const [cum, setCum] = useState([]);
    const [selectedCum, setSelectedCum] = useState(null);
    const dispatch = useDispatch();
    const selectedCinema = useSelector((state) => state.counter.selectedCinema, shallowEqual);
    // console.log(selectedCinema);

    useEffect(() => {
        const fetchCumTheoHeThong = async () => {
            try {
                if (!selectedCinema?.maHeThongRap) return;
                const response = await getCumTheoHeThong(selectedCinema.maHeThongRap);
                const listCumRap = response.data.content || [];
                setCum(listCumRap);

                // set gtri tranh null cho maCumRap
                if ((!selectedCinema?.maCumRap && listCumRap.length > 0) || selectedCum == null) {
                    setSelectedCum(listCumRap[0].maCumRap);
                    dispatch(setSelectedCinemaSystem(selectedCinema.maHeThongRap, listCumRap[0].maCumRap));
                }
            } catch (error) {
                console.error("Lỗi khi lấy cụm rạp:", error);
            }
        };

        fetchCumTheoHeThong();
    }, [selectedCinema.maHeThongRap]);

    const renderCumRapTheoHeThong = () => {
        return cum.length > 0 ? (
            <div>
                {cum.map((c) => (
                    <div
                        key={c.maCumRap}
                        onClick={() => {
                            setSelectedCum(c.maCumRap);
                            dispatch(setSelectedCinemaSystem(selectedCinema.maHeThongRap, c.maCumRap));
                        }}
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
