import { Dropdown } from "flowbite-react";
import React from "react";
import "./UserDropDown.scss";
import IconCycle from "../Icon/IconCycle";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function UserDropDown({ userAuth, logout }) {
    const { taiKhoan, email } = userAuth;

    // const auth = useSelector((state) => state.counter.userAuth);
    // console.log("auth nr", auth);

    return (
        <div className="user-dropdown">
            <Dropdown
                inline
                className="focus:ring-0 focus:outline-none 
"
                label={
                    <IconCycle className="flex-center  border-gray-500" bgColor="" borderRadius="50%" border="2px solid gray">
                        <i className="fa-solid fa-user"></i>
                    </IconCycle>
                }
            >
                <Dropdown.Header className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{taiKhoan}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <Dropdown.Item>
                        <a
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Dashboard
                        </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Settings
                        </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Earnings
                        </a>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            onClick={logout}
                        >
                            Sign out
                        </div>
                    </Dropdown.Item>
                </ul>
            </Dropdown>
        </div>
    );
}
