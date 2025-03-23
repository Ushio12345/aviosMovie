import React, { useEffect, useState } from "react";
import CinemaSystemSelected from "./inputField/CinemaSystem";
import { Link, useLocation } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import CumCinema from "./inputField/cumCinema";
import { useSelector } from "react-redux";
import RapCinema from "./inputField/rapCinema";
import Button from "../../../components/button/Button";
import { validSchedual } from "../schemas/createSchedual";
import { createSchedualFilms } from "../services/FilmsServices";
import { showAlert } from "../../../components/Aleart/Aleart";
import { format } from "date-fns";
export default function CreateSchedual() {
    const location = useLocation();

    const film = location.state?.film;

    const selected = useSelector((state) => state.counter.selectedCinema);

    const [err, setErr] = useState({});
    const [dataSchedualForm, setDataSchedualForm] = useState({
        maPhim: "",
        ngayChieuGioChieu: "",
        maRap: selected.maCumRap,
        giaVe: 0,
    });

    useEffect(() => {
        if (film) {
            setDataSchedualForm((prev) => ({ ...prev, maPhim: film.maPhim }));
        }
    }, [film]);
    // console.log("selected", selected);
    const handleChange = (e) => {
        const { value, name } = e.target;
        setDataSchedualForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selected.maCumRap || !selected.maHeThongRap) {
            showAlert("error", "Lỗi!", "Vui lòng chọn cụm rạp hợp lệ!", "top-right");
            return;
        }

        const validate = validSchedual(dataSchedualForm, selected.maCumRap, selected.maHeThongRap);
        setErr(validate);
        console.log("valide", validate);

        if (Object.keys(validate).length === 0) {
            const date = new Date(dataSchedualForm.ngayChieuGioChieu);
            const formattedDate = format(date, "dd/MM/yyyy HH:mm:ss");
            console.log(formattedDate);

            const updatedForm = {
                ...dataSchedualForm,
                ngayChieuGioChieu: formattedDate,
                giaVe: dataSchedualForm.giaVe,
                maRap: selected.maCumRap,
            };

            if (dataSchedualForm) {
                try {
                    console.log("form", updatedForm, selected);

                    await createSchedualFilms(updatedForm);
                } catch {
                    showAlert("error", "Lỗi!", "Không tạo được lịch chiếu cho phim này", "top-right");
                }
            }
        }
    };

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" className="text-center">
                    Tạo lịch chiếu cho {film.tenPhim} - {`Mã phim:(${film.maPhim})`}
                </Typography>
                <div className="py-4 flex gap-5 flex-wrap items-center">
                    {/* <div className="w-1/4 m-auto">
                        <img src={film.hinhAnh} alt="Anh phim" className="w-full h-full " />
                    </div> */}
                    <div
                        className="flex flex-col justify-between gap-5 item m-auto p-10 bg-gray-100"
                        style={{ border: "2px dotted black", borderRadius: 10 }}
                    >
                        <div className="grid md:grid-cols-2 grid-col-1 gap-10 item">
                            <div>
                                <div>
                                    <CinemaSystemSelected err={err} />
                                </div>
                                <div>
                                    <CumCinema err={err} />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Typography>Chọn ngày chiếu</Typography>
                                    <TextField
                                        sx={{ m: 0, width: 300, mt: 1 }}
                                        type="datetime-local"
                                        name="ngayChieuGioChieu"
                                        onChange={handleChange}
                                        value={dataSchedualForm.ngayChieuGioChieu ?? ""}
                                        error={err.ngayChieuGioChieu}
                                        helperText={err.ngayChieuGioChieu}
                                    ></TextField>
                                </div>
                                <div>
                                    <Typography>Giá vé</Typography>
                                    <TextField
                                        sx={{ m: 0, width: 300, mt: 1 }}
                                        type="number"
                                        name="giaVe"
                                        onChange={handleChange}
                                        value={dataSchedualForm.giaVe}
                                        error={err.giaVe}
                                        helperText={err.giaVe}
                                    ></TextField>
                                </div>
                            </div>
                        </div>
                        <Button bgColor="black" color="white" height="40px" width="200px">
                            Tạo lịch chiếu
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
