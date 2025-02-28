import React, { useEffect, useState } from "react";
import Logo from "../../../assets/images/logo-white.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import UserDropDown from "../../../components/userDropdown/UserDropDown";
import "../HomeLayout.scss";
import Category from "../../../components/categoryItems/Category";
import { ExpandMore } from "@mui/icons-material";
import useToogle from "../../../hooks/useToogle";

export default function Header({ userAuth, isLogin, logout, isHeader2 }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isShow, setIsShow] = useToogle();
    const navigator = useNavigate();
    const handleScroller = () => {
        if (window.scrollY > 100) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    const changePage = () => {
        navigator("/login");
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroller);
        return () => window.removeEventListener("scroll", handleScroller);
    }, []);

    return (
        <div className={`${isHeader2 ? "header2" : ""} header fixed top-0 right-0 z-50 w-full`}>
            <nav className={`border-gray-200 dark:bg-gray-900 ${isScrolled ? "bg-black" : "bg-transparent"}`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={Logo} className="h-8" alt="Flowbite Logo" />
                    </Link>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {/* user dropdown */}

                        {isLogin ? (
                            <UserDropDown userAuth={userAuth} logout={logout} />
                        ) : (
                            <Button onClick={changePage} color="white" bgColor="var(--orange)" height="40px" width="100px" hoverColor="var(--orange)">
                                Đăng nhập
                            </Button>
                        )}

                        {/* Dropdown menu */}

                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded="false"
                            // onClick={showSubMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    {/* navbar */}
                    <div className="menu items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="nav-menu flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                                    Trang chủ
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={setIsShow} className="text-white">
                                    Lịch chiếu <ExpandMore />
                                </button>
                                {isShow && <Category />}
                            </li>
                            <li>
                                <NavLink to="/cinema">Rạp</NavLink>
                            </li>
                            <li>
                                <NavLink to="/pricing">Pricing</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
