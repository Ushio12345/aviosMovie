import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";
import React from "react";

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [alertData, setAlertData] = useState({
        severity: "success",
        message: "",
        title: "",
        position: { vertical: "top", horizontal: "right" },
    });

    const showAlert = (message, severity = "success", title = "", position = { vertical: "top", horizontal: "right" }) => {
        setAlertData({ message, severity, title, position });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AlertContext.Provider value={showAlert}>
            {children}

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={alertData.position}>
                <Alert onClose={handleClose} severity={alertData.severity} color={alertData.severity}>
                    {alertData.title && <AlertTitle>{alertData.title}</AlertTitle>}
                    {alertData.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};
