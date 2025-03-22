import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FilterList } from "@mui/icons-material";

const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 200,
        color: "rgb(55, 65, 81)",
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                // backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

export default function CustomizedMenus({ btnText = "Menu", menuItems = [] }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls={open ? "customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                disableElevation
                color="white"
                onClick={handleClick}
                endIcon={<FilterList />}
            >
                {btnText}
            </Button>
            <StyledMenu id="customized-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                {menuItems.map((item, index) =>
                    item.divide ? (
                        <Divider key={index} sx={{ my: 0.5 }} />
                    ) : (
                        <MenuItem
                            key={index}
                            onClick={() => {
                                item.onClick?.();
                                handleClose();
                            }}
                            disableRipple
                        >
                            {item.icon}
                            {item.label}
                        </MenuItem>
                    )
                )}
            </StyledMenu>
        </div>
    );
}
