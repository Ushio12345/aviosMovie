import axios from "axios";
import Swal from "sweetalert2";
import { showAlert, showConfirmAlert } from "../components/Aleart/Aleart";
import { handleTokenError } from "../components/Aleart/TokenErrorAlert";
import { connect } from "react-redux";
import { clearUserAuth } from "../action/actions";
import { store } from "../redux/store";

const axiosIntance = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json; charset=utf-8;",
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Credentials": true,
        TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA",
    },
});

// Add a request interceptor
axiosIntance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem("accessToken");
        const expireTime = localStorage.getItem("expireTime");

        if (accessToken && expireTime) {
            if (Date.now() > parseInt(expireTime, 10)) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("expireTime");

                showConfirmAlert("Phiên đăng nhập đã hết hạn.", "Vui lòng đăng nhập lại để tiếp tục.", "Đăng nhập lại.", "top");
                setTimeout(() => {
                    window.location.href = "/login";
                    store.dispatch(clearUserAuth());
                }, 4000);

                return Promise.reject("Phiên đăng nhập đã hết hạn");
            }

            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosIntance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
                showConfirmAlert("Phiên đăng nhập đã hết hạn.", "Vui lòng đăng nhập lại để tiếp tục.", "Đăng nhập lại.", "center").then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => {
                            localStorage.removeItem("accessToken");
                            store.dispatch(clearUserAuth());
                            window.location.href = "/login";
                        }, 4000);
                    }
                });
            } else if (error.response.data.message === "Không có token.") {
                showConfirmAlert("Thông báo", "Bạn hãy đăng nhập để tiếp tục !", "Đăng nhập", "center").then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => {
                            localStorage.removeItem("accessToken");
                            store.dispatch(clearUserAuth());
                            window.location.href = "/login";
                        }, 4000);
                    }
                });
            }
        }
        return Promise.reject(error);
    }
);

const mapStateToProps = (state) => {
    return {
        count: state.counter.userAuth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearAuthRedux: () => dispatch(clearUserAuth()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(axiosIntance);
