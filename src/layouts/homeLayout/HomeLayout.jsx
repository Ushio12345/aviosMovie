import React, { useEffect, useState } from "react";
import Header from "./patials/Header";
import HomePage from "../../pages/HomePage/HomePage";
import Footer from "./patials/Footer";
import "./HomeLayout.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { clearUserAuth } from "../../action/actions";

function HomeLayout({ authRedux }) {
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    const userAuth = useSelector((state) => state.counter.userAuth);

    const nagivator = useNavigate();
    useEffect(() => {
        // console.log("userAuth trong HomeLayout:", userAuth);
        if (userAuth) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [userAuth]);

    // logout
    const handleLogout = () => {
        dispatch(clearUserAuth());
        setIsLogin(false);
        nagivator("/login");
    };

    // change color header
    const location = useLocation();
    const header2 = location.pathname.startsWith("/detail-film");

    return (
        <div className="homeLayout ">
            <Header userAuth={userAuth} isLogin={isLogin} logout={handleLogout} isHeader2={header2} />

            <div className="content">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        authRedux: state.counter.userAuth,
    };
};

export default connect(mapStateToProps)(HomeLayout);
