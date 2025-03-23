export const validateForm = (formData) => {
    let errors = {};

    // Loại bỏ khoảng trắng đầu/cuối
    const cleanedData = {
        tuNgay: formData.tuNgay?.trim() || "",
        denNgay: formData.denNgay?.trim() || "",
    };

    // Kiểm tra tài khoản
    if (!cleanedData.tuNgay) {
        errors.taiKhoan = "Vui lòng nhập ngày";
    } else if (cleanedData.tuNgay.fo) {
        errors.taiKhoan = "Tên tài khoản phải có ít nhất 5 ký tự!";
    }

    return errors;
};
