import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const useShowModal = ({
    titleBtn = "",
    dialogTitle = "",
    dialogActionClose = "Đóng",
    DialogActionsAccept = "Hoàn tất",
    action,
    maxWidth = "lg",
}) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ModalCus = (children) => (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                {titleBtn}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: { maxWidth },
                        },
                    },
                }}
            >
                <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{dialogActionClose}</Button>
                    <Button onClick={action}>{DialogActionsAccept}</Button>
                </DialogActions>
            </Dialog>
        </>
    );

    return { open, setOpen, ModalCus };
};
