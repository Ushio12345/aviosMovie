import axiosIntance from "../../../services/axiosInstance";

export const login = (dataFrom) => {
    return axiosIntance.post("QuanLyNguoiDung/DangNhap", dataFrom);
};

export const register = (dataFrom) => {
    return axiosIntance
        .post("QuanLyNguoiDung/DangKy", dataFrom)
        .then((res) => {
            console.log("thực hiện api đăng kí thành công", res.status);
        })
        .catch((err) => {
            console.log("gọi api đăng kí thất bại", err);
        });
};
