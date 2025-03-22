import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailFilm } from "./services/DetailFilmService";
import "./Detail.scss";
import { format } from "date-fns";
import { HotTubSharp, HourglassBottom, MovieCreation } from "@mui/icons-material";

import Button from "../../components/button/Button";
import Loading from "../../components/loading/Loading";
import useModalWithTrailer from "../../hooks/useModalWithTrailer";
import CustomDialog from "../../components/popUp/ShowModal";
import DetailFilmItem from "./patials/DetailFilm";
import SchedualFilm from "./patials/SchedualFilm";

export default function DetailFilm() {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState({});
    const { maPhim } = useParams();
    const [isDetail, setIsDetail] = useState({});
    const [heThongRapChieu, setHeThongRapChieu] = useState([]);
    useEffect(() => {
        fetchDetailFlim();
        window.scrollTo(0, 0);
    }, [maPhim]);
    const fetchDetailFlim = async () => {
        setLoading(true);
        try {
            const data = await getDetailFilm(maPhim);
            setDetail(data);
            setHeThongRapChieu(data.heThongRapChieu);
        } catch (error) {
            console.log("Có lỗi trong quá trình lấy data thông tin chi tiết của phim", error);
        } finally {
            setLoading(false);
        }
    };

    const toogleDetailMota = (id) => {
        setIsDetail((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const { open, selectedFilm, handleOpen, handleClose } = useModalWithTrailer();

    return (
        <div className="detail mt-[100px]">
            {loading ? (
                <Loading />
            ) : detail ? (
                <DetailFilmItem loading={loading} detail={detail} isDetail={isDetail} handleOpen={handleOpen} />
            ) : (
                <p>Hiện phim này không có dữ liệu hoặc bị lỗi vui lòng thử lại sau!</p>
            )}

            <div className="layout">
                {" "}
                <SchedualFilm maPhim={maPhim} heThongRapChieu={heThongRapChieu} />
            </div>

            {/* modal traler */}
            <CustomDialog open={open} handleOpen={handleClose} showFooter={false}>
                {selectedFilm ? (
                    <iframe
                        width="100%"
                        height="600px"
                        src={selectedFilm.replace("watch?v=", "embed/")}
                        title="Trailer"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>Không tìm thấy trailer</p>
                )}
            </CustomDialog>
        </div>
    );
}
