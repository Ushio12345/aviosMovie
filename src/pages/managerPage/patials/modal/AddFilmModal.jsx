import React, { useState } from "react";
import { useShowModal } from "../../../../hooks/showModal";
import useInput from "../../../../hooks/useInput";
import { Box, Divider, Switch, TextField, Typography } from "@mui/material";
import { data } from "react-router-dom";
import { addNewFilm } from "../../services/FilmsServices";
import { showAlert } from "../../../../components/Aleart/Aleart";
import { useDispatch, useSelector } from "react-redux";
import { addNewFilmRedux } from "../../../../action/actions";

export default function AddFilmModal() {
    const listFilmRedux = useSelector((state) => state.counter.listFilm);
    console.log("a", listFilmRedux);
    const dispatch = useDispatch();

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
    //end

    // checked state
    // const [checkedGr, setCheckedGr] = useState({
    //     dangChieu: false,
    //     sapChieu: false,
    //     hot: false,
    // });

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
        } else {
            setDataFilm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    // add films
    const handleAddFilms = async (e) => {
        e.preventDefault();

        const formattedDate = new Date(dataFilm.ngayKhoiChieu).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        console.log(formattedDate);

        const formData = new FormData();
        formData.append("maPhim", null);
        formData.append("tenPhim", dataFilm.tenPhim);
        // formData.append("biDanh", dataFilm.biDanh);
        formData.append("dangChieu", dataFilm.dangChieu);
        formData.append("danhGia", dataFilm.danhGia);
        formData.append("hinhAnh", dataFilm.hinhAnh);
        formData.append("hot", dataFilm.hot);
        formData.append("maNhom", "");
        formData.append("moTa", dataFilm.moTa);
        formData.append("ngayKhoiChieu", formattedDate);
        formData.append("sapChieu", dataFilm.sapChieu);
        formData.append("trailer", dataFilm.trailer);

        try {
            const res = await addNewFilm(formData, {
                headers: {
                    // "Content-Type": "multipart/form-data",
                },
            });
            dispatch(addNewFilmRedux(res.data.content));
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };
    const { ModalCus } = useShowModal({
        titleBtn: (
            <>
                <i className="fa-solid fa-plus mr-3"></i>
                Thêm mới
            </>
        ),
        dialogTitle: "Thêm mới phim",
        action: handleAddFilms,
        maxWidth: "lg",
    });

    return (
        <div>
            {ModalCus(
                <form className="py-4" onSubmit={handleAddFilms}>
                    <Divider />
                    <div className=" flex gap-4 my-4 ">
                        <TextField
                            id="outlined-basic"
                            label="Tên phim"
                            variant="outlined"
                            fullWidth
                            name="tenPhim"
                            onChange={handleChange}
                            value={dataFilm.tenPhim}
                        />

                        <TextField
                            id="outlined-basic"
                            name="biDanh"
                            label="Bí danh"
                            variant="outlined"
                            fullWidth
                            // onChange={handleChange}
                            value={dataFilm.biDanh}
                        />
                    </div>
                    <TextField
                        id="outlined-basic"
                        label="Mô tả"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        name="moTa"
                        value={dataFilm.moTa}
                        onChange={handleChange}
                    />
                    <div className=" flex gap-4 my-4 ">
                        <TextField
                            id="outlined-basic"
                            label="Ngày khởi chiếu"
                            variant="outlined"
                            fullWidth
                            type="datetime-local"
                            slotProps={{ inputLabel: { shrink: true } }}
                            onChange={handleChange}
                            value={dataFilm.ngayKhoiChieu}
                            name="ngayKhoiChieu"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Đánh giá"
                            variant="outlined"
                            fullWidth
                            type="number"
                            name="danhGia"
                            onChange={handleChange}
                            value={dataFilm.danhGia}
                        />
                    </div>

                    {/* -------------------------images--------------------------- */}

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
                                {dataFilm.hinhAnh && (
                                    <img
                                        src={URL.createObjectURL(dataFilm.hinhAnh)}
                                        alt="Anh phim"
                                        className="absolute top-0 left-0 w-full h-full object-cover z-10"
                                    />
                                )}
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
                            id="outlined-basic"
                            label="Trailer link"
                            variant="outlined"
                            fullWidth
                            type="url"
                            name="trailer"
                            onChange={handleChange}
                            value={dataFilm.trailer}
                        />
                    </div>

                    <div className=" flex gap-4 my-4 ">
                        <label className="inline-flex items-center cursor-pointer">
                            Đang chiếu:
                            <Switch
                                inputProps={{ "aria-label": "controlled" }}
                                type="checkbox"
                                className="sr-only peer"
                                name="dangChieu"
                                onChange={handleChange}
                                checked={dataFilm.dangChieu}
                            />
                        </label>
                        <label className="inline-flex items-center cursor-pointer">
                            Sắp chiếu
                            <Switch type="checkbox" className="sr-only peer" name="sapChieu" onChange={handleChange} checked={dataFilm.sapChieu} />
                        </label>
                        <label className="inline-flex items-center cursor-pointer">
                            Phim hot
                            <Switch type="checkbox" className="sr-only peer" name="hot" onChange={handleChange} checked={dataFilm.tenPhim} />
                        </label>
                    </div>
                </form>
            )}
        </div>
    );
}
