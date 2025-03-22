import React, { useState } from "react";
import { getAllFilms } from "../services/FilmsServices";
import { fetchDetailFilm } from "../../detail/services/DetailFilmService";
import TableListFilm from "./tables/TableListFilm";
import { useDispatch, useSelector } from "react-redux";
import { setFlimRedux } from "../../../action/actions";

export default function FilmsManage() {
    const [listFilms, setListFilms] = useState([]);
    const dispath = useDispatch();
    useState(() => {
        const fetchListFilm = async () => {
            try {
                const res = await getAllFilms();

                setListFilms(res.data.content);
                dispath(setFlimRedux(res.data.content));
            } catch (error) {
                console.log(error);
            }
        };
        fetchListFilm();
    }, []);
    // console.log(listFilms);
    const listFilmsRedux = useSelector((state) => state.counter.listFilm);

    return (
        <div>
            <TableListFilm listFilms={listFilmsRedux} />
        </div>
    );
}
