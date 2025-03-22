import { Alarm, Close, LocalFireDepartment, Movie } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DetailFilmModal({ detailFilmData, open, handleClose }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [dataItem, setDataItem] = useState(detailFilmData);
    const listFilm = useSelector((state) => state.counter.listFilm);
    useEffect(() => {
        setDataItem(detailFilmData);
    }, [detailFilmData, listFilm]);
    const { tenPhim, biDanh, dangChieu, danhGia, hinhAnh, hot, maPhim, moTa, ngayKhoiChieu, sapChieu, trailer } = dataItem;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={fullScreen}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "md",
                        },
                    },
                }}
            >
                <DialogTitle>{`Thông tin chi tiết phim: ${tenPhim}`}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <Close />
                </IconButton>
                <Divider />
                <DialogContent>
                    <div className="space-y-1">
                        <div className="w-[25%] m-auto">
                            <img src={hinhAnh} alt="Ảnh phim" />
                        </div>
                        <Typography variant="h5" style={{ textAlign: "center", margin: "0px 0" }}>
                            {tenPhim}
                        </Typography>
                        <Typography style={{ textAlign: "center" }}>(Bí danh: ${biDanh})</Typography>
                        <div className="space-y-4 p-4 bg-gray-100 " style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
                            <div className="grid grid-cols-3 ">
                                <div className="">
                                    <p className="flex gap-4">
                                        <strong>Mã phim:</strong>
                                        {maPhim}
                                    </p>
                                </div>
                                <div className="">
                                    <p className="flex gap-4">
                                        <strong>Đánh giá:</strong>
                                        {danhGia}
                                    </p>
                                </div>
                                <div className="">
                                    <p className="flex gap-4">
                                        <strong>Ngày khởi chiếu:</strong>

                                        {new Date(ngayKhoiChieu).toLocaleDateString("vi-VI", {
                                            hour12: false,
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <Typography className="">
                                <strong>Mô tả:</strong> <div>{moTa || "Hiện phim chưa được cập nhật mô tả."}</div>
                            </Typography>
                            <Typography className="flex gap-4">
                                <strong>Trạng thái phim:</strong>{" "}
                                {dangChieu ? (
                                    <p className="flex items-center text-blue-300">
                                        {" "}
                                        <Movie /> Đang chiếu
                                    </p>
                                ) : (
                                    ""
                                )}
                                {sapChieu ? (
                                    <p className="flex items-center text-yellow-700">
                                        {" "}
                                        <Alarm /> Sắp chiếu
                                    </p>
                                ) : (
                                    ""
                                )}
                                {hot ? (
                                    <p className="flex items-center text-red-300">
                                        {" "}
                                        <LocalFireDepartment /> Phim hot
                                    </p>
                                ) : (
                                    ""
                                )}
                            </Typography>
                            <Typography>
                                {trailer ? (
                                    <p>
                                        <strong>Trailer link: </strong>
                                        <a href={trailer}>{trailer}</a>
                                    </p>
                                ) : (
                                    "Hiện phim này chưa cập nhật trailer."
                                )}
                            </Typography>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
