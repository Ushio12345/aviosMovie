import { Collapse } from "flowbite";
import React, { useEffect, useState } from "react";
import Logo from "../../../assets/images/logo-white.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
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

    const showSubMenu = () => {
        Collapse.show;
    };

    return (
        <div className="header fixed top-0 right-0 z-50 w-full">
            <nav className={`border-gray-200 dark:bg-gray-900 ${isScrolled ? "bg-black" : "bg-transparent"}`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={Logo} className="h-8" alt="Flowbite Logo" />
                    </Link>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                            onClick={showSubMenu}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.pngnpm"
                                alt="user photo"
                            />
                        </button>
                        <Button onClick={changePage} color="white" bgColor="var(--orange)" height="40px" width="100px" hoverColor="var(--orange)">
                            Đăng nhập
                        </Button>
                        {/* Dropdown menu */}
                        <div
                            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <NavLink
                                        to="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <a
                                        to="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        to="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Earnings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        to="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded="false"
                            onClick={showSubMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="menu items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => {
                                        return isActive
                                            ? "active block py-2 px-3  md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                            : "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
                                    }}
                                    aria-current="page"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => {
                                        return isActive
                                            ? "active block py-2 px-3  md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                            : "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
                                    }}
                                    aria-current="page"
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/services"
                                    className={({ isActive }) => {
                                        return isActive
                                            ? "active block py-2 px-3  md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                            : "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
                                    }}
                                    aria-current="page"
                                >
                                    Services
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/pricing"
                                    className={({ isActive }) => {
                                        return isActive
                                            ? "active block py-2 px-3  md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                            : "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
                                    }}
                                    aria-current="page"
                                >
                                    Pricing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) => {
                                        return isActive
                                            ? "active block py-2 px-3  md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                            : "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
                                    }}
                                    aria-current="page"
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
