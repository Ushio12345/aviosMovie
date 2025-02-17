import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CustomIcons({ totalPages, handlePageClick, page }) {
    return (
        <Stack spacing={2} alignItems="center" marginY={2}>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageClick}
                renderItem={(item) => <PaginationItem {...item} slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} />}
            />
        </Stack>
    );
}
