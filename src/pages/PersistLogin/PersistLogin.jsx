import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";

const PersistLogin = () => {
    const [loading, setLoading] = useState(true);
    const userAuth = useSelector((state) => state.counter.userAuth);

    useEffect(() => {
        if (userAuth) {
            setLoading(false);
        }
    }, [userAuth]);

    useEffect(() => {
        console.log("User trong Redux:", userAuth);
    }, [userAuth]);

    // if (loading) {
    //     return <Loading />;
    // }

    return <Outlet />;
};

export default PersistLogin;
