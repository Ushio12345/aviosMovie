import React from "react";
import { useNavigate } from "react-router-dom";
import lineImg from "../../assets/images/Line.jpg";
import "./Banner.scss";
export default function Banner({ title, linkTitle, imgBanner, link }) {
    const navigate = useNavigate();

    const handleChangePage = (link) => {
        navigate(link);
    };

    return (
        <div>
            <div className="sub-banner relative text-white " style={{ backgroundImage: `url(${imgBanner})` }}>
                <div className="overlay"></div>
                <div className="absolute center-ab w-full">
                    <div className="flex-center gap-5">
                        <h4 className="md:text-xl text-lg cursor-pointer" onClick={() => handleChangePage("/")}>
                            Trang chủ
                        </h4>
                        <p className="text-white">/</p>
                        <h4 className="md:text-xl text-lg cursor-pointer uppercase" onClick={() => handleChangePage(link)}>
                            {linkTitle}
                        </h4>
                    </div>
                    <h3 className="md:text-3xl mt-3 text-center">{title}</h3>
                </div>
            </div>
            <div className="my-5">
                <img src={lineImg} alt="Line" />
            </div>
        </div>
    );
}
