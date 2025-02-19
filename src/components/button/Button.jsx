import React, { useState } from "react";

export default function Button({
    children,
    color = "var(--black)",
    bgColor = "var(--red)",
    hoverColor = "var(--red)",
    hoverBgColor = "var(--white)",
    outline = "2px solid var(--red)",
    hoverOutline = "2px solid var(--red)",
    borderRadius = "5px",
    width = "auto",
    height = "auto",
    onClick,
}) {
    const [isHover, setIsHover] = useState(false);

    return (
        <button
            onClick={onClick}
            style={{
                color: isHover ? hoverColor : color,
                backgroundColor: isHover ? hoverBgColor : bgColor,
                border: isHover ? hoverOutline : outline,
                borderRadius: borderRadius,
                width: width,
                height: height,
                padding: "0px 10px",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {children}
        </button>
    );
}
