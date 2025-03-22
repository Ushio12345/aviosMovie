import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import usePagination from "../../hooks/usePagination";
import CustomIcons from "../../components/pagination/Pagiantion";

export default function FilmItem({ films }) {
    // console.log(films);

    const renderFilms = () => {
        return currentItems.map((f) => (
            <div key={f.maPhim} className="film-item relative p-3">
                <Link
                    to={`/detail-film/${f.maPhim}`}
                    className="film-content flex flex-col gap-3 p-4 text-white"
                    style={{
                        backgroundImage: `url(${f.hinhAnh})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "10px",
                        height: "400px",
                    }}
                >
                    <div className="status flex items-center gap-2">
                        {f.hot && <p className="bg-red-500 text-white p-1 text-xs rounded-lg">Hot</p>}
                        {f.dangChieu && <p className="bg-green-500 text-white p-1 text-xs rounded-lg">Đang chiếu</p>}
                        {f.sapChieu && <p className="bg-yellow-500 text-white p-1 text-xs rounded-lg">Sắp chiếu</p>}
                    </div>
                    <div className="mt-auto">
                        <strong className="text-xl">{f.tenPhim}</strong>
                    </div>
                    <Button bgColor="white" color="black" width="55%" height="40px">
                        Đặt vé ngay
                    </Button>
                </Link>
            </div>
        ));
    };
    const { currentItems, totalPages, currentPage, handlePageClick } = usePagination({
        items: films || [],
        itemsPerPage: 8,
    });
    return (
        <div>
            {films ? (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2">{renderFilms()}</div>
            ) : (
                <div>
                    <p>Hiện danh sách phim đang trống.</p>
                </div>
            )}
            <div>
                <CustomIcons totalPages={totalPages} handlePageClick={handlePageClick} page={currentPage} />
            </div>
        </div>
    );
}
