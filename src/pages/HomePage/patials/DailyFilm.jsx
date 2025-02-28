import React, { use, useEffect, useState } from "react";
import getFilm from "../services/FilmServices";

import FilmItem from "./FilmItem";

export default function DailyFilm({ listFilm }) {
    const dailyFilmsList = listFilm?.filter((f) => f.dangChieu === true) || [];

    return (
        <div className="layout-padding relative">
            <div className="title">
                <i className="fa-solid fa-ticket"></i>
                <p>Xem phim mới mỗi ngày</p>
                <h3>Phim Đang Khởi Chiếu</h3>
            </div>

            <FilmItem dataFilm={dailyFilmsList}></FilmItem>
        </div>
    );
}
