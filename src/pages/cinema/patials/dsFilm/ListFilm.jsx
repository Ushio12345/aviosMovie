import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFilmsTheoHeThongRap } from "../../services/FilmsServices";
import FilmItems from "./FilmItems";

export default function ListFilm() {
    const selectedCinema = useSelector((state) => state.counter.selectedCinema);
    // console.log("cinema", selectedCinema.maHeThongRap);

    const [listFilmInHeThong, setListFilmInHeThong] = useState([]);
    useEffect(() => {
        const fetchFilmsInHeThong = async () => {
            try {
                if (!selectedCinema.maHeThongRap) return;
                const respone = await getFilmsTheoHeThongRap(selectedCinema.maHeThongRap, selectedCinema.maCumRap);
                setListFilmInHeThong(respone);
                return respone;
            } catch (error) {
                console.log("Có lỗi trong quá trình lấy data phim", error);
            }
        };
        fetchFilmsInHeThong();
    }, [selectedCinema.maHeThongRapm, selectedCinema.maCumRap]);
    // console.log("Films trong hệ thong", listFilmInHeThong);

    return (
        <div>
            <FilmItems listFilmInHeThong={listFilmInHeThong} selectedCinema={selectedCinema} />
        </div>
    );
}
