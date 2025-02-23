import React, { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import CustomDialog from "../../../components/popUp/ShowModal";
import { DialogHeader } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import useModalWithTrailer from "../../../hooks/useModalWithTrailer";

export default function FeaturedMovies({ listFilm }) {
    const [topFilm, setTopFilm] = useState([]);
    const navigate = useNavigate();

    const handleChange = () => {
        navigate("/top-film");
    };

    // top 3 đánh giá cao nhất
    useEffect(() => {
        getTopFilm();
    }, [listFilm]);

    const getTopFilm = () => {
        if (listFilm) {
            const sortFlimByRate = [...listFilm].sort((a, b) => b.danhGia - a.danhGia);
            const topFilmsFormatted = sortFlimByRate.map((film) => ({
                ...film,
                ngayKhoiChieu: new Date(film.ngayKhoiChieu).toLocaleDateString("vi-VN"),
            }));
            setTopFilm(topFilmsFormatted);
        }
    };
    const { open, selectedFilm, loading, setLoading, handleOpen, handleClose } = useModalWithTrailer();

    return (
        <div className="layout-padding relative features-film">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                <div className="title t items-start">
                    <i className="fa-solid fa-ticket"></i>
                    <p>Khám phá phim mới mỗi ngày</p>
                    <h3>Phim nổi bật</h3>
                </div>
                <div>
                    <p>Đón xem những phim mới hàng đầu đến từ nhiều quốc gia khác nhau.</p>
                </div>
            </div>

            {topFilm && topFilm.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10   ">
                    {[...topFilm].slice(0, 3).map((top) => (
                        <div className="features-film-item relative" key={top.maPhim}>
                            <div className="features-film-item-img  relative h-full">
                                <Link to={`detail-film/${top.maPhim}`}>
                                    <img src={top.hinhAnh} alt="Ảnh phim" className="h-full" />
                                </Link>
                                <div className="features-film-item-content rounded-lg bg-white px-7 py-4 absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] flex flex-col gap-3">
                                    <div>
                                        <h3 className="text-base md:text-2xl">
                                            <strong>{top.tenPhim}</strong>
                                        </h3>
                                    </div>
                                    <div className="flex-space gap-1 items-center">
                                        <div className="bg-red-600 text-white p-2 text-sm rounded-lg">Đánh giá: {top.danhGia}</div>
                                        <div className="text-sm">{top.ngayKhoiChieu}</div>
                                    </div>
                                    <div className="flex gap-3 ">
                                        <Button
                                            color="var(--text)"
                                            bgColor="var(--grey)"
                                            hoverBgColor="var(--orange)"
                                            hoverColor="white"
                                            height="40px"
                                            onClick={() => handleOpen(top.trailer)}
                                        >
                                            Xem trailer
                                        </Button>
                                        {/* TRailer flim modal  */}

                                        <Button
                                            color="var(--text)"
                                            bgColor="var(--grey)"
                                            hoverBgColor="var(--orange)"
                                            hoverColor="white"
                                            height="40px"
                                        >
                                            Đặt vé ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <CustomDialog open={open} handleOpen={handleClose} showFooter={false} tit>
                        <DialogHeader>Trải nghiệm trailer</DialogHeader>
                        {selectedFilm ? (
                            <iframe
                                width="100%"
                                height="500px"
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
            ) : (
                <p>Có lỗi trong quá trình tải phim.</p>
            )}

            <div className="mt-24   border-gray-600 border-2 w-fit m-auto p-4">
                <div className="flex-center gap-3">
                    <span className="text-orange-800 text-2xl">{topFilm.length}</span>
                    <p>phim được khán giả đánh giá cao bạn có thể khám phá</p>
                    <Button bgColor="var(--orange)" color="white" height="30px" hoverColor="var(--orange)" onClick={handleChange}>
                        Khám phá ngay
                    </Button>
                </div>
            </div>
        </div>
    );
}
