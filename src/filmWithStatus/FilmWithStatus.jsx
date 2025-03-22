import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../components/subBanner/Banner";
import bannerImg from "../assets/images/banner31.jpg";
import NowFilm from "./patials/NowFilm";
import UpComingFilm from "./patials/UpComingFilm";
import HotFilm from "./patials/HotFilm";
import { useSelector } from "react-redux";
import "./FilmWithStatus.scss";
export default function FilmWithStatus() {
    const [title, setTitle] = useState("Danh sách phim");
    const location = useLocation();
    const listFilm = useSelector((state) => state.counter.listFilm);
    // console.log("====================================");
    // console.log(listFilm);
    // console.log("====================================");
    const dangChieu = listFilm.filter((f) => f.dangChieu === true);
    const sapChieu = listFilm.filter((f) => f.sapChieu === true);
    const hot = listFilm.filter((f) => f.hot === true);

    useEffect(() => {
        const path = location.pathname.split("?")[0]; // Xóa query params nếu có

        switch (path) {
            case "/dang-chieu":
                setTitle("Phim đang chiếu");
                break;
            case "/upcoming-film":
                setTitle("Phim sắp chiếu");
                break;
            case "/hot-phim":
                setTitle("Phim đang hot");
                break;
            default:
                setTitle("Danh sách phim");
        }
    }, [location.pathname]);

    const renderComponent = () => {
        switch (location.pathname) {
            case "/dang-chieu":
                return <NowFilm listFilm={dangChieu} />;
            case "/upcoming-film":
                return <UpComingFilm listFilm={sapChieu} />;
            case "/hot-phim":
                return <HotFilm listFilm={hot} />;
            default:
                return null;
        }
    };

    return (
        <div className="film-status">
            <Banner linkTitle={title} imgBanner={bannerImg} title={title} />
            {renderComponent()}
        </div>
    );
}
