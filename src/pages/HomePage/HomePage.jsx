import React from "react";
import Banner from "./patials/Banner";
import "./HomePage.scss";
import IntroItems from "./patials/IntroItems";
import DailyFilm from "./patials/DailyFilm";
export default function HomePage() {
    return (
        <div className="">
            <Banner />
            <section className="section-1">
                <div className="overlay1"></div>
                <IntroItems />
                <DailyFilm />
            </section>
        </div>
    );
}
