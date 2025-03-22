import React, { useEffect, useState } from "react";
import { getCumTheoHeThong } from "../../../cinema/services/CinemaServices";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setSelectedCinemaSystem } from "../../../../action/actions";
import { FormHelperText, Typography } from "@mui/material";
import RapCinema from "./rapCinema";

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

function getStyles(name, selectedCum, theme) {
    return {
        fontWeight: selectedCum.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    };
}
export default function CumCinema({ err }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const selectedCinema = useSelector((state) => state.counter.selectedCinema);
    const [cum, setCum] = useState([]);
    const [selectedCum, setSelectedCum] = useState(selectedCinema.maCumRap || "");
    const [selectedCumData, setSelectedCumData] = useState([]);

    useEffect(() => {
        if (!selectedCinema?.maHeThongRap) return;

        const fetchCumTheoHeThong = async () => {
            try {
                const res = await getCumTheoHeThong(selectedCinema.maHeThongRap);
                setCum(res.data.content);
                const dsRap = res.data.content.filter((cum) => cum.maCumRap === selectedCum);
                setSelectedCumData(dsRap);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách cụm rạp:", error);
            }
        };

        fetchCumTheoHeThong();
    }, [selectedCinema?.maHeThongRap, selectedCinema]);

    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedCum(value);
        dispatch(setSelectedCinemaSystem(selectedCinema.maHeThongRap, value));
    };
    return (
        <div className="">
            <Typography>Chọn cụm rạp </Typography>
            <FormControl sx={{ m: 0, width: 300, mt: 1 }}>
                <Select
                    displayEmpty
                    value={selectedCum}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(select) => (select ? select : <em>Chọn cụm rạp</em>)}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                >
                    <MenuItem disabled value="">
                        <em>Chọn cụm rạp</em>
                    </MenuItem>
                    {cum.flatMap((c) => (
                        <MenuItem key={c.maCumRap} value={c.maCumRap} style={getStyles(c.tenCumRap, selectedCum, theme)}>
                            {c.tenCumRap}
                        </MenuItem>
                    ))}
                </Select>
                {err.maCumRap && <FormHelperText sx={{ color: "#c62828" }}>{err.maCumRap}</FormHelperText>}
            </FormControl>

            <RapCinema listCum={selectedCumData} err={err} />
        </div>
    );
}
