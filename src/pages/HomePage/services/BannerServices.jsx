import React from "react";
import axiosIntance from "../../../services/axiosInstance";

const getBanner = () => {
    return axiosIntance.get("QuanLyPhim/LayDanhSachBanner");
};
export default getBanner;
