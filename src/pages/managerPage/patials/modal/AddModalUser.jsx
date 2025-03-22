import React, { useState } from "react";
import { useShowModal } from "../../../../hooks/showModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MultipleSelect from "../../../../components/select/Selected";
import "./Modal.scss";
import useInput from "../../../../hooks/useInput";
import { addNewUser } from "../../services/UserServices";
import { data } from "react-router-dom";
import { showAlert } from "../../../../components/Aleart/Aleart";
import { validateForm } from "../../schemas/UserValidate";
import { useDispatch } from "react-redux";
import { addNew } from "../../../../action/actions";
export default function AddModalUser() {
    const [selectedRole, setSelectedRole] = useState("KhachHang");

    const taiKhoanRef = useInput();
    const hoTenRef = useInput();
    const emailRef = useInput();
    const soDTRef = useInput();
    const matKhauRef = useInput();
    const confirmPwdRef = useInput();
    const dispatch = useDispatch();

    const role = ["QuanTri", "KhachHang"];

    const [errors, setError] = useState({});

    const handleAddUser = async (event) => {
        event.preventDefault();
        const dataForm = {
            taiKhoan: taiKhoanRef.getValue(),
            hoTen: hoTenRef.getValue(),
            email: emailRef.getValue(),
            soDT: soDTRef.getValue(),
            matKhau: matKhauRef.getValue(),
            maLoaiNguoiDung: selectedRole.toString(),
            maNhom: "GP01",
        };
        const confirmPassword = confirmPwdRef.getValue();
        const validate = validateForm(dataForm, confirmPassword);
        setError(validate);
        // console.log("validate", validate);
        if (Object.keys(validate).length === 0) {
            const addUser = await addNewUser(dataForm);

            try {
                if (addUser) {
                    dispatch(addNew(dataForm));
                    showAlert("success", "Thành công", "Tài khoản được tạo thành công ", "top-right");
                    setOpen(false);
                }
            } catch {
                //   showAlert("success", "Thành công", "Tài khoản được tạo thành công ", "top-right");
            }
        }
    };
    const { open, setOpen, ModalCus } = useShowModal({
        titleBtn: <i className="fa-solid fa-user-plus h-[30px] w-[30px] flex items-center justify-center"></i>,
        dialogTitle: "Thêm mới người dùng",
        dialogActionClose: "Hủy",
        DialogActionsAccept: "Thêm",
        maxWidth: "lg",
        action: handleAddUser,
    });
    return (
        <div className="modalAddUser">
            {ModalCus(
                <form className="py-4 space-y-7" onSubmit={handleAddUser}>
                    <TextField
                        id="filled-basic"
                        label="Tài khoản"
                        variant="filled"
                        fullWidth
                        inputRef={taiKhoanRef.refValue}
                        onChange={(e) => taiKhoanRef.setValue(e.target.value)}
                        error={!!errors.taiKhoan}
                        helperText={errors.taiKhoan}
                    />
                    <TextField
                        id="filled-basic"
                        label="Họ và tên"
                        variant="filled"
                        fullWidth
                        inputRef={hoTenRef.refValue}
                        onChange={hoTenRef.onChangeValue}
                        error={!!errors.hoTen}
                        helperText={errors.hoTen}
                    />
                    <div className="flex gap-4">
                        <TextField
                            id="filled-basic"
                            label="Email"
                            variant="filled"
                            fullWidth
                            inputRef={emailRef.refValue}
                            onChange={emailRef.onChangeValue}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            id="filled-basic"
                            label="Số điện thoại"
                            variant="filled"
                            fullWidth
                            inputRef={soDTRef.refValue}
                            onChange={soDTRef.onChangeValue}
                            error={!!errors.soDT}
                            helperText={errors.soDT}
                        />
                    </div>
                    <div className="flex gap-4">
                        <TextField
                            id="filled-basic"
                            label="Mật khẩu"
                            variant="filled"
                            fullWidth
                            inputRef={matKhauRef.refValue}
                            onChange={matKhauRef.onChangeValue}
                            error={!!errors.matKhau}
                            helperText={errors.matKhau}
                        />
                        <TextField
                            id="filled-basic"
                            label="Nhập lại mật khẩu"
                            variant="filled"
                            fullWidth
                            inputRef={confirmPwdRef.refValue}
                            onChange={confirmPwdRef.onChangeValue}
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
                        />
                    </div>
                </form>
            )}
        </div>
    );
}
