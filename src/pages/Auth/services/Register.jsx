import React, { useState } from "react";
import Button from "../../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { register } from "./LoginService";
import { validateForm } from "../schema/ValidateForm";
import { showAlert } from "../../../components/Aleart/Aleart";
import useToogle from "../../../hooks/useToogle";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
    const [formData, setFormData] = useState({
        taiKhoan: "",
        hoTen: "",
        matKhau: "",
        email: "",
        soDt: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const nagivator = useNavigate();
    const [isShowPwd, setIsShowPwd] = useToogle();
    const [isShowConfirmPwd, setIsComfirm] = useToogle();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateData = validateForm(formData, confirmPassword);
        setErrors(validateData);

        if (Object.keys(validateData).length === 0) {
            try {
                const response = await register(formData);
                // console.log("Phản hồi từ server register:", response.message);

                if (response) {
                    console.log(response);
                    showAlert("success", "Thành công", "Đăng kí thành công chuyển đến trang đăng nhâp", "top-right");
                    nagivator("/login");
                }
            } catch (error) {
                console.error("Đăng kí thất bại:", error);
                showAlert("Tài khoản đã tồn tại hoặc lỗi server!");
            }
        } else {
            console.log("Có lỗi trong form, không gửi request.");
        }
    };
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng kí tài khoản
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div className="flex gap-1">
                                    <div>
                                        <label htmlFor="taiKhoan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Tên tài khoản
                                        </label>
                                        <input
                                            type="text"
                                            name="taiKhoan"
                                            id="taiKhoan"
                                            value={formData.taiKhoan}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Nhập tài khoản"
                                        />
                                        <p className="text-xs text-red-400 italic">{errors.taiKhoan}</p>
                                    </div>

                                    <div>
                                        <label htmlFor="hoTen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Họ và tên
                                        </label>
                                        <input
                                            type="text"
                                            name="hoTen"
                                            id="hoTen"
                                            value={formData.hoTen}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Nhập họ tên"
                                        />
                                        <p className="text-xs text-red-400 italic">{errors.hoTen}</p>
                                    </div>
                                </div>

                                <div className=" flex gap-1">
                                    <div>
                                        <label htmlFor="matKhau" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Mật khẩu
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={isShowPwd ? "text" : "password"}
                                                name="matKhau"
                                                id="matKhau"
                                                value={formData.matKhau}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="••••••••"
                                            />
                                            <div className="absolute top-1/2 -translate-y-1/2 right-3" onClick={setIsShowPwd}>
                                                {!isShowPwd ? <VisibilityOff /> : <Visibility />}
                                            </div>
                                        </div>
                                        <p className="text-xs text-red-400 italic">{errors.matKhau}</p>
                                    </div>

                                    <div>
                                        <label htmlFor="confirmMatKhau" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Xác nhận mật khẩu
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={isShowConfirmPwd ? "text" : "password"}
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="••••••••"
                                            />
                                            <div className="absolute top-1/2 -translate-y-1/2 right-3" onClick={setIsComfirm}>
                                                {!isShowConfirmPwd ? <VisibilityOff /> : <Visibility />}
                                            </div>
                                        </div>
                                        <p className="text-xs text-red-400 italic">{errors.confirmPassword}</p>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="example@gmail.com"
                                    />
                                    <p className="text-xs text-red-400 italic">{errors.email}</p>
                                </div>

                                <div>
                                    <label htmlFor="soDt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        name="soDt"
                                        id="soDt"
                                        value={formData.soDt}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="0193738473"
                                    />
                                    <p className="text-xs text-red-400 italic">{errors.soDt}</p>
                                </div>

                                {/* <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            name="termsAccepted"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            checked={formData.termsAccepted}
                                            onChange={handleChange}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                            I accept the{" "}
                                            <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div> */}

                                <Button type="submit" color="white" bgColor="var(--orange)" width="100%" height="40px">
                                    Lưu
                                </Button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Đã có tài khoản?{" "}
                                    <Link to="/login" className="text-orange-400 font-medium text-primary-600 hover:font-bold dark:text-primary-500">
                                        Đăng nhập ở đây
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
