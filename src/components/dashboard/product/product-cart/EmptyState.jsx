import React from "react";
import { Button } from "react-bootstrap";
import { FaBoxOpen } from "react-icons/fa";

const EmptyState = ({ searchTerm, onClearSearch }) => (
    <div className="empty-state text-center py-5">
        <div className="empty-state-icon">
            <FaBoxOpen size={48} />
        </div>
        <h3 className="empty-state-title">No Products Found</h3>
        <p className="empty-state-text">
            {searchTerm
                ? "We couldn't find any products matching your search."
                : "Our collection is currently empty. Please check back later."}
        </p>
        {searchTerm && (
            <Button variant="outline-primary" onClick={onClearSearch}>
                Clear Search
            </Button>
        )}
    </div>
);

export default EmptyState;
