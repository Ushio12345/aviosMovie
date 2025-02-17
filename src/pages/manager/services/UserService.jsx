import axiosIntance from "../../../services/axiosInstance";

export const fetchAllUsers = () => {
    return axiosIntance.get("QuanLyNguoiDung/LayDanhSachNguoiDung");
};

export const fetchUsersPage = (page) => {
    return axiosIntance.get(`QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=8`);
};

export const addNewUser = (dataForm) => {
    return axiosIntance.post("QuanLyNguoiDung/ThemNguoiDung", dataForm);
};
