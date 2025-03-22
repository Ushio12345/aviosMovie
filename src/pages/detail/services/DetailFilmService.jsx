import axiosIntance from "../../../services/axiosInstance";

export const getDetailFilm = async (id) => {
    try {
        const response = await axiosIntance.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
        console.log(response);

        return response.data.content;
    } catch (error) {
        console.log("Có lỗi khi lấy chi tiết phim với id:", id, "Lỗi:", error);
    }
};

export const fetchDetailFilm = (id) => {
    try {
        const data = getDetailFilm(id);
        // console.log(data, id);
        return data;
    } catch {
        console.log("Lỗi trong quá trình lấy data detail flim,");
    }
};
