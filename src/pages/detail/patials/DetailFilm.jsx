import React from "react";
import Loading from "../../../components/loading/Loading";
import { format } from "date-fns";
import Button from "../../../components/button/Button";
export default function DetailFilmItem({ loading, detail, isDetail, handleOpen, toogleDetailMota }) {
    const { ngayKhoiChieu, hinhAnh, tenPhim, moTa, maPhim, hot, sapChieu, dangChieu, danhGia, trailer } = detail;

    return (
        <div>
            {" "}
            {loading ? (
                <Loading />
            ) : (
                <div className="border-b-2 border-gray-300 layout">
                    <div className="title">
                        {" "}
                        <h2 className="md:text-2xl text-lg">NỘI DUNG</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-5 gap-0 py-10">
                        <div className="imgFilm">
                            <img src={hinhAnh} alt="" />
                        </div>
                        <div className=" flex flex-col gap-5 col-span-3">
                            <div className="name uppercase  md:my-0 my-4">
                                <h3>{tenPhim}</h3>
                            </div>
                            <div className="">
                                <strong>Mô tả: </strong>{" "}
                                {moTa ? (
                                    <div>
                                        {isDetail[maPhim] ? moTa : `${moTa.slice(0, 150)}...`}
                                        {moTa.length > 100 && (
                                            <button className="text-blue-500 ml-2" onClick={() => toogleDetailMota(maPhim)}>
                                                {isDetail[maPhim] ? "Rút gọn" : "Xem thêm"}
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    "Hiện phim này chưa cập nhật mô tả."
                                )}
                            </div>
                            <div>
                                <strong>Trạng thái:</strong>
                                <div className="flex items-center gap-3">
                                    {hot && <p className="bg-red-700 text-white px-5 py-2 text-xs rounded-lg">🔥 Hot</p>}
                                    {dangChieu && <p className="bg-green-700 text-white px-5 py-2 text-xs rounded-lg">🎬 Đang chiếu</p>}
                                    {sapChieu && <p className="bg-yellow-700 text-white px-5 py-2 text-xs rounded-lg"> ⏳ Sắp chiếu</p>}
                                </div>
                            </div>
                            <div>
                                <strong className="mr-3">Ngày khởi chiếu: </strong>
                                {ngayKhoiChieu ? new Date(ngayKhoiChieu).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                            </div>
                            <div>
                                <strong className="mr-3">Giờ chiếu:</strong>
                                {ngayKhoiChieu ? format(new Date(ngayKhoiChieu), "hh:mm:ss") : "Chưa cập nhật"}
                            </div>

                            <div className="flex items-center gap-3">
                                <strong>Đánh giá:</strong>
                                <p className="text-red-800 font-bold text-2xl"> {danhGia}/10</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    bgColor="var(--orange)"
                                    color="white"
                                    hoverBgColor="white"
                                    hoverColor="var(--orange)"
                                    width="20%"
                                    height="40px"
                                    hoverOutline="1px solid var(--orange)"
                                    onClick={() => handleOpen(trailer)}
                                >
                                    Xem Trailer
                                </Button>
                                {/* <Button
                                    bgColor="#3dd9e9"
                                    color="black"
                                    hoverBgColor="black"
                                    hoverColor="#3dd9e9"
                                    width="20%"
                                    height="40px"
                                    hoverOutline="1px solid #3dd9e9"
                                >
                                    Đặt vé
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
