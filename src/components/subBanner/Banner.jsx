import React from "react";
import { useNavigate } from "react-router-dom";

export default function Banner({ title, linkTitle, imgBanner, link }) {
    const navigate = useNavigate();

    const handleChangePage = (link) => {
        navigate(link);
    };

    return (
        <div className="sub-banner relative text-white" style={{ backgroundImage: `url(${imgBanner})` }}>
            <div className="absolute center-ab">
                <div className="flex-center gap-5">
                    <h4 className="md:text-xl text-lg cursor-pointer" onClick={() => handleChangePage("/")}>
                        Home
                    </h4>
                    <p>/</p>
                    <h4 className="md:text-xl text-lg cursor-pointer" onClick={() => handleChangePage(link)}>
                        {linkTitle}
                    </h4>
                </div>
                <h3 className="md:text-3xl mt-3 text-center">{title}</h3>
            </div>
        </div>
    );
}
