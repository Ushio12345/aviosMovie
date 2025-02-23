import { useCallback, useState } from "react";

const useModalWithTrailer = () => {
    const [open, setOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOpen = useCallback((trailer) => {
        if (trailer) {
            setLoading(true);
            setSelectedFilm(trailer);
        }
        setOpen((prev) => !prev);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedFilm(null);
        setLoading(false);
        setOpen(false);
    }, []);
    const getEmbedUrl = (url) => {
        if (!url) return null;
        try {
            let videoId = new URL(url).searchParams.get("v");
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        } catch (error) {
            console.error("Lỗi xử lý URL trailer:", error);
            return null;
        }
    };

    return { open, setOpen, selectedFilm, loading, setLoading, handleOpen, handleClose, getEmbedUrl };
};

export default useModalWithTrailer;
