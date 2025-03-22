import React, { useState } from "react";
import { useSelector } from "react-redux";

const ListSeat = ({ onSelectedSeat, selectedSeat }) => {
    const listSeat = useSelector((state) => state.counter.listSeat);
    const [hover, setHover] = useState(false);
    const handleHover = (seat) => {
        setHover(seat);
    };
    const handleMove = () => {
        hover(null);
    };
    return (
        <div className="seat flex flex-col justify-center items-center gap-4">
            <div className="screen text-center bg-white w-3/4 p-2 font-bold mb-6 rounded-md">Màn Hình</div>

            {/* Ghế ngồi */}
            <div className="seat-grid grid grid-cols-16 lg:gap-2 gap-1 ">
                {listSeat.map((seat) => {
                    let seatClass = "seat-item text-white font-bold md:w-10 md:h-10 w-8 h-8  flex justify-center items-center rounded-md";

                    if (seat.daDat) {
                        seatClass += " bg-gray-500 cursor-not-allowed";
                    } else if (selectedSeat.some((s) => s.maGhe === seat.maGhe)) {
                        seatClass += " bg-green-500 hover:bg-green-400";
                    } else if (seat.loaiGhe === "Vip") {
                        seatClass += " bg-yellow-800 hover:bg-yellow-600";
                    } else {
                        seatClass += " bg-black hover:bg-gray-700";
                    }

                    return (
                        <div key={seat.maGhe} className="relative">
                            <button
                                className={`${seatClass} seat-btn`}
                                disabled={seat.daDat}
                                onClick={() => onSelectedSeat(seat)}
                                onMouseEnter={() => handleHover(seat)}
                                onMouseMove={() => handleMove}
                            >
                                {seat.daDat ? "❌" : seat.tenGhe}
                            </button>
                            {hover && hover.maGhe === seat.maGhe && (
                                <div className="hoverDiv">
                                    <div className="flex flex-col gap-3  ">
                                        <div className="flex gap-2">
                                            <span className="">Ghế: </span>
                                            {hover.tenGhe}
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="">Loại ghế: </span>
                                            {hover.loaiGhe === "Thuong" ? "Thường" : hover.loaiGhe === "Vip" ? "VIP" : "Khác"}
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="">Giá vé: </span>
                                            {hover.giaVe.toLocaleString("vi-VN") + " vnđ"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default React.memo(ListSeat);
