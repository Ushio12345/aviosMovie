import React, { useState } from "react";
import Banner from "../../components/subBanner/Banner";
import bannerImg from "../../assets/images/banner31.jpg";
import ListCinema from "./patials/dsRap/ListCinema";
import "./Cinema.scss";
import ListCumRap from "./patials/dsRap/ListCumRap";
import ListFilm from "./patials/dsFilm/ListFilm";
export default function Cinema() {
    console.log("cinema");

    return (
        <div>
            <Banner imgBanner={bannerImg} title={"Hệ thống rạp trên toàn quốc"} linkTitle={"Cinema"} />
            <div className="danhSachRap  layout-padding flex-1 overflow-x-auto overflow-hidden ">
                <div className="  rap flex w-full min-w-[1200px] h-[500px] ">
                    <div className="list-cinema w-[100px] ">
                        <ListCinema />
                    </div>
                    <div className="w-[30%]  overflow-y-auto h-full  ">
                        <ListCumRap />
                    </div>
                    <div className="flex-1 overflow-y-auto h-full ">
                        <ListFilm />
                    </div>
                </div>
            </div>
        </div>
    );
}
