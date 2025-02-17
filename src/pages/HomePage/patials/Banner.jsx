import React, { useEffect, useState } from "react";
import getBanner from "../services/BannerServices";
import { Carousel } from "@material-tailwind/react";

export default function Banner() {
    const [bannerImg, setBannerImg] = useState([]);

    useEffect(() => {
        getAllBanner();
    }, []);

    const getAllBanner = async () => {
        try {
            let res = await getBanner();
            if (res.status === 200) {
                console.log(res.data.content);
                setBannerImg(res.data.content);
            }
        } catch (error) {
            console.log("Lỗi trong quá trình lấy banner", error);
        }
    };

    return (
        <div className="w-full h-screen banner">
            <Carousel
                className="rounded-xl w-full h-full"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                {bannerImg.map((img, index) => (
                    <div key={index}>
                        <img src={img.hinhAnh} alt="Banner" className="w-full h-full object-cover" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
