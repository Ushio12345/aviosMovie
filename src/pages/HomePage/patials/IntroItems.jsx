import React from "react";
import IconCycle from "../../../components/Icon/IconCycle";
import MaskImg from "../../../assets/images/eye-mask.png";
import Comedy from "../../../assets/images/comedy.png";
import Award from "../../../assets/images/award.png";
export default function IntroItems() {
    return (
        <div className="introItem w-[90%] m-auto pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="intro-item flex-space gap-5">
                    <div>
                        <p>Tham gia ngay</p>
                        <h4>Liên hoan phim sắp tới</h4>
                    </div>

                    <div className="  p-5 flex-center icon-cycle " style={{ backgroundColor: "var(--orange)" }}>
                        <img className="w-[70px] h-[70px]" src={MaskImg} alt="Icon" />
                    </div>
                    <div className="overlay"></div>
                </div>
                <div className="intro-item flex-space gap-5">
                    <div>
                        <p>Xem ngay</p>
                        <h4>Xem phim Giải thưởng</h4>
                    </div>

                    <div className="  p-5 flex-center icon-cycle " style={{ backgroundColor: "var(--orange)" }}>
                        <img className="w-[70px] h-[70px]" src={Award} alt="Icon" />
                    </div>
                    <div className="overlay"></div>
                </div>
                <div className="intro-item flex-space gap-5">
                    <div>
                        <p>Đặt vé</p>
                        <h4>Comedy TV Shows</h4>
                    </div>

                    <div className="  p-5 flex-center icon-cycle " style={{ backgroundColor: "var(--orange)" }}>
                        <img className="w-[70px] h-[70px]" src={Comedy} alt="Icon" />
                    </div>
                    <div className="overlay"></div>
                </div>
            </div>
        </div>
    );
}
