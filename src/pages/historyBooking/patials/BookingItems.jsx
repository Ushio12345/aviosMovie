import React, { useEffect, useState, version } from "react";
import { getUserProfile } from "../../profile/services/ProfileService";
import { showAlert } from "../../../components/Aleart/Aleart";
import { Storefront } from "@mui/icons-material";
import { formatDate } from "date-fns";
import Barcode from "react-barcode";
import TicketBarcode from "./BardCode";
import MultipleSelect from "../../../components/select/Selected";
import CustomIcons from "../../../components/pagination/Pagiantion";
import usePagination from "../../../hooks/usePagination";

export default function BookingItems() {
    const [listBooking, setListBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [danhSachGhe, setDanhSachGhe] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);

    useEffect(() => {
        const fetchThongTinDatVe = async () => {
            try {
                setLoading(true);
                const data = await getUserProfile();
                setListBooking(data.data.content.thongTinDatVe);
            } catch {
                showAlert("error", "Lỗi!", "Không lấy được lịch sử đặt vé.", "top-right");
            } finally {
                setLoading(false);
            }
        };
        fetchThongTinDatVe();
    }, []);

    // console.log("Thong tin dat ve", listBooking);
    // console.log("selected", selectedDates);

    const filteredBookings =
        selectedDates.length > 0
            ? listBooking.filter((booking) => selectedDates.includes(new Date(booking.ngayDat).toLocaleDateString("vi-VI")))
            : listBooking;

    // console.log("filter", filteredBookings);
    const { currentItems, totalPages, currentPage, handlePageClick } = usePagination({
        items: filteredBookings ? filteredBookings : listBooking,
        itemsPerPage: 2,
    });

    return (
        <div>
            <div className="container bookingItems min-w-[1000px]">
                <h1 className="upcomming">Lịch sử đặt vé</h1>
                <div className="selected-items">
                    <MultipleSelect
                        titleSelected={"Ngày đặt vé"}
                        selectItem={["Tất cả", ...new Set(listBooking.map((b) => new Date(b.ngayDat).toLocaleDateString("vi-VN")))]}
                        onChange={(selected) => {
                            setSelectedDates(selected.includes("Tất cả") ? [] : selected);
                        }}
                    />
                </div>
                {listBooking.length > 0 ? (
                    <div>
                        {currentItems.map((v) => {
                            const date = new Date(v.ngayDat);
                            const ngay = date.getDate();
                            const thang = date.toLocaleString("vi-VN", { month: "short" });

                            return (
                                <div className="item flex  " key={v.maVe}>
                                    <div className="item-right flex flex-col items-center justify-center">
                                        <h2 className="num">{ngay}</h2>
                                        <p className="day">{thang}</p>
                                        <span className="up-border" />
                                        <span className="down-border" />
                                        <div className="bard-code">
                                            <TicketBarcode maVe={v.maVe} />
                                        </div>
                                    </div>{" "}
                                    {/* end item-right */}
                                    <div className="item-left">
                                        <p className="event ">
                                            {[...new Set(v.danhSachGhe.map((ds) => ds.tenHeThongRap))].map((tenRap, index) => (
                                                <p key={index}>{tenRap}</p>
                                            ))}
                                        </p>
                                        <h2 className="title ">{v.tenPhim}</h2>
                                        <div className="sce">
                                            <div className="icon">
                                                <i className="fa fa-table" />
                                            </div>
                                            <p>
                                                {new Date(v.ngayDat).toLocaleDateString("vi-VI")}
                                                <br />{" "}
                                                {new Date(v.ngayDat).toLocaleTimeString("vi-VN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}{" "}
                                                &amp; {v.thoiLuongPhim} phút
                                            </p>
                                        </div>
                                        <div className="fix" />
                                        <div className="loc">
                                            <div className="icon">
                                                <i className="fa fa-map-marker" />
                                            </div>
                                            <div>
                                                <div className="flex flex-col">
                                                    <div>
                                                        {[...new Set(v.danhSachGhe.map((ds) => ds.tenRap))].map((tenRap, index) => (
                                                            <p key={index}>{tenRap}</p>
                                                        ))}
                                                    </div>
                                                    <div className="flex gap-2 flex-wrap items-center">
                                                        <p>Ghế: </p>
                                                        {v.danhSachGhe.map((ds) => (
                                                            <p key={ds.maGhe} className="bg-orange-500 p-1 flex items-center rounded-md">
                                                                {ds.tenGhe}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fix" />
                                        <button className="tickets">
                                            <p className="text-white">
                                                Giá vé: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(v.giaVe)}
                                            </p>
                                        </button>
                                    </div>{" "}
                                    {/* end item-right */}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center ">
                        <p className="flex items-center justify-center gap-3">
                            <Storefront fontSize="large" />
                            Hiện chưa có đơn đặt hàng nào
                        </p>
                    </div>
                )}
                {/* end item */}
            </div>
            <CustomIcons totalPages={totalPages} handlePageClick={handlePageClick} page={currentPage} />
        </div>
    );
}
