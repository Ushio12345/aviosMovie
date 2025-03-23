import { TextField, Typography } from "@mui/material";
import React from "react";
import useInput from "../../../hooks/useInput";
import Button from "../../../components/button/Button";
import { showAlert } from "../../../components/Aleart/Aleart";
import { filterFilmByDate } from "../services/FilmsServices";

export default function InputFilterDate({ soTrang, soPhanTuTrenTrang, setFilms }) {
    const tuNgayRef = useInput();
    const denNgayRef = useInput();

    // lọc theo ngày
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tuNgayRef.value || !denNgayRef.value) return;
        const formatDate = (dateValue) => {
            const date = new Date(dateValue);
            return date.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        };
        const formData = {
            tuNgay: formatDate(tuNgayRef.getValue()),
            denNgay: formatDate(denNgayRef.getValue()),
        };
        console.log(formData);

        try {
            const res = await filterFilmByDate(formData, soTrang, soPhanTuTrenTrang);
            setFilms(res.data.content);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="input-date absolute bg-white p-3 left-0 top-full w-full ">
            <form onSubmit={handleSubmit} className="space-y-3">
                <Typography>Lọc theo ngày</Typography>

                <TextField
                    type="date"
                    size="small"
                    placeholder="Từ ngày"
                    onChange={tuNgayRef.onChangeValue}
                    inputRef={tuNgayRef.refValue}
                    fullWidth
                ></TextField>
                <TextField
                    type="date"
                    size="small"
                    placeholder="Đến ngày"
                    onChange={denNgayRef.onChangeValue}
                    inputRef={denNgayRef.refValue}
                    fullWidth
                ></TextField>
                <Button bgColor="black" color="white" height="30px" width="50%">
                    Lọc
                </Button>
            </form>
        </div>
    );
}
