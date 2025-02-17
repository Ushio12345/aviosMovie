import React, { useEffect, useState } from "react";

import Loading from "../../../components/loading/Loading";
import ReactPaginate from "react-paginate";
import { fetchAllUsers, fetchUsersPage } from "../services/UserService";
import CustomIcons from "../../../components/pagination/Pagiantion";
import { connect } from "react-redux";
import { addNew, getData } from "../../../action/actions";
import Button from "../../../components/button/Button";

import { Collapse, Modal } from "flowbite";
import ModalUser from "./ModalUsers";

function TableUsers({ listUsersRedux, getAllUserRedux }) {
    // const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    // const [open, setOpen] = useState(false);
    useEffect(() => {
        getUsers();
        getUsersPerPage(0);
    }, []);

    // modal
    const showModal = () => {
        const modal = new Modal(document.getElementById("crud-modal"));
        modal.show();
    };

    const getUsers = async () => {
        setIsLoading(true);
        try {
            let res = await fetchAllUsers();
            if (res && res.data && res.data.content) {
                // console.log(res.data);
                // setUsers(res.data.content);
                getAllUserRedux(res.data.content);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        }
        setIsLoading(false);
    };
    const getUsersPerPage = async (page) => {
        setIsLoading(true);
        try {
            let res = await fetchUsersPage(page);
            if (res && res.data && res.data.content) {
                // console.log("pages", res.data.content);
                // setUsers(res.data.content.items || []);
                getAllUserRedux(res.data.content.items || []);
                setTotalUsers(res.data.content.totalCount || 0);
                setTotalPages(res.data.content.totalPages || 0);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // paginayion
    const handlePageClick = (event, value) => {
        console.log("Trang được chọn:", value);
        getUsersPerPage(value);
        setPage(value);
    };

    // render table user
    const renderTableUser = () => {
        return (
            <>
                {listUsersRedux.map((user, index) => (
                    <tr className="bg-white dark:bg-gray-800" key={index}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.hoTen}
                        </th>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.soDt}</td>
                        <td className="px-6 py-4">{user.taiKhoan}</td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Edit
                            </a>
                        </td>
                    </tr>
                ))}
            </>
        );
    };

    return (
        <div className="">
            <div className="my-5">
                <ModalUser />
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Họ và Tên
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tài khoản
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsersRedux.length > 0 ? (
                                renderTableUser()
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        Không có dữ liệu người dùng.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <CustomIcons totalPages={totalPages} page={page} handlePageClick={handlePageClick} />
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log("Redux State:", state);
    return {
        listUsersRedux: state.counter?.users,
    };
};

const mapDispatchToProps = (dispatchEvent) => {
    return {
        getAllUserRedux: (data) => dispatchEvent(getData(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableUsers);
