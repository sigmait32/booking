import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartEmptyState = () => {
    const navigate = useNavigate();
    return (
        <Card className="empty-cart-card text-center">
            <Card.Body className="py-5">
                <div className="empty-cart-icon mb-4">
                    <FaShoppingBag size={64} />
                </div>
                <h3 className="mb-3">Your cart is empty</h3>
                <p className="text-muted mb-4">Looks like you haven't added any items yet</p>
                <Button variant="primary" size="lg" onClick={() => navigate("/dashboard/cart-products")}>
                    Browse Products
                </Button>
            </Card.Body>
        </Card>
    );
};

export default CartEmptyState;
