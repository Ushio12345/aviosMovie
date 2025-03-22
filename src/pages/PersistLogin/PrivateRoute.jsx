import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { showConfirmAlert } from "../../components/Aleart/Aleart";

export const PrivateRoute = ({ role }) => {
    const userAuth = useSelector((state) => state.counter.userAuth);
    const isLogin = !!localStorage.getItem("accessToken");
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        if (!isLogin || !userAuth) {
            showConfirmAlert("Lỗi", "Vui lòng đăng nhập để truy cập trang!", "Đã rõ", "center");
            setTimeout(() => setRedirectTo("/login"), 1500); // Chuyển hướng sau 1.5 giây
        } else if (role && userAuth.role[0] !== role) {
            showConfirmAlert("Lỗi", "Bạn không có quyền truy cập!", "Đã rõ", "center");
            setTimeout(() => setRedirectTo("/"), 1500);
        }
    }, [isLogin, userAuth, role]);

    if (redirectTo) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};
