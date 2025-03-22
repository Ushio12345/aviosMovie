import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    };
}

export default function MultipleSelect({ selectItem, titleSelected, onChange, multiple = false, value }) {
    const theme = useTheme();
    const [selectedValues, setSelectedValues] = React.useState([]);

    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedValues(typeof value === "string" ? value.split(",") : value);
        onChange(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">{titleSelected}</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple={multiple}
                    value={selectedValues || value}
                    onChange={handleChange}
                    input={<OutlinedInput label={titleSelected} />}
                    MenuProps={MenuProps}
                >
                    {selectItem.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, selectedValues, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
