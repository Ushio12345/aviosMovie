import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFilmsTheoHeThongRap } from "../../services/FilmsServices";
import FilmItems from "./FilmItems";
import { setSelectedCinemaSystem } from "../../../../action/actions";

function ListFilm() {
    console.log("check re-render list fikm");
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const selectedCinema = useSelector((state) => state.counter.selectedCinema, shallowEqual);
    // console.log(selectedCinema);

    const [listFilmInHeThong, setListFilmInHeThong] = useState([]);
    useEffect(() => {
        const fetchFilmsInHeThong = async () => {
            try {
                setLoading(true);
                if (!selectedCinema.maHeThongRap) return;
                const respone = await getFilmsTheoHeThongRap(selectedCinema.maHeThongRap, selectedCinema.maCumRap);
                setListFilmInHeThong(respone);
                return respone;
            } catch (error) {
                console.log("Có lỗi trong quá trình lấy data phim", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFilmsInHeThong();
    }, [selectedCinema.maHeThongRapm, selectedCinema.maCumRap]);
    // console.log("Films trong hệ thong", listFilmInHeThong);

    return (
        <div>
            <FilmItems listFilmInHeThong={listFilmInHeThong} selectedCinema={selectedCinema} loading={loading} />
        </div>
    );
}

export default React.memo(ListFilm);
