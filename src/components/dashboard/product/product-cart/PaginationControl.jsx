import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationControl = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        if (totalPages <= 5) return i + 1;
        if (page <= 3) return i + 1;
        if (page >= totalPages - 2) return totalPages - 4 + i;
        return page - 2 + i;
    });

    return (
        <div className="pagination-container">
            <Pagination>
                <Pagination.Prev onClick={() => onPageChange(page - 1)} disabled={page === 1} />
                {pageNumbers.map((num) => (
                    <Pagination.Item key={num} active={num === page} onClick={() => onPageChange(num)}>
                        {num}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => onPageChange(page + 1)} disabled={page === totalPages} />
            </Pagination>
        </div>
    );
};

export default PaginationControl;
