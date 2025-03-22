export const validateForm = (formData) => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Loại bỏ khoảng trắng đầu/cuối
    const cleanedData = {
        taiKhoan: formData.taiKhoan?.trim() || "",
        hoTen: formData.hoTen?.trim() || "",
        matKhau: formData.matKhau?.trim() || "", // Mật khẩu cũ
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

    // // Kiểm tra mật khẩu cũ
    // if (!cleanedData.matKhau) {
    //     errors.matKhau = "Mật khẩu không được để trống!";
    // } else if (cleanedData.matKhau.length < 6) {
    //     errors.matKhau = "Mật khẩu phải có ít nhất 6 ký tự!";
    // }

    // // Kiểm tra mật khẩu mới
    // if (!newPwd) {
    //     errors.newPwd = "Mật khẩu mới không được để trống!";
    // } else if (newPwd.length < 6) {
    //     errors.newPwd = "Mật khẩu mới phải có ít nhất 6 ký tự!";
    // } else if (newPwd === cleanedData.matKhau) {
    //     errors.newPwd = "Mật khẩu mới không được trùng với mật khẩu cũ!";
    // }

    // // Kiểm tra xác nhận mật khẩu
    // if (!confirmPassword) {
    //     errors.confirmPassword = "Vui lòng nhập lại mật khẩu!";
    // } else if (confirmPassword !== newPwd) {
    //     errors.confirmPassword = "Mật khẩu xác nhận không khớp!";
    // }

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
