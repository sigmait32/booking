

import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge, InputGroup, FormControl } from "react-bootstrap";
import { useGetProductQuery } from "../../../store/features/product/productApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../../../store/features/cart/cartSlice";
import { Link } from "react-router-dom";
import BASE_URL from "../../../utils/imageConfig";
import "./ProductCart.css";

const ProductList = () => {
    const { data: products, isLoading } = useGetProductQuery();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);

    const [loadingProductId, setLoadingProductId] = useState(null); // ✅ Track which product is loading

    // Function to check if a product is in the cart
    const getCartItem = (productId) => cart.find((item) => item._id === productId);

    // Function to handle adding item to cart
    const handleAddToCart = (product) => {
        setLoadingProductId(product._id); // Start loader
        setTimeout(() => {
            dispatch(addToCart(product));
            setLoadingProductId(null); // Stop loader
        }, 500); // Simulate API delay
    };

    return (
        <Container className="py-4">
            <Row className="mb-3 align-items-center">
                <Col>
                    <h2 className="fw-bold">Explore Our Products</h2>
                </Col>
                <Col className="text-end">
                    <Link to="/dashboard/cart">
                        <Button variant="dark">
                            Cart <i className="fa fa-shopping-cart ms-1"></i>
                            {cart.length > 0 && <Badge bg="danger">{cart.length}</Badge>}
                        </Button>
                    </Link>
                </Col>
            </Row>

            {isLoading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Row>
                    {products?.map((product) => {
                        const cartItem = getCartItem(product._id);

                        return (
                            <Col key={product._id} sm={6} md={4} lg={3} className="mb-4">
                                <Card className="shadow-sm border-0">
                                    <Card.Img
                                        variant="top"
                                        src={`${BASE_URL}${product.images?.[0]?.url || "/default-product.png"}`}
                                        className="p-3 rounded"
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>₹{product.price}</Card.Text>

                                        {cartItem ? (
                                            <InputGroup size="sm" className="w-100">
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={() =>
                                                        cartItem.quantity === 1
                                                            ? dispatch(removeFromCart(product._id))
                                                            : dispatch(updateQuantity({ _id: product._id, quantity: cartItem.quantity - 1 }))
                                                    }
                                                >
                                                    {cartItem.quantity === 1 ? <i className="fa fa-trash"></i> : "-"}
                                                </Button>
                                                <FormControl value={cartItem.quantity} className="text-center" readOnly />
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={() => dispatch(updateQuantity({ _id: product._id, quantity: cartItem.quantity + 1 }))}
                                                >
                                                    +
                                                </Button>
                                            </InputGroup>
                                        ) : (
                                            <Button
                                                variant="outline-primary"
                                                className="w-100"
                                                onClick={() => handleAddToCart(product)}
                                                disabled={loadingProductId === product._id} // Disable when loading
                                            >
                                                {loadingProductId === product._id ? (
                                                    <Spinner size="sm" animation="border" variant="primary" />
                                                    // <Spinner animation="border" variant="primary" />
                                                ) : (
                                                    <>
                                                        <i className="fa fa-plus me-2"></i> Add
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </Container>
    );
};

export default ProductList;
