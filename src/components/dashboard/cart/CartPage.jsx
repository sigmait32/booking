import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import CartHeader from "./CartHeader";
import CartItemList from "./CartItemList";
import CartEmptyState from "./CartEmptyState";
import OrderSummary from "./OrderSummary";

const CartPage = () => {
    const cart = useSelector((state) => state.cart.items);

    console.log("cart is ===========>", cart)

    const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
    const shippingFee = subtotal > 1000 ? 0 : 50;
    const totalPrice = subtotal + shippingFee;

    return (
        <Container className="cart-page py-4 py-md-5">
            <ToastContainer position="top-right" autoClose={3000} />
            <CartHeader itemCount={cart.length} />
            {cart.length === 0 ? (
                <CartEmptyState />
            ) : (
                <Row>
                    <Col lg={8}><CartItemList cart={cart} /></Col>
                    <Col lg={4}><OrderSummary {...{ subtotal, shippingFee, totalPrice, itemCount: cart.length }} /></Col>
                </Row>
            )}
        </Container>
    );
};

export default CartPage;
