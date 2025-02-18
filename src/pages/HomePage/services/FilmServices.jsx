import axiosIntance from "../../../services/axiosInstance";

const getFilm = () => {
    try {
        const res = axiosIntance.get("QuanLyPhim/LayDanhSachPhim");
        return res;
    } catch (error) {
        console.log("Có lỗi trong quá trình lấy data Film", error);
    }
};

export default getFilm;
