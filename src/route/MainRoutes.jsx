import React from "react";

import HomePage from "../pages/HomePage/HomePage";
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
import OrderTicket from "../pages/ticket/OrderTicket";
import { PrivateRoute } from "../pages/PersistLogin/PrivateRoute";
import Page404 from "../pages/404Pages/Page404";
import ManagerPage from "../pages/managerPage/ManagerPage";
import MyProfile from "../pages/profile/MyProfile";
import HistoryBooking from "../pages/historyBooking/HistoryBooking";
import CreateSchedual from "../pages/managerPage/patials/CreateSchedual";
import ManagerLayout from "../layouts/managerLayout/ManagerLayout";
import UserManage from "../pages/managerPage/patials/UserManage";
import FilmsManage from "../pages/managerPage/patials/FilmsManage";
import Booking from "../pages/managerPage/patials/Booking";
import Contact from "../pages/contact/Contact";
// import UpComingFilm from "../filmWithStatus/patials/UpComingFilm";

export default function MainRoutes() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                {/* auth page */}
                <Route path="*" element={<Page404 />} />
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                {/*  */}

                {/* home page */}
                <Route path="/" element={<HomeLayout />}>
                    {/* <Route path="*" element={<Page404 />} /> */}
                    <Route index element={<HomePage />} />
                    <Route path="top-film" element={<TopFlim />}></Route>
                    {/* <Route path="upcoming-film" element={<UpComingFilm />}></Route> */}
                    <Route path="/dang-chieu" element={<FilmWithStatus />} />
                    <Route path="/upcoming-film" element={<FilmWithStatus />} />
                    <Route path="/hot-phim" element={<FilmWithStatus />} />

                    <Route path="cinema" element={<Cinema />}></Route>
                    <Route path="detail-film/:maPhim" element={<DetailFilm />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route element={<PrivateRoute />}>
                        <Route path="ticket/:maLichChieu" element={<OrderTicket />} />
                        <Route path="my-account" element={<MyProfile />} />
                        <Route path="history-order" element={<HistoryBooking />} />
                    </Route>
                </Route>
                {/*  */}

                <Route path="l" element={<Loading />}>
                    {" "}
                </Route>
                {/* <Route path="manager" element={<ManagerLayout />}></Route> */}
                <Route element={<PrivateRoute role={"QuanTri"} />}>
                    <Route path="/manager" element={<ManagerLayout />}>
                        <Route path="users" element={<UserManage />} />
                        <Route path="bookings" element={<Booking />} />
                        <Route path="films" element={<FilmsManage />} />
                        <Route path="films/showtime/:maPhim" element={<CreateSchedual />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}
