import { showConfirmAlert } from "./Aleart";

export const handleTokenError = () => {
    showConfirmAlert("Phiên đăng nhập đã hết hạn.", "Vui lòng đăng nhập lại để tiếp tục.", "Đăng nhập lại.", "top").then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
    });
};
