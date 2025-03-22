import React, { useEffect, useState } from "react";
import { getAllCinema } from "../../../cinema/services/CinemaServices";
import { showAlert } from "../../../../components/Aleart/Aleart";
import { FormControl, MenuItem, OutlinedInput, Select, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCinemaSystem } from "../../../../action/actions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, selectedCinemas, theme) {
    return {
        fontWeight: selectedCinemas.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    };
}

export default function CinemaSystemSelected({ err }) {
    const theme = useTheme();
    const [cinema, setCinema] = useState([]);
    const dispatch = useDispatch();
    const selectedCinema = useSelector((state) => state.counter.selectedCinema);
    const [selectedCinemas, setSelectedCinemas] = useState(selectedCinema.maHeThongRap || "");

    useEffect(() => {
        const fetchCinema = async () => {
            try {
                const res = await getAllCinema();
                setCinema(res.data.content);
            } catch (error) {
                showAlert("error", "Lỗi!", "Có lỗi trong quá trình lấy dữ liệu hệ thống rạp", "top-right");
            }
        };

        fetchCinema();
    }, []);

    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedCinemas(value);
        dispatch(setSelectedCinemaSystem(value));
    };

    return (
        <div>
            <Typography>Hệ thống rạp:</Typography>
            <FormControl sx={{ m: 0, width: 300, mt: 1 }}>
                <Select
                    displayEmpty
                    value={selectedCinemas}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => (selected ? selected : <em>Chọn hệ thống rạp</em>)}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                >
                    <MenuItem disabled value="">
                        <em>Chọn hệ thống rạp</em>
                    </MenuItem>
                    {cinema.map((c) => (
                        <MenuItem key={c.maHeThongRap} value={c.maHeThongRap} style={getStyles(c.tenHeThongRap, selectedCinemas, theme)}>
                            {c.tenHeThongRap}
                        </MenuItem>
                    ))}
                </Select>
                {err.maHeThongRap && <FormHelperText sx={{ color: "#c62828" }}>{err.maHeThongRap}</FormHelperText>}
            </FormControl>
        </div>
    );
}
