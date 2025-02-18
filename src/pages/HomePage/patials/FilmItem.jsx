import React from "react";
import Button from "../../../components/button/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function FilmItem({ dataFilm }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        lazyLoad: true,
        appendDots: (dots) => (
            <div
                style={{
                    padding: "10px",
                    height: "10px",
                }}
            >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {dataFilm.map((f) => (
                    <div key={f.maPhim} className="film-item relative">
                        <div
                            className="film-content flex flex-col gap-3 p-4 text-white"
                            style={{
                                backgroundImage: `url(${f.hinhAnh})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderRadius: "10px",
                                height: "400px",
                                width: "280px",
                            }}
                        >
                            <div className="status flex items-center gap-2">
                                {f.hot && <p className="bg-red-500 text-white p-1 text-xs rounded-lg">Hot</p>}
                                {f.dangChieu && <p className="bg-green-500 text-white p-1 text-xs rounded-lg">Đang chiếu</p>}
                                {f.sapChieu && <p className="bg-yellow-500 text-white p-1 text-xs rounded-lg">Sắp chiếu</p>}
                            </div>
                            <div className="mt-auto">
                                <strong className="text-xl">{f.tenPhim}</strong>
                            </div>
                            <Button bgColor="white" color="black" width="55%" height="40px">
                                Đặt vé ngay
                            </Button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
