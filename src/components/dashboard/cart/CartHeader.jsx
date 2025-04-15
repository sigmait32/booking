import React from "react";
import { Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";

const CartHeader = ({ itemCount }) => {
    const navigate = useNavigate();
    return (
        <div className="cart-header mb-5">
            <Button variant="outline-secondary" onClick={() => navigate(-1)} className="back-btn">
                <FaArrowLeft className="me-2" /> Continue Shopping
            </Button>
            <h2 className="cart-title">
                <FaShoppingBag className="me-3" />
                Your Shopping Cart
                <Badge bg="secondary" className="ms-3 cart-count">
                    {itemCount} {itemCount === 1 ? "Item" : "Items"}
                </Badge>
            </h2>
        </div>
    );
};

export default CartHeader;
