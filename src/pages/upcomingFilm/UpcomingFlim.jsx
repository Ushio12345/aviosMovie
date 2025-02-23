import React from "react";
import Banner from "../../components/subBanner/Banner";
import imgBanner from "../../assets/images/banner21.jpg";
export default function UpcomingFlim() {
    return (
        <div>
            <Banner title={"Đón chờ các phim bom tấn sắp ra mắt."} imgBanner={imgBanner} link={"upcoming-film"} linkTitle={"Phim sắp chiếu"} />
        </div>
    );
}
