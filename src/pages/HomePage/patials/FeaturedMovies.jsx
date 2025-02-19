import React, { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import CustomDialog from "../../../components/popUp/ShowModal";
import { DialogHeader } from "@material-tailwind/react";

export default function FeaturedMovies({ listFilm }) {
    const [topFilm, setTopFilm] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = (trailer) => {
        if (trailer) {
            setSelectedFilm(trailer);
            setOpen(true);
        }
    };
    const handleClose = () => {
        setSelectedFilm(null);
        setOpen(false); // Đóng modal
    };
    // console.log("trler ", selectedTrailer);
    console.log("s", selectedFilm);

    // top 3 đánh giá cao nhất
    useEffect(() => {
        getTopFilm();
    }, [listFilm]);
    const getTopFilm = () => {
        if (listFilm) {
            const sortFlimByRate = [...listFilm].sort((a, b) => b.danhGia - a.danhGia).slice(0, 3);
            const topFilmsFormatted = sortFlimByRate.map((film) => ({
                ...film,
                ngayKhoiChieu: new Date(film.ngayKhoiChieu).toLocaleDateString("vi-VN"),
            }));

            console.log("top 3", topFilmsFormatted);
            setTopFilm(topFilmsFormatted);
        }
    };

    console.log("selectFilm", selectedFilm);

    return (
        <div className="layout-padding relative features-film">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                <div className="title t items-start">
                    <i className="fa-solid fa-ticket"></i>
                    <p>Khám phá phim mới mỗi ngày</p>
                    <h3>Top Featured Movies</h3>
                </div>
                <div>
                    <p>Đón xem những phim mới hàng đầu đến từ nhiều quốc gia khác nhau.</p>
                </div>
            </div>

            {topFilm && topFilm.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10   ">
                    {topFilm.map((top) => (
                        <div className="features-film-item relative" key={top.maPhim}>
                            <div className="features-film-item-img  relative h-full">
                                <img src={top.hinhAnh} alt="Ảnh phim" className="h-full" />
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
                </div>
            ) : (
                <p>Có lỗi trong quá trình tải phim.</p>
            )}
        </div>
    );
}
