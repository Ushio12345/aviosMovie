import React from "react";
import { useNavigate } from "react-router-dom";

export default function Banner() {
    const navigate = useNavigate();
    const handleChangePage = (link) => {
        navigate(link);
    };
    return (
        <div className="sub-banner relative text-white">
            <div className="absolute center-ab">
                <div className="flex-center gap-5">
                    <h4 className=" md:text-xl text-lg" onClick={() => handleChangePage("/")}>
                        Home
                    </h4>
                    <p>/</p>
                    <h4 className="  md:text-xl text-lg " onClick={() => handleChangePage("/top-film")}>
                        Top Film
                    </h4>
                </div>
                <h3 className="md:text-3xl mt-3">Danh sách phim được đánh giá cao</h3>
            </div>
        </div>
    );
}
