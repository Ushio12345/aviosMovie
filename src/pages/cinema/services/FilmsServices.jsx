import axiosInstance from "../../../services/axiosInstance";

export const getFilmsTheoHeThongRap = async (maHeThongRap, maCumRap = "") => {
    try {
        if (!maHeThongRap) {
            console.error("Thiếu mã hệ thống rạp!");
            return [];
        }
        const res = await axiosInstance.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}`);
        if (!res.data?.content) {
            console.error("Không có dữ liệu từ API!");
            return [];
        }
        // Tìm cụm rạp
        const selectedCumRap = res.data.content.flatMap((listCum) => listCum.lstCumRap).find((cum) => cum.maCumRap === maCumRap);
        if (!selectedCumRap) {
            console.warn(`Không tìm thấy cụm rạp với mã: ${maCumRap}`);
            return [];
        }
        // const isServicesFilms = selectedCumRap.danhSachPhim.filter((film) => film.danhChieu !== true);
        const isServicesFilms = selectedCumRap.danhSachPhim.filter((dsFilm) => dsFilm.danhChieu !== true);
        // console.log("isServices", isServicesFilms);

        return isServicesFilms;
    } catch (error) {
        console.error("Lỗi trong quá trình lấy thông tin lịch chiếu theo rạp", error);
        return [];
    }
};

export const getThongTinLichChieuPhim = async (maPhim) => {
    try {
        const respone = await axiosInstance.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
        return respone;
    } catch (error) {
        console.error("Lỗi trong quá trình lấy thông tin lịch chiếu  phim với id: ", maPhim, error);
    }
};
