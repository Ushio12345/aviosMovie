import React, { useCallback, useState } from "react";

export default function useToogle({ state = false } = {}) {
    const [isOpen, setIsOpen] = useState(state);

    const toogle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return [isOpen, toogle];
}
