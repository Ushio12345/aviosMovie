import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailFilm } from "./services/DetailFilmService";
import "./Detail.scss";
import { format } from "date-fns";
import { HotTubSharp, HourglassBottom, MovieCreation } from "@mui/icons-material";
import { useShowModal } from "../../hooks/showModal";
import Button from "../../components/button/Button";
import Loading from "../../components/loading/Loading";
import useModalWithTrailer from "../../hooks/useModalWithTrailer";
import CustomDialog from "../../components/popUp/ShowModal";
export default function DetailFilm() {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState({});
    const { maPhim } = useParams();
    const [isDetail, setIsDetail] = useState({});
    useEffect(() => {
        fetchDetailFlim();
        window.scrollTo(0, 0);
    }, [maPhim]);
    const fetchDetailFlim = async () => {
        setLoading(true);
        try {
            const data = await getDetailFilm(maPhim);
            setDetail(data);
            // console.log("data", data);
        } catch (error) {
            console.log("Có lỗi trong quá trình lấy data thông tin chi tiết của phim", error);
        } finally {
            setLoading(false);
        }
    };
    const toogleDetailMota = (id) => {
        setIsDetail((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const { open, selectedFilm, handleOpen, handleClose } = useModalWithTrailer();

    return (
        <div className="detail mt-[100px]">
            {loading ? (
                <Loading />
            ) : detail ? (
                <div className="border-b-2 border-gray-300 layout">
                    <div className="title">
                        {" "}
                        <h2 className="md:text-2xl text-lg">NỘI DUNG</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-10">
                        <div className="imgFilm">
                            <img src={detail.hinhAnh} alt="" />
                        </div>
                        <div className=" flex flex-col gap-5 col-span-3">
                            <div className="name uppercase ">
                                <h3>{detail.tenPhim}</h3>
                            </div>
                            <div className="">
                                <strong>Mô tả: </strong>{" "}
                                {detail.moTa ? (
                                    <div>
                                        {isDetail[detail.maPhim] ? detail.moTa : `${detail.moTa.slice(0, 150)}...`}
                                        {detail.moTa.length > 100 && (
                                            <button className="text-blue-500 ml-2" onClick={() => toogleDetailMota(detail.maPhim)}>
                                                {isDetail[detail.maPhim] ? "Rút gọn" : "Xem thêm"}
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
                                    {detail.hot && <p className="bg-red-700 text-white px-5 py-2 text-xs rounded-lg">🔥 Hot</p>}
                                    {detail.dangChieu && <p className="bg-green-700 text-white px-5 py-2 text-xs rounded-lg">🎬 Đang chiếu</p>}
                                    {detail.sapChieu && <p className="bg-yellow-700 text-white px-5 py-2 text-xs rounded-lg"> ⏳ Sắp chiếu</p>}
                                </div>
                            </div>
                            <div>
                                <strong className="mr-3">Ngày khởi chiếu: </strong>
                                {detail.ngayKhoiChieu ? new Date(detail.ngayKhoiChieu).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                            </div>
                            <div>
                                <strong className="mr-3">Giờ chiếu:</strong>
                                {detail.ngayKhoiChieu ? format(new Date(detail.ngayKhoiChieu), "hh:mm:ss") : "Chưa cập nhật"}
                            </div>

                            <div className="flex items-center gap-3">
                                <strong>Đánh giá:</strong>
                                <p className="text-red-800 font-bold text-2xl"> {detail.danhGia}/10</p>
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
                                    onClick={() => handleOpen(detail.trailer)}
                                >
                                    Xem Trailer
                                </Button>
                                <Button
                                    bgColor="#3dd9e9"
                                    color="black"
                                    hoverBgColor="black"
                                    hoverColor="#3dd9e9"
                                    width="20%"
                                    height="40px"
                                    hoverOutline="1px solid #3dd9e9"
                                >
                                    Đặt vé
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Hiện phim này không có dữ liệu hoặc bị lỗi vui lòng thử lại sau!</p>
            )}

            {/* modal traler */}
            <CustomDialog open={open} handleOpen={handleClose} showFooter={false}>
                {selectedFilm ? (
                    <iframe
                        width="100%"
                        height="600px"
                        src={selectedFilm.replace("watch?v=", "embed/")}
                        title="Trailer"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>Không tìm thấy trailer</p>
                )}
            </CustomDialog>
        </div>
    );
}
