import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { getDetailUser } from "../../services/UserServices";
import { showAlert } from "../../../../components/Aleart/Aleart";
import Loading2 from "../../../../components/loading/Loading2";
import { History, Restore } from "@mui/icons-material";

export default function DetailUserModal({ userId, open, handleClose }) {
    const [inforVe, setInforVe] = React.useState([]);
    const [thongTinDatVe, setThongTinDatVe] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [scroll, setScroll] = React.useState("paper");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    // fetch
    React.useEffect(() => {
        if (!userId) return;
        const fetchDetailUser = async () => {
            try {
                setLoading(true);
                const res = await getDetailUser(userId);
                if (res?.data?.statusCode === 200) {
                    setInforVe(res.data.content);
                    setThongTinDatVe(res.data.content.thongTinDatVe);
                } else {
                    setInforVe([]);
                    showAlert("error", "Lỗi!", `${res.data.message}`, "top-right");
                }
            } catch {
                showAlert("error", "Lỗi!", "Không thể lấy data người dùng", "top-right");
            } finally {
                setLoading(false);
            }
        };

        fetchDetailUser();
    }, [userId]);

    const renderInforBooking = () => {
        if (thongTinDatVe.length === 0) {
            return (
                <div className=" flex flex-col gap-4  my-4 border-t-2 bg-gray-200 p-3 rounded-md">
                    <p className="text-orange-500 font-bold">Lịch sử mua hàng</p>
                    <p>
                        <History />
                        Hiện tại khách hàng này chưa có đơn hàng nào...
                    </p>
                </div>
            );
        }
        return thongTinDatVe.map((booking) => (
            <div key={booking.maVe} className="py-3">
                <div className="flex gap-6  text-sm bg-gray-100 p-5 rounded-md">
                    <div className="w-[20%] rounded-lg   ">
                        <img src={booking.hinhAnh} alt="Anh Phim" className="w-full rounded-lg" />
                    </div>
                    <div className="w-[80%]">
                        <Typography variant="h5" className="font-bold">
                            {booking.tenPhim}
                        </Typography>
                        <Typography>
                            <strong>Mã vé:</strong> {booking.maVe}
                        </Typography>
                        <Typography>
                            <strong>Thời lượng:</strong> {booking.thoiLuongPhim} phút
                        </Typography>
                        <Typography>
                            <strong>Địa điểm:</strong>{" "}
                            {[...new Set(booking.danhSachGhe.map((seat) => `${seat.maHeThongRap} / ${seat.tenHeThongRap}`))].join(", ")}
                        </Typography>
                        <Typography>
                            <strong>Ghế:</strong> {booking.danhSachGhe.map((seat) => seat.tenGhe).join(", ")}
                        </Typography>
                        <Typography>
                            <strong>Rạp:</strong> {[...new Set(booking.danhSachGhe.map((seat) => seat.tenRap).join(" "))]}
                        </Typography>

                        <Typography>
                            <strong>Thời gian:</strong>{" "}
                            {booking.ngayDat
                                ? `${new Date(booking.ngayDat).toLocaleString("vi-VN", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                  })} ~~ ${new Date(booking.ngayDat).toLocaleString("vi-VN", { hour: "2-digit", hour12: false, minute: "2-digit" })}`
                                : "Không có dữ liệu"}
                        </Typography>
                        <Typography>
                            <strong>Tổng đơn:</strong>{" "}
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                booking.giaVe * booking.danhSachGhe.length
                            )}
                        </Typography>
                    </div>
                </div>
            </div>
        ));
    };
    return (
        <React.Fragment>
            {loading ? (
                <Loading2 />
            ) : (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    fullScreen={fullScreen}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    maxWidth={"md"}
                >
                    <DialogTitle id="scroll-dialog-title" className="flex gap-5">
                        Thông tin người dùng<strong className="text-orange-600"> {inforVe.hoTen}</strong>
                    </DialogTitle>
                    <DialogContent dividers={scroll === "paper"}>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            <div className="space-y-5">
                                <div className="flex gap-5">
                                    <TextField fullWidth id="standard-basic" label="Tài Khoản" variant="standard" value={inforVe.taiKhoan} disabled />
                                    <TextField fullWidth id="standard-basic" label="Họ và tên" variant="standard" value={inforVe.hoTen} disabled />
                                </div>
                                <div className="flex gap-5">
                                    <TextField fullWidth id="standard-basic" label="Số điện thoại" variant="standard" value={inforVe.soDT} disabled />
                                    <TextField fullWidth id="standard-basic" label="Email" variant="standard" value={inforVe.email} disabled />
                                </div>
                                <div className="flex gap-5">
                                    <TextField
                                        fullWidth
                                        id="standard-basic"
                                        label="Chức năng"
                                        variant="standard"
                                        value={inforVe.maLoaiNguoiDung}
                                        disabled
                                    />
                                    <TextField fullWidth id="standard-basic" label="Email" variant="standard" value={inforVe.email} disabled />
                                </div>
                            </div>
                        </DialogContentText>
                        <div className="my-5">
                            <Typography variant={"h5"} color="orange">
                                <Restore /> Lịch sử đặt vé
                            </Typography>
                            {renderInforBooking()}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Thoát</Button>
                        {/* <Button onClick={handleClose}>Subscribe</Button> */}
                    </DialogActions>
                </Dialog>
            )}
        </React.Fragment>
    );
}
