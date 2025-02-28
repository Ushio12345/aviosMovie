import React, { useEffect, useState } from "react";
import { getAllCinema } from "../../services/CinemaServices";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCinemaSystem } from "../../../../action/actions";

export default function ListCinema() {
    const [heThongRap, setHeThongRap] = useState([]);
    const selectedCinema = useSelector((state) => state.counter.selectedCinema);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchListCinema = async () => {
            try {
                const cinema = await getAllCinema();
                setHeThongRap(cinema.data.content);

                return cinema.data.content;
            } catch (error) {
                console.log("CÓ lỗi trong quá trình lấy data Hệ thống rạp", error);
            }
        };
        fetchListCinema();
    }, []);
    // console.log("s", heThongRap);
    const renderHeThongRap = () => {
        return heThongRap.length > 0 ? (
            <div className=" flex flex-col justify-center items-center">
                {heThongRap.map((c) => {
                    return (
                        <div key={c.maHeThongRap} className=" flex items-center justify-center gap-2">
                            <div
                                className={`cinema-items h-[70px] w-[70px] border-b-2 ${
                                    selectedCinema.maHeThongRap === c.maHeThongRap ? "active" : ""
                                } `}
                                onClick={() => dispatch(setSelectedCinemaSystem(c.maHeThongRap))}
                            >
                                <img src={c.logo} alt="Logo Rạp" className="p-2"></img>
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="">
                <p className="text-center">Hiện không tìm thấy hệ thống rạp nào.</p>
            </div>
        );
    };

    return <div className="">{renderHeThongRap()}</div>;
}
