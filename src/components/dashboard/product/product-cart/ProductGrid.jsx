import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, cartItems, dispatch }) => (
    <Row className="g-4">
        {products.map((product) => {
            const cartItem = cartItems.find((item) => item._id === product._id);
            return (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={product} cartItem={cartItem} dispatch={dispatch} />
                </Col>
            );
        })}
    </Row>
);

export default ProductGrid;
