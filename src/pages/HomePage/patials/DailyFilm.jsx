import React, { use, useEffect, useState } from "react";
import getFilm from "../services/FilmServices";

import FilmItem from "./FilmItem";

export default function DailyFilm({ listFilm }) {
    const [dayliFim, setDailyFilm] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDailyFilm();
    }, [listFilm]);

    // fim đang chiếu
    const getDailyFilm = () => {
        setLoading(true);
        try {
            if (listFilm) {
                const dailyFilms = listFilm.filter((f) => f.dangChieu === true);
                // console.log("a", listFilm.maPhim);

                console.log("Danh sách phim đang chiếu:", dailyFilms);
                setDailyFilm(dailyFilms);

                return dailyFilms;
            }
        } catch (error) {
            console.log("Danh sách phim không hợp lệ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="layout-padding relative">
            <div className="title">
                <i className="fa-solid fa-ticket"></i>
                <p>Xem phim mới mỗi ngày</p>
                <h3>Phim Đang Khởi Chiếu</h3>
            </div>

            <FilmItem dataFilm={dayliFim} isLoading={loading}></FilmItem>
        </div>
    );
}
