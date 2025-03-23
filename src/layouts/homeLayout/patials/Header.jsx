import React, { useEffect, useState } from "react";
import Logo from "../../../assets/images/logo-white.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import UserDropDown from "../../../components/userDropdown/UserDropDown";
import "../HomeLayout.scss";
import Category from "../../../components/categoryItems/Category";
import { Close, ExpandMore, Search } from "@mui/icons-material";
import useToogle from "../../../hooks/useToogle";
import SearchFilmTable from "../../../components/search/SearchFilmTable";
import { useShowModal } from "../../../hooks/useShowDialog";
import MenuMobie from "./menuMobie";

export default function Header({ userAuth, isLogin, logout, isHeader2 }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isShow, setIsShow] = useToogle();
    const [isShowMenuMobile, setIsShowMenuMobile] = useToogle();
    const [isShowSearch, setIsShowSearch] = useToogle();
    const { open, handleClickOpen, handleClose } = useShowModal();
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
        <div className={`${isHeader2 ? "header2" : ""} header fixed top-[0] right-0 z-50 w-[100vw] left-0`}>
            <nav className={`border-gray-200 dark:bg-gray-900 ${isScrolled ? "bg-black" : "bg-transparent"} `}>
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

                        {/* search */}
                        <div className=" text-white h-[40px] w-[40px] flex-center search-films relative">
                            <button onClick={setIsShowSearch}>
                                <Search />
                            </button>
                            {isShowSearch && <SearchFilmTable open={open} onClose={handleClose} />}
                        </div>

                        {/* Dropdown menu */}

                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className={`text-white block md:hidden`}
                            aria-controls="navbar-user"
                            aria-expanded="false"
                            onClick={setIsShowMenuMobile}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isShowMenuMobile ? (
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 1h15M1 7h15M1 13h15"
                                    />
                                </svg>
                            ) : (
                                <Close sx={{ color: "white" }} />
                            )}
                        </button>
                    </div>
                    {isShowMenuMobile && (
                        <div className="w-full animate-slide-down block md:hidden">
                            <MenuMobie />
                        </div>
                    )}
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
                                <NavLink to="/contact">Liên hệ</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
