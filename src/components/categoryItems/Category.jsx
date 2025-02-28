import React from "react";
import { NavLink } from "react-router-dom";
import "./Category.scss";
export default function Category() {
    return (
        <div className="category">
            <ul>
                <li>
                    <NavLink to={"/dang-chieu"} className={({ isActive }) => (isActive ? "active" : "")}>
                        Phim đang chiếu
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"upcoming-film"} className={({ isActive }) => (isActive ? "active" : "")}>
                        Phim sắp chiếu
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"hot-phim"} className={({ isActive }) => (isActive ? "active" : "")}>
                        Phim đang hot
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
