import React, { useEffect, useState, useMemo } from "react";
import { getDanhSachPhongVe } from "./services/OrderService";
import { useParams } from "react-router-dom";
import InforForm from "./patials/InforForm";
import ListSeat from "./patials/ListSeat";
import "./OrderPage.scss";
import Loading from "../../components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setListSeat } from "../../action/actions";

export default function OrderTicket() {
    const { maLichChieu } = useParams();
    const [data, setData] = useState({ inforFilms: {}, listSeat: [] });
    const [loading, setLoading] = useState(true);
    const [selectedSeat, setSelectedSeat] = useState([]);
    // console.log("data", data);
    const dispatch = useDispatch();
    // const listSeat = useSelector((state) => state.counter.listSeat);
    // console.log("chec", listSeat);

    useEffect(() => {
        const fetchDanhSachPhongVe = async () => {
            try {
                setLoading(true);
                const ds = await getDanhSachPhongVe(maLichChieu);
                if (!ds) return;
                setData({
                    inforFilms: ds.data.content.thongTinPhim,
                    listSeat: ds.data.content.danhSachGhe,
                });
                dispatch(setListSeat(ds.data.content.danhSachGhe));
            } catch (error) {
                console.log("Có lỗi trong quá trình lấy dự liệu danh sách phòng vé", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDanhSachPhongVe();
    }, [maLichChieu]);

    const inforFilmsMemo = useMemo(() => data.inforFilms, [data.inforFilms]);

    const listSeatMemo = useMemo(() => data.listSeat, [data.listSeat]);

    const handleSelectedSeat = (seat) => {
        setSelectedSeat((prev) => {
            const isSelected = prev.some((pSeat) => pSeat.maGhe === seat.maGhe);
            console.log(selectedSeat);
            return isSelected ? prev.filter((pSeat) => pSeat.maGhe !== seat.maGhe) : [...prev, seat];
        });
    };
    return (
        <div className="   order ">
            {/* <div className="overlay"></div> */}
            {loading ? (
                <Loading />
            ) : (
                <div className="w-[95%] m-auto py-[100px] ">
                    <div className="order-infor    ">
                        <div className="grid lg:grid-cols-3  grid-cols-1 gap-10">
                            <div className="lg:col-span-2 col-span-1 gap-4">
                                <ListSeat listSeat={listSeatMemo} className="" onSelectedSeat={handleSelectedSeat} selectedSeat={selectedSeat} />
                            </div>

                            <div>
                                <InforForm className="" inforFilms={inforFilmsMemo} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
