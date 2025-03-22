export const validSchedual = (formData, maCum, maHeThong) => {
    let errors = {};

    if (!maHeThong) {
        errors.maHeThongRap = "Bạn chưa chọn hệ thống rạp.";
    }

    if (!maCum) {
        errors.maCumRap = "Bạn chưa chọn cụm rạp.";
    }

    if (!formData.ngayChieuGioChieu) {
        errors.ngayChieuGioChieu = "Bạn chưa chọn ngày.";
    }

    if (!formData.maRap) {
        errors.maRap = "Bạn chưa chọn rạp.";
    }

    if (!formData.giaVe) {
        errors.giaVe = "Bạn chưa nhập giá vé.";
    } else if (isNaN(formData.giaVe)) {
        errors.giaVe = "Giá vé phải là kiểu số.";
    } else if (formData.giaVe <= 0) {
        errors.giaVe = "Giá vé phải lớn hơn 0.";
    }

    return errors;
};
