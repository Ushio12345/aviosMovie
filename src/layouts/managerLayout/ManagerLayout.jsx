import React from "react";
import { Outlet } from "react-router-dom";
import ManagerPage from "../../pages/managerPage/ManagerPage";

const ManagerLayout = () => {
    return (
        <ManagerPage>
            <Outlet />
        </ManagerPage>
    );
};

export default ManagerLayout;
