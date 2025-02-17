import React from "react";
import Header from "./patials/Header";
import HomePage from "../../pages/HomePage/HomePage";
import Footer from "./patials/Footer";
import "./HomeLayout.scss";
import { Outlet } from "react-router-dom";
export default function HomeLayout() {
    return (
        <div className="homeLayout">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
