import React, { useEffect, useState } from "react";
import "./SearchFilmTable.scss";
import { Divider } from "@mui/material";
import DangChieu from "./patials/DangChieu";
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";

export default function SearchFilmTable() {
    const listFilm = useSelector((state) => state.counter.listFilm);
    const [film, setFilm] = useState(listFilm);
    const dangChieu = listFilm.filter((f) => f.dangChieu === true);
    const search = useInput();

    useEffect(() => {
        const searchValue = search.value.toLowerCase();
        const filteredFilms = listFilm.filter((f) => f.tenPhim.toLowerCase().includes(searchValue));
        if (searchValue) {
            setFilm(filteredFilms);
        } else {
            setFilm(dangChieu);
        }
    }, [search.value, listFilm]);

    return (
        <div className="search-film p-2">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tìm kiếm"
                    name="tenPhim"
                    onChange={search.onChangeValue}
                    value={search.value}
                />
            </div>
            <Divider sx={{ padding: "5px" }} />
            <div className="space-y-2 py-3">
                {!search.value && film.length > 0 ? <p>PHIM ĐANG CHIẾU</p> : <p>PHIM CẦN TÌM</p>}
                <div>
                    <DangChieu listFilm={film} />
                </div>
            </div>
            <div className="triangle-up"></div>
        </div>
    );
}
