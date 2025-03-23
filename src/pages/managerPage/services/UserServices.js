import { data } from "react-router-dom";
import axiosIntance from "../../../services/axiosInstance";
import { showAlert } from "../../../components/Aleart/Aleart";
import { handleTokenError } from "../../../components/Aleart/TokenErrorAlert";

export const getAllUser = async () => {
    try {
        const response = await axiosIntance.get("QuanLyNguoiDung/LayDanhSachNguoiDung");
        // console.log(response);
        return response;
    } catch (error) {
        console.error("Có lỗi trong quá trình gọi api dữ liệu người dùng", error);
        if (error.response && error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
            handleTokenError();
        } else {
            showAlert("error", "Lỗi !", `${error.response.data.content}`, "top-end");
        }
    }
};

export const addNewUser = async (dataForm) => {
    console.log("data", dataForm);

    try {
        const response = await axiosIntance.post("QuanLyNguoiDung/ThemNguoiDung", dataForm);
        console.log("add response", response);

        return response;
    } catch (error) {
        console.error("Có lỗi trong quá trình gọi api thêm mới người dùng", error);
        if (error.status === 500) {
            showAlert("error", "Lỗi", `${error.response.data.content}`, "top-right");
        } else if (error.status === 400) {
            showAlert("error", "Lỗi", `${error.response.data.content}`, "center");
        }
    }
};

export const editInforUser = async (dataForm) => {
    try {
        const res = await axiosIntance.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", dataForm);

        return res;
    } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
            handleTokenError();
        } else {
            showAlert("error", "Lỗi !", `${error.response.data.content}`, "top-end");
        }
    }
};

export const deleteUser = async (taiKhoan) => {
    // console.log(taiKhoan);

    try {
        const res = await axiosIntance.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
        if (res.status === 200) {
            showAlert("success", "Thành công", `Xóa thành công tài khoản ${taiKhoan}`, "top-end");
        }
        return res;
    } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
            handleTokenError();
        } else {
            showAlert("error", "Lỗi !", `${error.response.data.content}`, "top-end");
        }
    }
};

// detail user

export const getDetailUser = async (id) => {
    // if (!id) return;
    if (id) {
        try {
            const res = await axiosIntance.post(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${id}`);
            return res;
        } catch (error) {
            error.log("Có lỗi trong quá trình gọi api thông tin người dùng", id, error);
        }
    }
};
