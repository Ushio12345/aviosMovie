import React, { useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import MultipleSelect from "../../../../components/select/Selected";
import "./Modal.scss";
import useInput from "../../../../hooks/useInput";
import { addNewUser, editInforUser } from "../../services/UserServices";

import { showAlert } from "../../../../components/Aleart/Aleart";
import { validateForm } from "../../schemas/UserValidate";
import { useDispatch, useSelector } from "react-redux";
import { addNew, editUs } from "../../../../action/actions";
import { Dialog, DialogActions, DialogTitle, IconButton, InputAdornment, Slide, useMediaQuery, useTheme } from "@mui/material";
import Button from "../../../../components/button/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModalUser({ editUser, users, open, handleClose }) {
    const [selectedRole, setSelectedRole] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    // const userLoad = useSelector((state) => state.counter.users);
    // console.log("editUser", editUser);
    // mui hide show password
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    useEffect(() => {
        if (editUser) {
            setDataEdit({ ...editUser, maNhom: "GP01" });
        }
    }, [editUser]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const role = ["QuanTri", "KhachHang"];

    const [errors, setError] = useState({});

    const [dataEdit, setDataEdit] = useState({
        taiKhoan: "",
        soDT: "",
        hoTen: "",
        email: "",
        maLoaiNguoiDung: "",
        matKhau: "",
    });

    //handle change

    const handleChange = (e) => {
        setDataEdit((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    useEffect(() => {
        setDataEdit((prev) => ({
            ...prev,
            maLoaiNguoiDung: selectedRole.toString(),
        }));
    }, [selectedRole]);

    //edit user
    const handlEditUser = async (event) => {
        event.preventDefault();
        console.log("form trước khi gửi:", { ...dataEdit, maLoaiNguoiDung: selectedRole });

        const validate = validateForm(dataEdit, confirmPassword);
        setError(validate);

        if (Object.keys(validate).length === 0) {
            const res = await editInforUser({ ...dataEdit, maLoaiNguoiDung: selectedRole.toString() });
            console.log("res", res);
            if (res.data.statusCode === 200) {
                dispatch(editUs({ ...dataEdit, maLoaiNguoiDung: selectedRole }));
                showAlert("success", "Thành công", "Tài khoản được cập nhật thành công", "top-right");
            } else {
                showAlert("error", "Lỗi", `${res.data.message}`);
            }
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
            maxWidth={"md"}
            TransitionComponent={Transition}
            keepMounted
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "md",
                    },
                },
            }}
        >
            <DialogTitle>{"Chỉnh sửa thông tin người dùng "}</DialogTitle>
            <form className="p-5 space-y-7" onSubmit={handlEditUser}>
                <TextField
                    id="standard-basic"
                    label="Tài khoản"
                    variant="filled"
                    fullWidth
                    value={dataEdit.taiKhoan ?? ""}
                    error={!!errors.taiKhoan}
                    helperText={errors.taiKhoan}
                    onChange={handleChange}
                    name="taiKhoan"
                    disabled
                />
                <TextField
                    id="standard-basic"
                    label="Họ và tên"
                    variant="standard"
                    value={dataEdit.hoTen ?? ""}
                    fullWidth
                    error={!!errors.hoTen}
                    helperText={errors.hoTen}
                    name="hoTen"
                    onChange={handleChange}
                />
                <div className="flex gap-4">
                    <TextField
                        id="standard-basic"
                        label="Email"
                        value={dataEdit.email ?? ""}
                        variant="standard"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                        name="email"
                        onChange={handleChange}
                    />
                    <TextField
                        id="standard-basic"
                        label="Số điện thoại"
                        variant="standard"
                        fullWidth
                        error={!!errors.soDT}
                        helperText={errors.soDT}
                        value={dataEdit.soDT ?? ""}
                        name="soDT"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-4">
                    <TextField
                        label={"Mật khẩu"}
                        variant="standard"
                        fullWidth
                        error={!!errors.matKhau}
                        helperText={!!errors.matKhau}
                        type={showPassword ? "text" : "password"}
                        name={name}
                        value={dataEdit.matKhau}
                        onChange={handleChange}
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

                    <TextField
                        id="standard-basic"
                        label="Nhập lại mật khẩu"
                        variant="standard"
                        fullWidth
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="confirmPassword"
                        value={confirmPassword}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                </div>
                <div className="selected-role mt-4">
                    <MultipleSelect
                        selectItem={role.map((role) => role)}
                        titleSelected={"Chức năng"}
                        onChange={setSelectedRole}
                        multiple={false}
                        value={selectedRole}
                        name="maLoaiNguoiDung"
                    />
                </div>
            </form>
            <DialogActions>
                <Button onClick={handleClose} width="100px" height="40px" color="blue" hoverOutline="2px solid blue">
                    Thoát
                </Button>
                <Button
                    onClick={handlEditUser}
                    bgColor="green"
                    width="100px"
                    height="40px"
                    color="white"
                    hoverOutline="2px solid green"
                    hoverColor="green"
                >
                    Cập nhật
                </Button>
            </DialogActions>
        </Dialog>
    );
}
