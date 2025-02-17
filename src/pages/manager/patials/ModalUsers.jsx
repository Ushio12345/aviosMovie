import { useState } from "react";
import ModalWrapper from "../../../components/modal/Modal";
import Button from "../../../components/button/Button";
import { Value } from "sass";
import { addNewUser } from "../services/UserService";

const ModalUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataForm, setDataForm] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        maLoaiNguoiDung: "KhachHang",
        hoTen: "",
    });

    const handleChange = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await addNewUser(dataForm);
            if (res.status === 200) {
                alert("Thêm người dùng thành công.");
                setIsModalOpen(false);
            }
        } catch (error) {
            console.log("Lỗi trong quá trình thêm người dùng", error);
        }
    };

    return (
        <div className="p-4">
            {/* Nút mở modal */}
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition" onClick={() => setIsModalOpen(true)}>
                Thêm người dùng
            </button>

            {/* Modal Dùng Chung */}
            <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thêm mới người dùng">
                <form className="space-y-4" onSubmit={onSubmit}>
                    <div className="flex gap-2">
                        <div>
                            <label className="block text-gray-700">Tài khoản</label>
                            <input
                                type="text"
                                name="taiKhoan"
                                value={dataForm.taiKhoan}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Họ và tên</label>
                            <input
                                type="text"
                                name="hoTen"
                                value={dataForm.hoTen}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            name="matKhau"
                            value={dataForm.matKhau}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={dataForm.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Số điện thoại</label>
                        <input type="text" name="soDt" value={dataForm.soDt} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mã loại người dùng</label>
                        <input
                            type="text"
                            name="maLoaiNguoiDung"
                            value={dataForm.maLoaiNguoiDung}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="KhachHang/QuanTri"
                            required
                        />
                    </div>
                    <Button type="submit" bgColor="var(--orange)" width="100%" height="40px" color="white">
                        Lưu
                    </Button>
                </form>
            </ModalWrapper>
        </div>
    );
};

export default ModalUser;
