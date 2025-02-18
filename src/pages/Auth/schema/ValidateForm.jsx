export const validateForm = (formData, confirmPassword) => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Loại bỏ khoảng trắng đầu cuối của từng trường
    const cleanedData = {
        taiKhoan: formData.taiKhoan?.trim() || "",
        hoTen: formData.hoTen?.trim() || "",
        matKhau: formData.matKhau?.trim() || "",
        email: formData.email?.trim() || "",
        soDt: formData.soDt?.trim() || "",
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
    }

    // Kiểm tra mật khẩu
    if (!cleanedData.matKhau) {
        errors.matKhau = "Mật khẩu không được để trống!";
    } else if (cleanedData.matKhau.length < 6) {
        errors.matKhau = "Mật khẩu phải có ít nhất 6 ký tự!";
    }

    // Kiểm tra xác nhận mật khẩu
    if (confirmPassword !== cleanedData.matKhau) {
        errors.confirmPassword = "Mật khẩu xác nhận không khớp!";
    }

    // Kiểm tra email
    if (!cleanedData.email) {
        errors.email = "Email không được để trống!";
    } else if (!emailRegex.test(cleanedData.email)) {
        errors.email = "Email không hợp lệ!";
    }

    // Kiểm tra số điện thoại
    if (!cleanedData.soDt) {
        errors.soDt = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(cleanedData.soDt)) {
        errors.soDt = "Số điện thoại phải có 10 chữ số!";
    }

    return errors;
};
