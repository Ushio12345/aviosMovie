import React from "react";
import Page404Img from "../../assets/images/Illustration.png";

import { GoArrowRight } from "react-icons/go";
import { ArrowBack, ArrowLeft, ChevronLeft } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
export default function Page404() {
    return (
        <div className=" pageError  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  layout">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6 items-center">
                <div className="col-span-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl">Opps! Không tìm thấy trang</h2>
                        <p className="">Có lỗi xảy ra. Có vẻ như liên kết bị hỏng hoặc trang đã bị xóa.</p>
                    </div>
                    <div className="flex w-f">
                        <div className="">
                            <button className=" py-3 px-1 bg-green-500 hover:bg-green-800 hover:text-white text-white font-bold  rounded inline-flex items-center w-full">
                                <Link to="/" className="flex items-center text-white ">
                                    <ArrowBack /> Trang chủ
                                </Link>
                            </button>
                        </div>
                        <div>
                            <button className="py-3 px-1 mx-10 text-black outline outline-red-100-500 hover:bg-blue-600 hover:text-white  font-bold  rounded inline-flex items-center">
                                <Link to="/login" className="flex items-center ">
                                    Trang đăng nhập <GoArrowRight className="ml-3" />{" "}
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    {" "}
                    <img src={Page404Img} alt="Error Page Image" />
                </div>
            </div>
        </div>
    );
}
