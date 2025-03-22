import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const NextArrow = ({ onClick }) => (
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={onClick}>
        <ChevronRight className="text-black text-2xl z-50" />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-50" onClick={onClick}>
        <ChevronLeft className="text-black text-2xl" />
    </div>
);

const CustomSlider = ({ children, settings = {} }) => {
    const defaultSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 5 } },
            { breakpoint: 768, settings: { slidesToShow: 4 } },
            { breakpoint: 480, settings: { slidesToShow: 3 } },
        ],
        ...settings,
    };

    return <Slider {...defaultSettings}>{children}</Slider>;
};

export default CustomSlider;
