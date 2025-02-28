import React, { useEffect, useState } from "react";
import Banner from "./patials/Banner";
import "./HomePage.scss";
import IntroItems from "./patials/IntroItems";
import DailyFilm from "./patials/DailyFilm";
import getFilm from "./services/FilmServices";
import Loading from "../../components/loading/Loading";
import FeaturedMovies from "./patials/FeaturedMovies";
import bgFilm from "../../assets/images/big-bg-film.png";
import seatImg from "../../assets/images/seat-bg.png";
import { useDispatch, useSelector } from "react-redux";
import { setFlimRedux } from "../../action/actions";

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    // const [listFilm, setListFilm] = useState([]);
    const listFilm = useSelector((state) => state.counter.listFilm);
    // console.log("data", listFilm);

    const dispatch = useDispatch();
    useEffect(() => {
        getAllFilm();
    }, [dispatch]);
    const getAllFilm = async () => {
        setLoading(true);
        try {
            const res = await getFilm();
            // console.log("data film", res);
            // setListFilm(res.data.content);
            dispatch(setFlimRedux(res.data.content));
        } catch (error) {
            console.log("Không lấy đươc api film", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="">
            <Banner />
            <section className="section-1" style={{ backgroundImage: `url(${bgFilm})` }}>
                <div className="overlay1"></div>
                <IntroItems />
                {loading ? <Loading /> : <DailyFilm listFilm={listFilm} />}
            </section>
            <section className="section-1" style={{ backgroundImage: `url(${seatImg})` }}>
                <div className="overlay1"></div>
                {loading ? <Loading /> : <FeaturedMovies listFilm={listFilm} />}
            </section>
        </div>
    );
}
