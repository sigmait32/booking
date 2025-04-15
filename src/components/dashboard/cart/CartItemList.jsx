import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import CartItemRow from "./CartItemRow";

const CartItemList = ({ cart }) => {


    return (
        <Card className="cart-items-card">
            <Card.Header className="cart-items-header">
                <h5 className="mb-0">Your Items</h5>
            </Card.Header>
            <ListGroup variant="flush">
                {cart.map((item) => (
                    <CartItemRow key={item._id} item={item} />
                ))}
            </ListGroup>
        </Card>
    );
};

export default CartItemList;
