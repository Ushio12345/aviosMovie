import React from "react";
import Page404Img from "../../assets/images/4041.png";
import "./Page404.scss";
import { GoArrowRight } from "react-icons/go";
import { ArrowBack, ArrowLeft, ChevronLeft } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

export default function Page404() {
    const navigate = useNavigate();
    return (
        <div className=" pageError relative">
            <div className="layout flex flex-col justify-center items-center gap-10   absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="w-1/2 m-auto">
                    <img src={Page404Img}></img>
                </div>
                <div className="space-y-5 text-center">
                    <h3 className="lg:text-2xl md:text-xl text-lg font-extrabold">Rất tiếc, chúng tôi không tìm thấy trang đó!</h3>
                    <p>Trang bạn đang tìm kiếm không tồn tại.</p>
                </div>

                <div className="">
                    <Button
                        bgColor="var(--orange)"
                        color="white"
                        hoverOutline="2px solid var(--orange)"
                        width="150px"
                        height="50px"
                        onClick={() => navigate("/")}
                    >
                        <ArrowBack /> Trở về trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );
}
