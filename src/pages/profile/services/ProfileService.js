import axiosIntance from "../../../services/axiosInstance";

export const getUserProfile = async () => {
    try {
        const res = await axiosIntance.post("QuanLyNguoiDung/ThongTinTaiKhoan");
        // console.log("res", res);
        return res;
    } catch (error) {
        console.log("Có lỗi khi lấy thông tin người dùng.", error);
    }
};

export const updateUserProfile = async (formData) => {
    try {
        const res = await axiosIntance.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", formData);
        // console.log(res);

        return res;
    } catch (error) {
        console.log("Có lỗi khi cập nhật thông tin người dùng.", error);
    }
};
