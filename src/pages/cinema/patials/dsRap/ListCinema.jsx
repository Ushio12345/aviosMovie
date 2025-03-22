import React, { useEffect, useState } from "react";
import { getAllCinema } from "../../services/CinemaServices";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setSelectedCinemaSystem } from "../../../../action/actions";

export default function ListCinema() {
    console.log("check re-render list cinema");
    const [listCinema, setListCinema] = useState([]);
    const selectedCinema = useSelector((state) => state.counter.selectedCinema, shallowEqual);
    // const [selectedHt, setSelectedHt] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchHeThongRap = async () => {
            const cineme = await getAllCinema();
            if (!cineme && !cineme?.data.content) return;
            setListCinema(cineme.data.content);
            // console.log("ht", cineme.data.content[0].maHeThongRap);
            if ((!selectedCinema && selectedCinema.maHeThongRap === null) || selectedHt === null) {
                dispatch(setSelectedCinemaSystem(cineme.data.content[0].maHeThongRap));
                // setSelectedHt(cineme.data.content[0].maHeThongRap);
            }
        };
        fetchHeThongRap();
    }, [selectedCinema.maHeThongRap]);
    const handleSelectedSystem = (maHeThongRap) => {
        dispatch(setSelectedCinemaSystem(maHeThongRap));
        // setSelectedHt(maHeThongRap);
    };
    return (
        <div className="list-cinema">
            {listCinema.length > 0 && (
                <div className="">
                    {listCinema.map((ht) => (
                        <div key={ht.maHeThongRap} className="border border-b-2">
                            <div
                                className={`img-logo p-3 ${selectedCinema.maHeThongRap === ht.maHeThongRap ? "border-r-2 border-green-500" : ""}`}
                                onClick={() => handleSelectedSystem(ht.maHeThongRap)}
                            >
                                <img src={ht.logo} alt="Logo" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
