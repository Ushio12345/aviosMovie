import React from "react";
import Button from "./Button";

export default function OpenModalBtn({ handleClickOpen, title }) {
    return (
        <div>
            <Button
                outline="1px solid blue"
                color="blue"
                borderRadius="5px"
                height="40px"
                width="70px"
                hoverBgColor="blue"
                hoverColor="white"
                onClick={handleClickOpen}
            >
                {title}
            </Button>
        </div>
    );
}
