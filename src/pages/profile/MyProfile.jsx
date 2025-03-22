import React, { useEffect, useState } from "react";
import { showAlert } from "../../components/Aleart/Aleart";
import { getUserProfile, updateUserProfile } from "./services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth } from "../../action/actions";
import ChangePass from "./patials/ChangePass";
import "./MyProfile.scss";
import { validateForm } from "./schema/ValidateFrom";
import Loading2 from "../../components/loading/Loading2";
export default function MyProfile() {
    const [data, setData] = useState({
        hoTen: "",
        taiKhoan: "",
        soDT: "",
        email: "",
        matKhau: "",
    });
    const [err, setErr] = useState({});
    const dispatch = useDispatch();
    const userAuth = useSelector((state) => state.counter.userAuth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [loading]);
    useEffect(() => {
        const fetchDataUser = async () => {
            setLoading(true);
            try {
                const response = await getUserProfile();
                setData({
                    ...response.data.content,
                });
                console.log("data", data);
            } catch {
                showAlert("error", "Lỗi!", "Không lấy được thông tin người dùng", "top-right");
            } finally {
                setLoading(false);
            }
        };
        fetchDataUser();
    }, []);
    console.log(data);

    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Submitting Data:", data);
        const validate = validateForm(data);
        console.log("val", validate);
        if (Object.keys(validate).length === 0) {
            try {
                setLoading(true);
                const response = await updateUserProfile(data);
                if (response?.data?.statusCode === 200) {
                    showAlert("success", "Thành công!", "Cập nhật thông tin thành công.", "top-right");
                    dispatch(
                        setUserAuth({
                            taiKhoan: data.taiKhoan,
                            email: data.email,
                            role: userAuth?.role,
                        })
                    );
                } else {
                    showAlert("error", "Lỗi!", response?.data?.message || "Có lỗi xảy ra.", "top-right");
                }
            } catch (error) {
                showAlert("error", "Lỗi!", "Không thể cập nhật thông tin.", "top-right");
            } finally {
                setLoading(false);
            }
        } else {
            setErr(validate);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-blue-gray-100 pt-10">
            {loading ? (
                <Loading2 />
            ) : (
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    {/* Logo and Heading */}
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-orange-600 flex items-center justify-center">
                            <span className="mr-1 text-3xl font-bold">MOVIE</span>
                            aovis
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Hệ thống đặt vé dành riêng cho bạn.</p>
                    </div>
                    {/* Divider */}
                    <div className="my-6 border-t border-gray-300 relative">
                        <span className="absolute top-[-10px] bg-white left-1/2 transform -translate-x-1/2 px-3 text-gray-500">TÀI KHOẢN</span>
                    </div>
                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Tài khoản */}
                        <div>
                            <input
                                type="text"
                                placeholder="Tài khoản"
                                value={data.taiKhoan}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-orange-100"
                            />
                        </div>
                        {/* Full Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                name="hoTen"
                                value={data.hoTen}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-orange-100"
                            />
                            {err.hoTen && <p className="text-red-300 text-sm italic">{err.hoTen}</p>}
                        </div>
                        {/* Mobile Number */}
                        <div>
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                name="soDT"
                                value={data.soDT}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-orange-100"
                            />
                            {err.soDT && <p className="text-red-300 text-sm italic">{err.soDT}</p>}
                        </div>
                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-orange-100"
                            />
                            {err.email && <p className="text-red-300 text-sm italic">{err.email}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition"
                        >
                            Lưu thay đổi
                        </button>
                    </form>
                    {/* Footer */}
                    <div className="mt-4 text-center changepass">
                        <p className="text-gray-500 text-sm flex  items-center ">
                            Thay đổi mật khẩu?
                            <ChangePass data={data} handleChange={handleChange} setData={setData} loading={loading} />
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
