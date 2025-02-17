import React, { useState } from "react";

export default function IconCycle({
    children,
    color = "var(--white)",
    bgColor = "#5c5c5c",
    hoverBgColor = "var(--orange)",
    hoverColor = "var(--white)",
    width = "35px",
    height = "35px",
    borderRadius = "50%",
    iconSize = "20px",
    className = "",
    border = "",
    onClick,
    ...props
}) {
    const [isHover, setIsHover] = useState(false);

    return (
        <div
            className={className}
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: isHover ? hoverBgColor : bgColor,
                color: isHover ? hoverColor : color,
                border,
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
        >
            {React.isValidElement(children) ? React.cloneElement(children, { width: iconSize, height: iconSize }) : children}
        </div>
    );
}
