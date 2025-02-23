import React, { useState } from "react";

export default function usePagination({ items, itemsPerPage = 4 }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageClick = (e, newPage) => {
        setCurrentPage(newPage);
    };

    return { currentItems, currentPage, totalPages, handlePageClick };
}
