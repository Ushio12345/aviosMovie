import { useState } from "react";

export const useShowModal = () => {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState("");
    const handleClickOpen = (scrollType = "") => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return { open, handleClickOpen, handleClose };
};
