import React, { useEffect, useState } from "react";
import CustomSlider from "../../../components/silder-slick/CustomSlick";

export default function NgayChieuSlider({ heThongRapChieu, onSelectNgay }) {
    const [ngayChieuList, setNgayChieuList] = useState([]);
    const [selectedNgay, setSelectedNgay] = useState(null);

    useEffect(() => {
        if (!heThongRapChieu || heThongRapChieu.length === 0) return;

        // Lấy danh sách ngày duy nhất
        const ngayChieuAllHeThong = heThongRapChieu.flatMap((ht) =>
            ht.cumRapChieu.flatMap((cum) => cum.lichChieuPhim.map((lich) => new Date(lich.ngayChieuGioChieu).toLocaleDateString("vi-VN")))
        );

        // console.log(ngayChieuAllHeThong);

        const uniqueNgay = [...new Set(ngayChieuAllHeThong)].sort((a, b) => new Date(a) - new Date(b));

        setNgayChieuList(uniqueNgay);
        if (uniqueNgay.length > 0) {
            setSelectedNgay(uniqueNgay[0]);
            onSelectNgay(uniqueNgay[0]);
        }
    }, [heThongRapChieu, onSelectNgay]);

    const handleSelectNgay = (ngay) => {
        setSelectedNgay(ngay);
        onSelectNgay(ngay);
    };

    return (
        <div className="my-4">
            <CustomSlider settings={{ slidesToShow: 10 }}>
                {" "}
                {ngayChieuList.map((ngay) => (
                    <div key={ngay} className="px-2">
                        <div
                            className={`text-center py-2 border-2 rounded-lg cursor-pointer ${
                                selectedNgay === ngay ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                            }`}
                            onClick={() => handleSelectNgay(ngay)}
                        >
                            {ngay}
                        </div>
                    </div>
                ))}
            </CustomSlider>
        </div>
    );
}
