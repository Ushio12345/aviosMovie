import React from "react";

import HomePage from "../pages/HomePage/HomePage";
import ManagerLayout from "../layouts/managerLayout/ManagerLayout";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Loading from "../components/loading/Loading";
import Register from "../pages/Auth/services/Register";
import Login from "../pages/Auth/Login";
import PersistLogin from "../pages/PersistLogin";
import TopFlim from "../pages/topFilm/TopFlim";
import DetailFilm from "../pages/detail/DetailFilm";
import FilmWithStatus from "../filmWithStatus/FilmWithStatus";

import Cinema from "../pages/cinema/Cinema";

export default function MainRoutes() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                {/* auth page */}
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                {/*  */}

                {/* home page */}
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="top-film" element={<TopFlim />}></Route>
                    {/* <Route path="upcoming-film" element={<UpcomingFlim />}></Route> */}
                    <Route path="/*" element={<FilmWithStatus />}></Route>
                    <Route path="cinema" element={<Cinema />}></Route>
                    <Route path="detail-film/:maPhim" element={<DetailFilm />}></Route>
                </Route>
                {/*  */}

                <Route path="l" element={<Loading />}>
                    {" "}
                </Route>
                <Route path="manager" element={<ManagerLayout />}></Route>
            </Route>
        </Routes>
    );
}
