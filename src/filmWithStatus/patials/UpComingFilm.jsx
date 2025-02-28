import React, { useEffect } from "react";
import FilmItem from "./FilmItem";

export default function UpComingFilm({ listFilm }) {
    return (
        <div className="layout-padding">
            <div className="title-status">
                <h3>Phim hay sắp khởi chiếu</h3>
            </div>
            <FilmItem films={listFilm}></FilmItem>
        </div>
    );
}
