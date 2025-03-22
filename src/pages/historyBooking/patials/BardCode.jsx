import React from "react";
import Barcode from "react-barcode";

const TicketBarcode = ({ maVe }) => {
    return (
        <div>
            <Barcode value={maVe.toString()} />
        </div>
    );
};

export default TicketBarcode;
