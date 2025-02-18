import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import MainRoutes from "./route/MainRoutes";
import { getData } from "./action/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
    return (
        <>
            <MainRoutes />
        </>
    );
}

export default App;
