import axiosIntance from "../../../services/axiosInstance";

export const getAllCinema = () => {
    try {
        const respone = axiosIntance.get("QuanLyRap/LayThongTinHeThongRap");
        return respone;
    } catch (error) {
        console.log("Có lỗi trong quá trình lấy API Danh sách hệ thống rạp", error);
    }
};

export const getCumTheoHeThong = (maHeThongRap) => {
    try {
        const response = axiosIntance.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
        return response;
    } catch (error) {
        console.log("Có lỗi trong quá trình lấy API danh sách cụm rạp theo  hệ thống", error);
    }
};
