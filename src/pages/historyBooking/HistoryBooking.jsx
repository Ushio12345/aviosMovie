import React from "react";
import BookingItems from "./patials/BookingItems";
import "./HistoryBooking.scss";
import MultipleSelect from "../../components/select/Selected";
export default function HistoryBooking() {
    return (
        <div className="history-booking py-[100px] overflow-x-auto ">
            <BookingItems />
        </div>
    );
}
