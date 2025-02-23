import { useCallback, useState } from "react";

export const useShowModal = (state = false) => {
    const [isOpen, setIsOpen] = useState(state);
    const handleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);
    return [isOpen, handleOpen];
};
