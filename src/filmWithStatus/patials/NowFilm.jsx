import React from "react";
import { useSelector } from "react-redux";
import FilmItem from "./FilmItem";

export default function NowFilm({ listFilm }) {
    return (
        <div className="layout-padding">
            <div className="title-status">
                <h3>Phim hay đang khởi chiếu</h3>
            </div>
            <FilmItem films={listFilm}></FilmItem>
        </div>
    );
}
