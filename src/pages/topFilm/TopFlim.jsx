import React, { useEffect, useState } from "react";
import Line from "../../assets/images/Line.jpg";
import Banner from "../../components/subBanner/Banner";
import Banner1 from "../../assets/images/banner21.jpg";
import { useSelector } from "react-redux";
import Button from "../../components/button/Button";
import { PlayArrow } from "@mui/icons-material";
import CustomDialog from "../../components/popUp/ShowModal";
import CustomIcons from "../../components/pagination/Pagiantion";
import usePagination from "../../hooks/usePagination";
import { Link } from "react-router-dom";

export default function TopFlim() {
    const [topFlim, setTopFlim] = useState([]);
    const listFlim = useSelector((state) => state.counter.listFilm);

    // State phân trang
    const filmsPerPage = 4;
    const [isDetail, setIsDetail] = useState({});
    const [open, setOpen] = useState(false);
    const [selectedFlim, setSelectedFlim] = useState(null);

    useEffect(() => {
        getTopFlim();
        window.scrollTo(0, 0);
    }, [listFlim]);

    const toogleDetailMota = (id) => {
        setIsDetail((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const getTopFlim = () => {
        if (listFlim) {
            setTopFlim(listFlim.filter((f) => f.danhGia >= 8));
        }
    };

    // Tính toán danh sách phim theo trang

    const handleOpen = (trailer) => {
        if (trailer) {
            setSelectedFlim(trailer);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setSelectedFlim(null);
        setOpen(false);
    };

    // use pagination
    const { currentItems, totalPages, currentPage, handlePageClick } = usePagination({
        items: topFlim || [],
        itemsPerPage: filmsPerPage,
    });

    // console.log("Danh sách phim:", topFlim);
    // console.log("Phim hiện tại:", currentItems);
    // console.log("Tổng số trang:", totalPages);
    // console.log("Trang hiện tại:", currentPage);

    const renderTopFlim = () => {
        return currentItems.map((top) => (
            <div key={top.maPhim} className="flex items-center h-[300px] bg-gray-50 shadow-lg rounded-lg overflow-hidden ">
                <div className="img h-full w-[34%] flex-shrink-0 relative">
                    <img src={top.hinhAnh} alt="Ảnh Phim" className="h-full w-full object-cover rounded-l-lg" />
                    <button onClick={() => handleOpen(top.trailer)} className="absolute center-ab text-red z-20 bg-white p-4 rounded-full">
                        <PlayArrow fontSize="large" />
                    </button>
                </div>
                <Link to={`/detail-film/${top.maPhim}`} className="content flex-1 p-4 overflow-y-auto">
                    <h4 className="text-xl font-bold">{top.tenPhim}</h4>
                    <div className="text-gray-700 text-xs">
                        <strong>Mô tả: </strong>{" "}
                        {top.moTa ? (
                            <div>
                                {isDetail[top.maPhim] ? top.moTa : `${top.moTa.slice(0, 100)}...`}
                                {top.moTa.length > 100 && (
                                    <button className="text-blue-500 ml-2" onClick={() => toogleDetailMota(top.maPhim)}>
                                        {isDetail[top.maPhim] ? "Rút gọn" : "Xem thêm"}
                                    </button>
                                )}
                            </div>
                        ) : (
                            "Hiện phim này không có mô tả"
                        )}
                    </div>
                    <div className="text-gray-700 flex gap-2">
                        <strong>Đánh giá: </strong> <div className="text-red-600">{top.danhGia}</div>
                    </div>
                    <p className="text-gray-700">
                        <strong>Trạng thái: </strong>
                        {top.hot && <span className="text-red-500 font-bold"> 🔥 Hot</span>}
                        {top.dangChieu && <span className="text-green-500 font-bold"> 🎬 Đang chiếu</span>}
                        {top.sapChieu && <span className="text-blue-500 font-bold"> ⏳ Sắp chiếu</span>}
                    </p>
                    <div className="mt-5">
                        <Button bgColor="black" height="40px" width="50%" color="white" hoverOutline="2px solid black">
                            Đặt vé
                        </Button>
                    </div>
                </Link>
            </div>
        ));
    };

    return (
        <div className="">
            <Banner title={"Danh sách phim được đánh giá cao"} imgBanner={Banner1} linkTitle={"Top phim"} link={"/top-film"} />

            <section>
                <div className="mt-3">
                    <img src={Line} alt="line" />
                </div>
            </section>

            <section className="layout-padding">
                <div className="flex justify-end">
                    {/* Phân trang */}
                    <CustomIcons totalPages={totalPages} handlePageClick={handlePageClick} page={currentPage} />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">{currentItems ? renderTopFlim() : <div>Hiện không có phim nào.</div>}</div>
            </section>

            {/* modal */}
            <div className="relative">
                <CustomDialog open={open} handleOpen={handleClose} showFooter={false} showX={false}>
                    {selectedFlim ? (
                        <iframe
                            width="100%"
                            height="600px"
                            src={selectedFlim.replace("watch?v=", "embed/")}
                            title="Trailer"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p>Không tìm thấy trailer</p>
                    )}
                </CustomDialog>
            </div>
        </div>
    );
}
