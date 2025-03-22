class FilmData {
    constructor(maPhim, tenPhim, biDanh, dangChieu, danhGia, hinhAnh, hot, maNhom, moTa, ngayKhoiChieu, sapChieu, trailer) {
        this.maPhim = maPhim || "";
        this.tenPhim = tenPhim || "";
        this.biDanh = biDanh || "";
        this.dangChieu = dangChieu || false;
        this.danhGia = danhGia || "";
        this.hinhAnh = hinhAnh || "";
        this.hot = hot || false;
        this.maNhom = maNhom || "GP01";
        this.moTa = moTa || "";
        this.ngayKhoiChieu = ngayKhoiChieu || "";
        this.sapChieu = sapChieu || false;
        this.trailer = trailer || "";
    }

    updateField(fieldName, value) {
        if (this.hasOwnProperty(fieldName)) {
            this[fieldName] = value;
        }
    }
}
