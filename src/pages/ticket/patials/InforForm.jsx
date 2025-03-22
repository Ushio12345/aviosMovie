import React, { useEffect, useMemo, useState } from "react";
import Button from "../../../components/button/Button";
import { showAlert, showConfirmAlert } from "../../../components/Aleart/Aleart";
import { bookingTicket } from "../services/OrderService";
import { useDispatch, useSelector } from "react-redux";
import { updateSeatStatus } from "../../../action/actions";

const InforForm = ({ inforFilms, selectedSeat, setSelectedSeat }) => {
    const { tenPhim, diaChi, hinhAnh, maLichChieu, ngayChieu, tenCumRap, tenRap } = inforFilms;
    const listSeat = useSelector((state) => state.counter.listSeat);
    // console.log("infor", inforFilms);
    console.log("check status seat", selectedSeat);
    const dispatch = useDispatch();
    // tinh tong tien
    const totalPrice = useMemo(() => {
        return selectedSeat.reduce((sum, seat) => sum + seat.giaVe, 0).toLocaleString("vi-VN") + " vnđ";
    }, [selectedSeat]);

    // render list ghe
    const renderSelectedSeatList = () => {
        return selectedSeat.map((seat) => (
            <div key={seat.maGhe} className={` text-white p-2 text-[10px] rounded-lg ${seat.loaiGhe === "Vip" ? "bg-orange-400" : "bg-black"}`}>
                {seat.tenGhe}
            </div>
        ));
    };
    // lấy data dặt vé
    const handleSetDataDatVe = async () => {
        if (!selectedSeat || !selectedSeat.length > 0) {
            showAlert("error", "Ôi lỗi rồi!!!", "Vui lòng chọn ghế ", "top-right");
            return;
        }
        const dataBooking = {
            maLichChieu: maLichChieu,
            danhSachVe: selectedSeat.map((seat) => ({
                maGhe: seat.maGhe,
                giaVe: seat.giaVe,
            })),
        };
        // console.log(
        //     "data booking",
        //     dataBooking.danhSachVe.flatMap((ve) => ve.maGhe)
        // );

        const respone = await bookingTicket(dataBooking);
        if (respone) {
            showAlert("success", "Thành công", "Đặt vé thành công", "center");
            setSelectedSeat([]);

            dispatch(updateSeatStatus(dataBooking.danhSachVe.flatMap((ve) => ve.maGhe)));
        }

        console.log(respone);
    };

    return (
        <div className="infor-film ">
            <h3 className=" films">Mua vé xem phim</h3>
            <div className=" items-infor flex flex-col gap-4">
                <div className="item-infor">
                    <strong>Tên phim:</strong>
                    <p>{tenPhim}</p>
                </div>

                <div className="item-infor">
                    <strong>Cụm rạp:</strong>
                    <p>{tenCumRap}</p>
                </div>

                <div className="item-infor">
                    <strong>Địa chỉ:</strong>
                    <p>{diaChi}</p>
                </div>
                <div className="item-infor">
                    <strong>Ngày chiếu:</strong>
                    <p className="">{ngayChieu}</p>
                </div>
                <div className="item-infor">
                    <strong>Rạp:</strong>
                    <p>{tenRap}</p>
                </div>

                <div className="item-infor">
                    <strong>Ghế:</strong>
                    <div className="flex gap-1 flex-wrap"> {renderSelectedSeatList()}</div>
                </div>

                <div className="item-infor">
                    <strong>Tổng thanh toán:</strong>
                    <p>{totalPrice}</p>
                </div>

                <Button outline="2px dotted gray" height="40px" onClick={() => handleSetDataDatVe()}>
                    Đặt vé ngay
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="flex gap-3 items-center">
                    {" "}
                    <div className="w-[40px] h-[40px] bg-black rounded-lg "></div>
                    <p className="text-black text-xs md:text-base lg:text-md">Ghế thường</p>
                </div>
                <div className="flex gap-3 items-center">
                    {" "}
                    <div className="w-[40px] h-[40px] bg-yellow-800 rounded-lg"></div>
                    <p className="text-yellow-100 text-xs md:text-base lg:text-md">Ghế Vip</p>
                </div>
                <div className="flex gap-3 items-center">
                    {" "}
                    <div className="w-[40px] h-[40px] bg-gray-500 rounded-lg flex-center">❌</div>
                    <p className="text-xs md:text-base lg:text-md">Đã đặt</p>
                </div>
                <div className="flex gap-3 items-center">
                    {" "}
                    <div className="w-[40px] h-[40px] bg-green-500 rounded-lg flex-center"></div>
                    <p className="text-green-500 text-xs md:text-base lg:text-md">Ghế đang chọn</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(InforForm);
