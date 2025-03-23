import React, { useEffect, useState } from "react";
import { deleteUser, getAllUser } from "../services/UserServices";
import { showAlert, showConfirmAlert } from "../../../components/Aleart/Aleart";
import { Add, ArrowDownward, ArrowUpward, Edit, FilterAltOff, ManageAccounts, People, PersonRemove, PlusOne } from "@mui/icons-material";
import { TablePagination } from "@mui/material";
import useInput from "../../../hooks/useInput";

import Button from "../../../components/button/Button";
import CustomizedMenus from "../../../components/smallMenuDropdownFilter";
import AddModalUser from "./modal/AddModalUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUs, getData } from "../../../action/actions";
import EditModalUser from "./modal/EditModalUser";
import DetailUserModal from "./modal/DetailUser";
import { useShowModal } from "../../../hooks/useShowDialog";

export default function UserManage() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filterUsers, setFilterUsers] = useState([]);
    const [selectedEditUser, setSelectedEditUser] = useState({});
    const [userId, setUserId] = useState("");

    // modal
    const editModal = useShowModal();
    const detailModal = useShowModal();
    // ------------
    // redux
    const usersRedux = useSelector((state) => state.counter.users);
    // console.log("redux", usersRedux);
    const dispatch = useDispatch();
    // -----------
    const searchValue = useInput();
    //sort
    const [sortStatus, setSortStatus] = useState({});
    // filter type
    const [filterType, setFilterType] = useState("");
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const userData = await getAllUser();
                setUser(userData.data.content);

                dispatch(getData(userData.data.content));

                // if (filterType) {
                //     setFilterUsers(filterType);
                // }
            } catch (error) {
                console.error("Có lỗi trong quá trình lấy dữ liệu người dùng", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);
    useEffect(() => {
        setFilterUsers(usersRedux);
    }, [usersRedux]);

    // render User
    const renderUser = () => {
        if (filterUsers.length === 0) {
            return (
                <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                        Hiện không có người dùng nào.
                    </td>
                </tr>
            );
        }

        return [...filterUsers]
            .reverse()
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((u) => (
                <tr key={u.taiKhoan} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{u.taiKhoan}</td>
                    <td className="px-6 py-4">{u.hoTen}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.soDT || "Chưa cập nhật"}</td>
                    <td className="px-6 py-4">{u.maLoaiNguoiDung || "Chưa cập nhật"}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                        <div className="">
                            <button
                                className="text-yellow-700 text-md"
                                onClick={() => {
                                    editModal.handleClickOpen();
                                    handleSelectedUser(u.taiKhoan);
                                }}
                            >
                                <i className="fa-solid fa-user-pen"></i>
                            </button>
                        </div>

                        <div className="">
                            <button
                                className="text-blue-400 text-md"
                                onClick={() => {
                                    detailModal.handleClickOpen("paper");
                                    handleGetDetail(u.taiKhoan);
                                }}
                            >
                                <i className="fa-solid fa-info"></i>
                            </button>
                        </div>

                        {/* delete btn */}
                        <div className="" onClick={() => handleDelete(u.taiKhoan)}>
                            <button>
                                <PersonRemove color="warning" onClick={() => handleDelete(u.taiKhoan)} />
                            </button>
                        </div>
                    </td>
                </tr>
            ));
    };

    // filter and search

    // sort
    const handleSort = (col) => {
        const currStatus = sortStatus[col] || "";
        const sortFunc = ["", "asc", "des"];
        const curIndexSort = sortFunc.indexOf(currStatus);
        const nextSort = sortFunc[(curIndexSort + 1) % sortFunc.length];
        setSortStatus({ [col]: nextSort });
        // console.log(nextSort);
        if (nextSort === "") {
            setFilterUsers(filterUsers);
        } else {
            const sortUsers = [...filterUsers].sort((a, b) => {
                if (nextSort === "asc") return a[col].localeCompare(b[col]);
                if (nextSort === "des") return b[col].localeCompare(a[col]);
                return 0;
            });
            setFilterUsers(sortUsers);
        }
    };

    const filterCombine = (searchText = "", maLoaiNguoiDungFilter = "") => {
        let filterU = usersRedux;
        // console.log("type", filterType);

        if (searchText) {
            filterU = filterU.filter(
                (us) =>
                    us.taiKhoan.toLowerCase().includes(searchText.toLowerCase()) ||
                    us.hoTen.toLowerCase().includes(searchText.toLowerCase()) ||
                    us.email.toLowerCase().includes(searchText.toLowerCase()) ||
                    us.soDT === searchText
            );
        }
        if (maLoaiNguoiDungFilter) {
            filterU = filterU.filter((us) => us.maLoaiNguoiDung === maLoaiNguoiDungFilter);
        } else {
            filterU = filterU;
        }
        setFilterUsers(filterU);
    };
    const handleSearch = () => {
        const getSearch = searchValue.getValue().trim();
        setFilterType("");
        filterCombine(getSearch, filterType);
    };

    const handleFilterByType = (maLoaiNguoiDung = "") => {
        setFilterType(maLoaiNguoiDung);
        filterCombine(searchValue.getValue(), maLoaiNguoiDung);
    };
    // handle selected edit user
    const handleSelectedUser = (userSelected) => {
        const selectedUser = usersRedux.find((us) => us.taiKhoan === userSelected);
        console.log(selectedUser);
        setSelectedEditUser(selectedUser);
    };
    // deleteUser
    const handleDelete = (u) => {
        showConfirmAlert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa người dùng này không ?", "Xóa", "center").then((result) => {
            if (result.isConfirmed) {
                const res = deleteUser(u);
                console.log("res", res);

                dispatch(deleteUs(u));
            }
        });
    };
    // handle get id detail user
    const handleGetDetail = (id) => {
        setUserId(id);
    };

    return (
        <div>
            <EditModalUser open={editModal.open} handleClose={editModal.handleClose} editUser={selectedEditUser} />
            <DetailUserModal open={detailModal.open} handleClose={detailModal.handleClose} userId={userId} />
            <div className="my-3">
                {/* search */}
                <div className="w-full ">
                    <div className="flex-space w-full">
                        <div className="relative flex items-center max-w-sm min-w-[200px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Nhập tên, email, số điện thoại"
                                ref={searchValue.refValue}
                            />
                            <button
                                className="rounded-md mr-2 bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                onClick={handleSearch}
                            >
                                Tìm
                            </button>
                            <Button
                                outline="1px solid black"
                                width="200px"
                                height="40px"
                                hoverBgColor="black"
                                hoverColor="white"
                                onClick={() => {
                                    setFilterUsers(usersRedux);
                                    setSortStatus("");
                                }}
                            >
                                Loại bỏ lọc
                            </Button>
                        </div>
                        <div className="">
                            <AddModalUser />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-w-[1200px] overflow-hidden">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 flex items-center" onClick={() => handleSort("taiKhoan")}>
                                Tài khoản{" "}
                                {sortStatus["taiKhoan"] === "asc" ? (
                                    <ArrowUpward />
                                ) : sortStatus["taiKhoan"] === "des" ? (
                                    <ArrowDownward />
                                ) : (
                                    <FilterAltOff />
                                )}
                            </th>
                            <th scope="col" className="px-6 py-3" onClick={() => handleSort("hoTen")}>
                                Họ và tên
                                {sortStatus["hoTen"] === "asc" ? (
                                    <ArrowUpward />
                                ) : sortStatus["hoTen"] === "des" ? (
                                    <ArrowDownward />
                                ) : (
                                    <FilterAltOff />
                                )}
                            </th>
                            <th scope="col" className="px-6 py-3" onClick={() => handleSort("email")}>
                                Email
                                {sortStatus["email"] === "asc" ? (
                                    <ArrowUpward />
                                ) : sortStatus["email"] === "des" ? (
                                    <ArrowDownward />
                                ) : (
                                    <FilterAltOff />
                                )}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số điện thoại
                            </th>
                            <th scope="col" className="px-6 py-3 flex items-center">
                                Loại người dùng{" "}
                                <CustomizedMenus
                                    btnText={""}
                                    menuItems={[
                                        { icon: <ManageAccounts />, label: "Quản Trị", onClick: () => handleFilterByType("QuanTri") },
                                        { icon: <People />, label: "Khách Hàng", onClick: () => handleFilterByType("KhachHang") },
                                        { icon: <FilterAltOff />, label: "O", onClick: () => handleFilterByType("") },
                                    ]}
                                />
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : (
                            renderUser()
                        )}
                    </tbody>
                </table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={usersRedux.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Số hàng / trang: "
                    labelDisplayedRows={({ from, to, count }) => `Từ ${from} đến ${to} trong ${count !== -1 ? count : `- ${to}`}`}
                />
            </div>
        </div>
    );
}
