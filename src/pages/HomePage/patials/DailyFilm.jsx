import React, { useEffect, useState } from "react";
import getFilm from "../services/FilmServices";
import Button from "../../../components/button/Button";
import Slider from "react-slick";
import FilmItem from "./FilmItem";

export default function DailyFilm() {
    const [listFilm, setListFilm] = useState([]);
    const [dayliFim, setDailyFilm] = useState([]);
    useEffect(() => {
        getAllFilm();
        getDailyFilm();
    }, []);

    const getAllFilm = async () => {
        try {
            const res = await getFilm();
            console.log("data film", res);
            setListFilm(res.data.content);
        } catch (error) {
            console.log("Không lấy đươc api film", error);
        }
    };
    // fim đang chiếu
    const getDailyFilm = () => {
        if (listFilm) {
            const dailyFilms = listFilm.filter((f) => f.dangChieu);
            // console.log("Danh sách phim đang chiếu:", dailyFilms);
            setDailyFilm(dailyFilms);
            return dailyFilms;
        } else {
            console.log("Danh sách phim không hợp lệ");
        }
    };

    return (
        <div className="layout-padding relative">
            <div className="title">
                <i className="fa-solid fa-ticket"></i>
                <p>Xem phim mới mỗi ngày</p>
                <h3>Phim Đang Khởi Chiếu</h3>
            </div>

            <FilmItem dataFilm={dayliFim}></FilmItem>
        </div>
    );
}
