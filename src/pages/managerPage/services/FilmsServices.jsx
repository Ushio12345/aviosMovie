import axios from "axios";
import { showAlert } from "../../../components/Aleart/Aleart";
import { handleTokenError } from "../../../components/Aleart/TokenErrorAlert";
import axiosIntance from "../../../services/axiosInstance";
import { data } from "react-router-dom";

export const getAllFilms = () => {
    try {
        const res = axiosIntance.get("QuanLyPhim/LayDanhSachPhim");
        // console.log("res", res);
        return res;
    } catch (err) {
        console.log("Lỗi trong quá trình gọi api danh sách phim", err);
    }
};

export const editFilms = async (formData) => {
    try {
        const res = await axios.post("https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload", formData, {
            headers: {
                TokenCybersoft:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        showAlert("success", "", "Cập nhật thành công", "top-end");
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

export const addNewFilm = async (dataForm) => {
    try {
        const rs = await axios.post("https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh", dataForm, {
            headers: {
                "Content-Type": "multipart/form-data",
                TokenCybersoft:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        console.log(rs);

        showAlert("success", "", "Thêm phim  thành công", "top-end");

        return rs;
    } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
            handleTokenError();
        } else {
            showAlert("error", "Lỗi !", `${error.response.data.content}`, "top-end");
        }
    }
};

export const deleteFilm = async (maPhim) => {
    try {
        const res = await axiosIntance.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
        console.log(res);
        if (res.status === 200) {
            showAlert("success", "Thành công", `${res.data.content}`, "top-right");
        }
        return res;
    } catch (error) {
        console.log(error);

        if (error && error.status === 401 && error.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
            handleTokenError();
        } else {
            showAlert("error", "Lỗi !", `${error.response.data.content}`, "top-end");
        }
    }
};

export const createSchedualFilms = async (dataForm) => {
    try {
        const res = await axiosIntance.post("QuanLyDatVe/TaoLichChieu", dataForm);
        showAlert("success", "Thành công", "Thêm lịch chiếu cho phim thành công", "center");
        console.log("respone tạo lịch", res);
    } catch (error) {
        console.log(error);

        if (error && error.status === 401 && error.response.data.content === "Token không hợp lệ hoặc đã hết hạn.") {
            handleTokenError();
        } else {
            showAlert("error", "Lỗi !", `${error.response.data.content}`, "top-end");
        }
    }
};
