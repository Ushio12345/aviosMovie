import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { select } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCinemaSystem } from "../../../../action/actions";
import { FormHelperText, Typography } from "@mui/material";
import { color } from "framer-motion";

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

function getStyles(selectedRap, rap, theme) {
    return {
        fontWeight: selectedRap.includes(rap) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    };
}

export default function RapCinema({ listCum = [], err }) {
    const theme = useTheme();
    const [rap, setRap] = useState([]);
    const dispatch = useDispatch();
    const selectedCinema = useSelector((state) => state.counter.selectedCinema);

    const handleChange = (event) => {
        setRap(event.target.value);
        dispatch(setSelectedCinemaSystem(selectedCinema.maHeThongRap, selectedCinema.maCumRap, event.target.value));
    };

    return (
        <div className="mt-2">
            <Typography>Chọn rạp </Typography>
            <FormControl sx={{ mt: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Rạp</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    value={rap}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(select) => (select ? select : <em>Chọn rạp</em>)}
                    MenuProps={MenuProps}
                >
                    <MenuItem disabled value="">
                        <em>Chọn cụm rạp</em>
                    </MenuItem>
                    {(Array.isArray(listCum) ? listCum.flatMap((listRap) => listRap.danhSachRap) : []).map((rap) => (
                        <MenuItem key={rap.maRap} value={rap.maRap} style={getStyles(rap.tenRap, rap, theme)}>
                            {rap.tenRap}
                        </MenuItem>
                    ))}
                </Select>
                {err.maRap && <FormHelperText sx={{ color: "#c62828" }}>{err.maRap}</FormHelperText>}
            </FormControl>
        </div>
    );
}
