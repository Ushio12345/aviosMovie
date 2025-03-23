import React, { useState } from "react";
import Logo from "../../../assets/images/logo-white.png";
import { NavLink } from "react-router-dom";
import { CalendarMonth, CameraIndoor, ContactPage, ExpandMore, Home } from "@mui/icons-material";
import "../HomeLayout.scss";

export default function MenuMobie() {
    const [isShow, setIsShow] = useState(false);

    return (
        <div className="menu-mobile ">
            <div className="border-b-2 pb-2">
                <div className="flex-center w-1/2">
                    <img src={Logo} alt="Logo" className="w-full" />
                </div>
            </div>
            <div className="flex flex-col gap-4 items-start py-4">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                    <Home />
                    <span>Trang chủ</span>
                </NavLink>

                {/* Lịch Chiếu */}
                <div className="w-full border-b-2 py-3 ">
                    <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => setIsShow(!isShow)}>
                        <div className="flex items-center gap-2">
                            <CalendarMonth />
                            <span>Lịch chiếu</span>
                        </div>
                        <ExpandMore className={`${isShow ? "rotate-180" : ""}`} />
                    </div>

                    {/* Menu con status */}
                    <div className={`${isShow ? "block" : "hidden"} animate`}>
                        <ul className="flex flex-col gap-2 ml-5 border-l-2 pl-3 my-3">
                            <li>
                                <NavLink to="/dang-chieu" className={({ isActive }) => (isActive ? "active" : "")}>
                                    🎥 Phim đang chiếu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/upcoming-film" className={({ isActive }) => (isActive ? "active" : "")}>
                                    ⌛ Phim sắp chiếu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/hot-phim" className={({ isActive }) => (isActive ? "active" : "")}>
                                    ♨️ Phim đang hot
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <NavLink to="/cinema" className={({ isActive }) => (isActive ? "active" : "")}>
                    <CameraIndoor />
                    <span>Danh sách rạp</span>
                </NavLink>

                <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                    <ContactPage />
                    <span>Liên lạc với chúng tôi</span>
                </NavLink>
            </div>
        </div>
    );
}
