import { Dropdown } from "flowbite-react";
import React, { useState, useEffect } from "react";
import "./UserDropDown.scss";
import IconCycle from "../Icon/IconCycle";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home, Settings, SettingsAccessibility, SettingsAccessibilityOutlined } from "@mui/icons-material";
import { Divider } from "@mui/material";

export default function UserDropDown({ userAuth, logout }) {
    const { taiKhoan, email } = userAuth;
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    // const auth = useSelector((state) => state.counter.userAuth);
    // console.log("auth nr", auth);
    useEffect(() => {
        if (userAuth.role[0] === "QuanTri") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [userAuth.role[0]]);
    return (
        <div className="user-dropdown">
            <Dropdown
                inline
                className="focus:ring-0 focus:outline-none bg-gray-200 shadow-lg
"
                label={
                    <IconCycle className="flex-center  border-gray-500" bgColor="" borderRadius="50%" border="2px solid gray">
                        <i className="fa-solid fa-user"></i>
                    </IconCycle>
                }
            >
                <Dropdown.Header className="px-4 py-3">
                    <span className="block text-sm text-gray-900 ">{taiKhoan}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <ul className="py-2 user-dropdown-table" aria-labelledby="user-menu-button">
                    <Dropdown.Item>
                        <i className="fa-solid fa-gear"></i>
                        <Link to="/my-account" className="block px-4 py-2 text-sm  ">
                            Cài đặt tài khoản
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <Link
                            to="/history-order"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Lịch sử đặt vé
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <i className="fa-solid fa-heart"></i>
                        <Link
                            to="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Danh sách phim yêu thích
                        </Link>
                    </Dropdown.Item>
                    {isAdmin && (
                        <Dropdown.Item>
                            {location.pathname.includes("manager") ? <i className="fa-solid fa-house"></i> : <i className="fa-solid fa-user-tie"></i>}
                            <Link
                                to={location.pathname.includes("manager") ? "/" : "/manager"}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {location.pathname.includes("manager") ? "Tới trang chủ" : "Tới trang quản lí"}
                            </Link>
                        </Dropdown.Item>
                    )}

                    <Dropdown.Divider />
                    <Divider />
                    <Dropdown.Item>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            onClick={logout}
                        >
                            Đăng xuất
                        </div>
                    </Dropdown.Item>
                </ul>
            </Dropdown>
        </div>
    );
}
