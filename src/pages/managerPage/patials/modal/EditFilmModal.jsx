import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, useTheme, useMediaQuery, IconButton, DialogContent, Divider, Box, TextField, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import { editFilms } from "../../services/FilmsServices";
import Button from "../../../../components/button/Button";
import { showAlert } from "../../../../components/Aleart/Aleart";
import { useDispatch, useSelector } from "react-redux";
import { editFilmsRedux } from "../../../../action/actions";

export default function EditFilmModal({ editItem, open, handleClose }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();
    const listFilmRedux = useSelector((state) => state.counter.listFilm);

    const { maPhim, biDanh, dangChieu, danhGia, hinhAnh, hot, maNhom, moTa, ngayKhoiChieu, sapChieu, tenPhim, trailer } = editItem;

    const [dataFilm, setDataFilm] = useState({
        maPhim: "",
        tenPhim: "",
        biDanh: "",
        dangChieu: false,
        danhGia: "",
        hinhAnh: null,
        hot: false,
        maNhom: "",
        moTa: "",
        ngayKhoiChieu: "",
        sapChieu: false,
        trailer: "",
    });

    useEffect(() => {
        if (editItem) {
            setDataFilm({ ...editItem });
        }
    }, [editItem.maPhim]);
    console.log("dataFilm", dataFilm);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setDataFilm((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else if (type === "file") {
            setDataFilm((prev) => ({
                ...prev,
                hinhAnh: files[0],
            }));
            console.log(e.target.files[0]);
        } else {
            setDataFilm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handleEditFilm = async () => {
        const formattedDate = new Date(dataFilm.ngayKhoiChieu).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const formData = new FormData();
        formData.append("maPhim", dataFilm.maPhim);
        formData.append("tenPhim", dataFilm.tenPhim);
        formData.append("biDanh", dataFilm.biDanh);
        formData.append("dangChieu", dataFilm.dangChieu);
        formData.append("danhGia", dataFilm.danhGia);

        formData.append("hot", dataFilm.hot);
        formData.append("maNhom", "");
        formData.append("moTa", dataFilm.moTa);
        formData.append("ngayKhoiChieu", formattedDate);
        formData.append("sapChieu", dataFilm.sapChieu);
        formData.append("trailer", dataFilm.trailer);

        var file = document.querySelector("#dropzone-file");
        if (file && file.files.length > 0) {
            formData.append("hinhAnh", file.files[0]);
        }

        // check data
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        await editFilms(formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((rs) => console.log(rs))
            .catch((err) => console.log(err));
    };

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
                <DialogTitle>{`Chỉnh sửa thông tin phim`}</DialogTitle>
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
                    <Box className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Tên phim"
                                defaultValue="Hello World"
                                onChange={handleChange}
                                value={dataFilm.tenPhim}
                                name="tenPhim"
                            />
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Bí danh"
                                defaultValue="Hello World"
                                ìn
                                name="biDanh"
                                value={dataFilm.biDanh}
                                disabled
                            />
                        </div>
                        <div className="">
                            <TextField
                                type="text"
                                fullWidth
                                required
                                id="outlined-required"
                                label="Mô tả"
                                multiline
                                rows={4}
                                onChange={handleChange}
                                name="moTa"
                                value={dataFilm.moTa}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                // label="Ngày chiếu "
                                defaultValue="Hello World"
                                type="datetime-local"
                                onChange={handleChange}
                                name="ngayKhoiChieu"
                                value={dataFilm.ngayKhoiChieu}
                            />
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Trailer"
                                defaultValue="Hello World"
                                type="url"
                                onChange={handleChange}
                                name="trailer"
                                value={dataFilm.trailer}
                            />
                        </div>
                        {/* imnages */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col  items-center justify-center w-full">
                                <TextField
                                    id="dropzone-file"
                                    type="file"
                                    className=""
                                    onChange={handleChange}
                                    fullWidth
                                    name="hinhAnh"
                                    label="Link ảnh"
                                    // value={dataFilm.hinhAnh}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                    required
                                />
                                <label
                                    htmlFor="dropzone-file"
                                    className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <img
                                        src={dataFilm.hinhAnh instanceof File ? URL.createObjectURL(dataFilm.hinhAnh) : dataFilm.hinhAnh}
                                        alt="Anh phim"
                                        className="absolute top-0 left-0 w-full h-full object-cover z-10"
                                    />

                                    <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${dataFilm.hinhAnh ? "relative z-20" : ""}`}>
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click</span> hoặc kéo thả để thêm ảnh
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG và GIF (MAX. 800x400px)</p>
                                    </div>
                                </label>
                            </div>

                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Đánh giá"
                                defaultValue="Hello World"
                                onChange={handleChange}
                                name="danhGia"
                                value={dataFilm.danhGia}
                                type="number"
                            />
                        </div>
                        {/* check box status */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label htmlFor="dangChieu">Đang chiếu</label>
                                <input type="checkbox" name="dangChieu" id="dangChieu" onChange={handleChange} checked={dataFilm.dangChieu} />
                            </div>

                            <div className="flex items-center gap-2">
                                <label htmlFor="sapChieu">Sắp chiếu</label>
                                <input type="checkbox" name="sapChieu" id="sapChieu" onChange={handleChange} checked={dataFilm.sapChieu} />
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="hot">Hot</label>
                                <input type="checkbox" name="hot" id="hot" onChange={handleChange} checked={dataFilm.hot} />
                            </div>
                        </div>
                    </Box>
                    <DialogActions>
                        <Button color="blue" hoverBgColor="blue" hoverColor="white" width="100px" height="40px" onClick={handleClose}>
                            Thoát
                        </Button>
                        <Button
                            color="white"
                            bgColor="green"
                            hoverBgColor="blue"
                            hoverColor="white"
                            width="100px"
                            height="40px"
                            onClick={handleEditFilm}
                        >
                            Lưu thay đổi
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}
