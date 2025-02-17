import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import MainRoutes from "./route/MainRoutes";

function App() {
    return (
        <>
            <MainRoutes />
        </>
    );
}

export default App;
