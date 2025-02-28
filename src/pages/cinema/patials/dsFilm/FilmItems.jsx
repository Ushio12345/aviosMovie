import React, { useState } from "react";

export default function FilmItems({ listFilmInHeThong, selectedCinema }) {
    // console.log("films", listFilmInHeThong);

    const renderListFilmInHeThong = () => {
        return listFilmInHeThong.length > 0 ? (
            <div>
                {listFilmInHeThong.map((film, index) => (
                    <div key={(film.maLichChieu, index)} className="flex gap-3 p-1 border-b-2">
                        <div className="img-films w-[20%]">
                            <img src={film.hinhAnh} alt="Anh Phim" />
                        </div>
                        <div className="content-film w-[80%]">
                            <h3 className="">{film.tenPhim}</h3>
                            <div></div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div>
                <p>Hiện không tìm thấy phim nào trong hệ thống</p>
            </div>
        );
    };
    return <div>{renderListFilmInHeThong()}</div>;
}
