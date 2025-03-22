import axiosIntance from "../../../services/axiosInstance";

export const getDanhSachPhongVe = async (maLichChieu) => {
    try {
        const respone = await axiosIntance.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
        return respone;
    } catch (error) {
        console.log("Có lỗi trong quá trình lấy api danh sách phòng vé", error);
    }
};

export const bookingTicket = async (dataBooking) => {
    try {
        const respone = await axiosIntance.post(`QuanLyDatVe/DatVe`, dataBooking);
        return respone;
    } catch (error) {}
};
