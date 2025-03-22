import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/Button";
import {
    CalendarMonth,
    CheckCircle,
    Filter,
    FilterAlt,
    FilterAltOff,
    FireExtinguisher,
    HourglassBottom,
    LocalFireDepartment,
    Movie,
    ThumbDown,
    ThumbUp,
} from "@mui/icons-material";

import CustomizedMenus from "../../../../components/smallMenuDropdownFilter";
import useInput from "../../../../hooks/useInput";
import { useShowModal } from "../../../../hooks/useShowDialog";
import DetailFilmModal from "../modal/DetailFilmModal";
import EditFilmModal from "../modal/EditFilmModal";
import AddFilmModal from "../modal/AddFilmModal";
import { showAlert, showConfirmAlert } from "../../../../components/Aleart/Aleart";
import { deleteFilm } from "../../services/FilmsServices";
import { useDispatch } from "react-redux";
import { deleteFilmRedux } from "../../../../action/actions";
import { useNavigate } from "react-router-dom";

export default function TableListFilm({ listFilms }) {
    const [filterFilm, setFilterFilm] = useState([]);
    const [filterOption, setFilterOption] = useState("");
    const [detailItem, setDetailItem] = useState({});
    const [editItem, setEditItem] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // hooks
    const searchInput = useInput();
    const detailModal = useShowModal();
    const editModal = useShowModal();

    // status

    useEffect(() => {
        handleSearchFilms();
    }, [searchInput.value, listFilms, filterOption]);

    // pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // search and filter
    const handleSearchFilms = () => {
        let filtered = listFilms;
        if (searchInput.value) {
            const lower = searchInput.value.toLowerCase();
            filtered = filtered.filter((film) => film.tenPhim.toLowerCase().includes(lower) || film.maPhim.toString().includes(lower));
        }

        if (filterOption === "Đánh giá tăng dần") {
            filtered = [...filtered.sort((a, b) => a.danhGia - b.danhGia)];
        } else if (filterOption === "Đánh giá thấp dần") {
            filtered = [...filtered.sort((a, b) => b.danhGia - a.danhGia)];
        } else if (filterOption === "Phim sắp chiếu") {
            filtered = [...filtered.filter((f) => f.sapChieu === true)];
        } else if (filterOption === "Phim đang chiếu") {
            filtered = [...filtered.filter((f) => f.dangChieu === true)];
        } else if (filterOption === "Phim hot") {
            filtered = [...filtered].filter((f) => f.hot === true);
        } else {
            setFilterFilm(filtered);
        }
        setFilterFilm(filtered);
        setPage(0);
    };

    // update status
    const handleDeleteFilms = (maPhim) => {
        showConfirmAlert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa slot này không ?", "Xóa", "center").then((result) => {
            if (result.isConfirmed) {
                try {
                    const res = deleteFilm(maPhim);
                    dispatch(deleteFilmRedux(maPhim));
                } catch {
                    showAlert("error", "Lỗi!", "Không thể cập nhật thông tin", "top-right");
                }
            }
        });
    };

    const handleCreateSchedual = (maPhim, film) => {
        // lưu để tránh mất khi load trang do ở bộ nhớ tạm của router-dom
        // localStorage.setItem(("filmSetSchedual", JSON.stringify(film)));
        navigate(`/manager/films/showtime/${maPhim}`, { state: { film } });
    };

    return (
        <div className="relative overflow-x-auto min-w-[1200px] shadow-md sm:rounded-lg">
            {/* modal */}
            <DetailFilmModal open={detailModal.open} handleClose={detailModal.handleClose} detailFilmData={detailItem} />
            <EditFilmModal open={editModal.open} handleClose={editModal.handleClose} editItem={editItem} />
            {/*---------------------------------edn modal  --------------------------------*/}
            <div className="flex-space">
                <div className="pb-4 bg-white dark:bg-gray-900 flex items-center">
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none top-1/2 -translate-y-1/2">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập tên phim, ngày khởi chiếu"
                            value={searchInput.value}
                            onChange={searchInput.onChangeValue}
                        />
                    </div>
                    <div>
                        <CustomizedMenus
                            btnText={""}
                            menuItems={[
                                { icon: <ThumbUp />, label: "Đánh giá tăng dần", onClick: () => setFilterOption("Đánh giá tăng dần") },
                                { icon: <ThumbDown />, label: "Đánh giá thấp dần", onClick: () => setFilterOption("Đánh giá thấp dần") },
                                { icon: <HourglassBottom />, label: "Phim sắp chiếu", onClick: () => setFilterOption("Phim sắp chiếu") },
                                { icon: <Movie />, label: "Phim đang chiếu", onClick: () => setFilterOption("Phim đang chiếu") },
                                { icon: <LocalFireDepartment />, label: "Phim hot", onClick: () => setFilterOption("Phim hot") },
                                { icon: <FilterAltOff />, label: "O", onClick: () => setFilterOption("") },
                            ]}
                        />
                    </div>
                </div>
                <div>
                    <AddFilmModal />
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Mã phim</th>
                        <th className="px-6 py-3">Tên phim</th>
                        <th className="px-6 py-3">Đánh giá</th>
                        <th className="px-6 py-3">Ngày khởi chiếu </th>
                        <th className="px-6 py-3">Đang chiếu</th>
                        <th className="px-6 py-3">Sắp chiếu</th>
                        <th className="px-6 py-3">Hot</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {filterFilm.length > 0 ? (
                        filterFilm.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((film) => (
                            <tr key={film.maPhim} className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{film.maPhim}</td>
                                <td className="px-6 py-4">{film.tenPhim}</td>
                                <td className="px-6 py-4">{film.danhGia}</td>
                                <td className="px-6 py-4">
                                    {" "}
                                    {film.ngayKhoiChieu
                                        ? `${new Date(film.ngayKhoiChieu).toLocaleString("vi-VN", {
                                              day: "2-digit",
                                              month: "2-digit",
                                              year: "numeric",
                                          })} ~~ ${new Date(film.ngayKhoiChieu).toLocaleString("vi-VN", {
                                              hour: "2-digit",
                                              hour12: false,
                                              minute: "2-digit",
                                          })}`
                                        : "Không có dữ liệu"}
                                </td>

                                {/* dang chieu */}
                                <td className="px-6 py-4 text-center">{film.dangChieu && <CheckCircle sx={{ color: "blue" }} />}</td>

                                {/*  Sắp chiếu */}
                                <td className="px-6 py-4 text-center">{film.sapChieu && <CheckCircle sx={{ color: "orange" }} />}</td>

                                {/* Nút gạt trạng thái Hot */}
                                <td className="px-6 py-4">{film.hot && <CheckCircle sx={{ color: "red" }} />}</td>
                                {/* action button */}
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <button className="mr-2 text-blue-500 hover:underline">
                                        <i
                                            className="fa-solid fa-pen-to-square"
                                            onClick={() => {
                                                editModal.handleClickOpen();
                                                setEditItem(film);
                                            }}
                                        ></i>
                                    </button>
                                    <button
                                        className="mr-2 text-green-500 hover:underline"
                                        onClick={() => {
                                            detailModal.handleClickOpen();
                                            setDetailItem(film);
                                        }}
                                    >
                                        <i className="fa-solid fa-info"></i>
                                    </button>
                                    <button className="text-red-500 hover:underline" onClick={() => handleDeleteFilms(film.maPhim)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <button>
                                        <CalendarMonth sx={{ color: "black" }} onClick={() => handleCreateSchedual(film.maPhim, film)} />
                                    </button>
                                </td>
                                {/* end */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center">
                                Hiện không tìm thấy phim nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filterFilm.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số hàng / trang: "
                labelDisplayedRows={({ from, to, count }) => `Từ ${from} đến ${to} trong ${count !== -1 ? count : `- ${to}`}`}
            />
        </div>
    );
}
