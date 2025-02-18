import React from "react";
import Header from "./patials/Header";
import HomePage from "../../pages/HomePage/HomePage";
import Footer from "./patials/Footer";
import "./HomeLayout.scss";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
function HomeLayout({ authRedux }) {
    console.log("home page check auth", authRedux);

    return (
        <div className="homeLayout">
            <Header />
            <Outlet />
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
