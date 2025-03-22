export const validateForm = (formData, confirmPassword) => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Loại bỏ khoảng trắng đầu/cuối
    const cleanedData = {
        taiKhoan: formData.taiKhoan?.trim() || "",
        hoTen: formData.hoTen?.trim() || "",
        matKhau: formData.matKhau?.trim() || "",
        email: formData.email?.trim() || "",
        soDT: formData.soDT?.trim() || "",
    };

    // Kiểm tra tài khoản
    if (!cleanedData.taiKhoan) {
        errors.taiKhoan = "Tên tài khoản không được để trống!";
    } else if (cleanedData.taiKhoan.length < 5) {
        errors.taiKhoan = "Tên tài khoản phải có ít nhất 5 ký tự!";
    }

    // Kiểm tra họ tên
    if (!cleanedData.hoTen) {
        errors.hoTen = "Họ và tên không được để trống!";
    } else if (cleanedData.hoTen.length < 8 || cleanedData.hoTen.length > 150) {
        errors.hoTen = "Họ và tên phải nằm trong khoảng (8-150) kí tự ";
    }

    if (!cleanedData.matKhau) {
        errors.matKhau = "Mật khẩu không được để trống!";
    } else if (cleanedData.matKhau.length < 8 || cleanedData.matKhau.length > 50) {
        errors.confirmPassword = "Mật khẩu phải nằm trong khoảng (8-50) kí tự! ";
    }

    // // Kiểm tra xác nhận mật khẩu
    if (!confirmPassword) {
        errors.confirmPassword = "Vui lòng nhập lại mật khẩu!";
    } else if (confirmPassword !== cleanedData.matKhau) {
        errors.confirmPassword = "Mật khẩu xác nhận không khớp!";
    }

    // Kiểm tra email
    if (!cleanedData.email) {
        errors.email = "Email không được để trống!";
    } else if (!emailRegex.test(cleanedData.email)) {
        errors.email = "Email không hợp lệ!";
    }

    // Kiểm tra số điện thoại
    if (!cleanedData.soDT) {
        errors.soDT = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(cleanedData.soDT)) {
        errors.soDT = "Số điện thoại phải có 10 chữ số!";
    }

    return errors;
};
