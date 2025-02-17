import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./services/LoginService";
import Button from "../../components/button/Button";

export default function Login() {
    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
    });
    const navigator = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(user);
            if (response) {
                // console.log(response.data.content.accessToken);
                const token = response.data.content.accessToken;
                localStorage.setItem("accessToken", token);
                navigator("/");
            }
        } catch (error) {
            console.error("Đăng nhập thất bại", error);
            alert("Sai tên tài khoản hoặc mật khẩu!");
        }
        console.log("====================================");
        console.log("click");
        console.log("====================================");
    };

    return (
        <div className="">
            <div className=" bg-black py-4">
                <Link className="flex items-center gap-4" to={"/"}>
                    <i className="fa-solid fa-arrow-left"></i>
                    <p>Trở về trang chủ</p>
                </Link>
            </div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Đăng nhập</h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="taiKhoan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                                    <input
                                        type="taiKhoan"
                                        name="taiKhoan"
                                        id="taiKhoan"
                                        value={user.taiKhoan}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nhập tên tài khoản"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="matKhau"
                                        onChange={handleChange}
                                        name="matKhau"
                                        id="matKhau"
                                        value={user.matKhau}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                {/* <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                                <Button type="submit" color="white" bgColor="var(--orange)" width="100%" height="40px">
                                    Sign in
                                </Button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Bạn chưa có tài khoản?
                                    <Link to="/register" className="text-orange-300 font-medium  hover:underline dark:text-primary-500">
                                        Đăng kí ngay
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
