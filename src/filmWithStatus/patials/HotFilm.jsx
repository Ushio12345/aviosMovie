import React from "react";
import FilmItem from "./FilmItem";

export default function HotFilm({ listFilm }) {
    return (
        <div className="layout-padding">
            <div className="title-status">
                <h3>Đang hot hiện nay</h3>
            </div>
            <FilmItem films={listFilm}></FilmItem>
        </div>
    );
}
