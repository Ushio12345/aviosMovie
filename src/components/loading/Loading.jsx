import React from "react";
import "./Loading.scss";
export default function Loading() {
    return (
        <div className="loading">
            <div className="loader">
                <div className="outer" />
                <div className="middle" />
                <div className="inner" />
            </div>
        </div>
    );
}
