import { CloudOff, Star, Start, WifiTethering } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DangChieu({ listFilm }) {
    const nagivate = useNavigate();
    const handleChangePage = (maPhim) => {
        nagivate(`detail-film/${maPhim}`);
    };

    return (
        <div className="overflow-auto list-dangChieu">
            {listFilm && listFilm.length > 0 ? (
                <div>
                    {listFilm.map((f) => (
                        <div
                            key={f.maPhim}
                            className="flex gap-3 py-3 hover:bg-gray-50 cursor-pointer border-b-gray-100  "
                            onClick={() => handleChangePage(f.maPhim)}
                        >
                            <div className="img-film w-1/4 rounded-md">
                                <img src={f.hinhAnh} alt="Ảnh phim" className="rounded-md w-full h-full" />
                            </div>
                            <div className="w-[75%] flex flex-col gap-2">
                                <p className="text-sm">{f.tenPhim}</p>
                                <p
                                    className={`${
                                        f.dangChieu ? "bg-blue-500 " : f.hot ? "bg-red-600" : f.sapChieu ? "bg-yellow-600" : ""
                                    } text-white w-fit text-[10px] p-1 rounded-md flex items-center gap-2`}
                                >
                                    <WifiTethering sx={{ fontSize: "12px" }} />
                                    {f.dangChieu ? "Đang chiếu" : f.hot ? "Hot" : f.sapChieu ? "Sắp chiếu" : ""}
                                </p>

                                <p className="text-[12px] flex-center w-fit gap-2">
                                    <Star sx={{ fontSize: "12px", color: "orange" }} />
                                    <p className="text-lg text-red">{f.danhGia}</p>
                                </p>
                                <Divider />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full">
                    <CloudOff sx={{ color: "gray", fontSize: "70px" }} />
                    <p>Hiện không có phim nào.</p>
                </div>
            )}
        </div>
    );
}
