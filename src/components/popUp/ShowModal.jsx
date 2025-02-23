import React from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton } from "@material-tailwind/react";

const CustomDialog = ({ open, children, handleOpen, title, body, confirmText, cancelText, showFooter = true, size = "xl", showX = true }) => {
    return (
        <Dialog open={open} handler={handleOpen} className="" size={size}>
            {/* Nút X để đóng Dialog */}

            {showX && (
                <div className="flex justify-end absolute right-0">
                    <IconButton variant="text" color="gray" className=" block" onClick={handleOpen}>
                        ✕
                    </IconButton>
                </div>
            )}

            {/* Tiêu đề */}
            <DialogHeader className="flex justify-between items-center">
                <div>{title}</div>
            </DialogHeader>

            {/* Nội dung */}
            <DialogBody>{children}</DialogBody>

            {/* Footer với hai nút Cancel & Confirm */}
            {showFooter ? (
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        <span>{cancelText || "Hủy"}</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>{confirmText || "Xác nhận"}</span>
                    </Button>
                </DialogFooter>
            ) : (
                ""
            )}
        </Dialog>
    );
};

export default CustomDialog;
