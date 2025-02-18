import axiosIntance from "../../../services/axiosInstance";

export const login = (dataFrom) => {
    return axiosIntance.post("QuanLyNguoiDung/DangNhap", dataFrom);
};

export const register = async (dataFrom) => {
    try {
        const res = await axiosIntance.post("QuanLyNguoiDung/DangKy", dataFrom);
        console.log("Thực hiện API đăng kí thành công", res.status);
        return res;
    } catch (err) {
        console.log("Gọi API đăng kí thất bại", err);
        throw err;
    }
};
