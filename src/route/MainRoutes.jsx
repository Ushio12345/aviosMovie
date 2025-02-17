import React from "react";

import HomePage from "../pages/HomePage/HomePage";
import ManagerLayout from "../layouts/managerLayout/ManagerLayout";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Loading from "../components/loading/Loading";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/services/Register";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<HomePage />} />
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="l" element={<Loading />}>
                {" "}
            </Route>
            <Route path="manager" element={<ManagerLayout />}></Route>
        </Routes>
    );
}
