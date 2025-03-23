import React from "react";
import "./Contact.scss";
import Banner from "../../components/subBanner/Banner";
import Banner1 from "../../assets/images/banner21.jpg";
import { MovieCreation } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Button from "../../components/button/Button";
export default function Contact() {
    return (
        <div className="contact ">
            <Banner title={"Liên hệ với chúng tôi"} imgBanner={Banner1} linkTitle={"LIÊN HỆ"} link={"/contact"}></Banner>

            <div className="md:w-1/2 m-auto w-[90%] ">
                <div className="title">
                    <p className="text-orange-700">
                        <MovieCreation />
                    </p>
                    <p className="font-bold">Liên hệ với chúng tôi</p>
                    <h3>Hãy thoải mái viết thư cho chúng tôi bất cứ lúc nào</h3>
                </div>

                <div className="my-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
                        <TextField id="filled-basic" label="Họ và tên" variant="filled" fullWidth />
                        <TextField id="filled-basic" label="Email" variant="filled" fullWidth />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
                        <TextField id="filled-basic" label="Số điện thoại" variant="filled" fullWidth />
                        <TextField id="filled-basic" label="Nghề nghiệp" variant="filled" fullWidth />
                    </div>
                    <div className="">
                        <TextField
                            id="filled-multiline-static"
                            label="Đóng góp/Ý kiến của bạn dành cho chúng tôi"
                            multiline
                            rows={4}
                            variant="filled"
                            fullWidth
                        />
                    </div>
                    <div className="flex-center">
                        <Button width="50%" height="40px" bgColor="var(--orange)" color="white" hoverBgColor="black">
                            Gửi
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
