import React, { useState } from "react";
import { useShowModal } from "../../../hooks/showModal";
import { showAlert } from "../../../components/Aleart/Aleart";
import { validateForm } from "../schema/ValidateFrom";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function ChangePass({ data, handleChange, setData, loading }) {
    const [currPass, setCurrPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [comfirmPass, setComfirmPass] = useState("");
    const [step, setStep] = useState(1);
    const [err, setErr] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // show hide pass
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    //   check pass
    const handleCheckPass = () => {
        if (currPass.length === 0) {
            const validate = validateForm(data);
            setErr(validate.matKhau);
            // setErr("Vui lòng nhập mật khẩu")
        }
        if (currPass === data.matKhau) {
            setStep(2);
        } else {
            showAlert("error", "Thất bại!", "Sai mật khẩu", "center");
        }
    };

    const handleCheckConfirm = () => {
        if (comfirmPass !== newPass) {
            showAlert("error", "Thất bại!", "Mật khẩu xác nhận không đúng", "center");
        } else {
            setData((prev) => {
                const updatedData = { ...prev, matKhau: newPass };
                // console.log("Updated Data:", updatedData);
                return updatedData;
            });

            setOpen(false);
            showAlert("success", "Thành công!", "Nhấn lưu để hoàn tất cập nhật", "center");
        }
    };

    const { open, setOpen, ModalCus } = useShowModal({
        titleBtn: "Thay đổi mật khẩu",
        dialogTitle: step === 1 ? "Xác nhận mật khẩu hiện tại" : "Nhập mật khẩu mới",
        dialogActionClose: "Hủy",
        DialogActionsAccept: step === 1 ? "Tiếp tục" : "Cập nhật",
        action: step === 1 ? handleCheckPass : handleCheckConfirm,
    });

    return (
        <div className="">
            <>
                {ModalCus(
                    <div className="space-y-4">
                        {step === 1 ? (
                            <div className="py-3">
                                <TextField
                                    label="Mật khẩu hiện tại"
                                    type={showPassword ? "text" : "password"}
                                    name=""
                                    fullWidth
                                    value={currPass}
                                    onChange={(e) => setCurrPass(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="space-y-3 py-2">
                                <TextField
                                    className=""
                                    type="password"
                                    label="Mật khẩu mới"
                                    fullWidth
                                    value={newPass}
                                    name="matKhau"
                                    onChange={(e) => setNewPass(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    type={showPassword ? "text" : "password"}
                                    label="Xác nhận mật khẩu mới"
                                    fullWidth
                                    value={comfirmPass}
                                    onChange={(e) => setComfirmPass(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </>
        </div>
    );
}
