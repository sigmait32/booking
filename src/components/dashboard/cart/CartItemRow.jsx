import React from "react";
import { Row, Col, Image, Badge, Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FaTrash, FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../store/features/cart/cartSlice";
import BASE_URL from "../../../utils/imageConfig";
import { toast } from "react-toastify";

const CartItemRow = ({ item }) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            dispatch(removeFromCart(item._id));
            toast.info(`Removed ${item.name} from cart`);
            return;
        }

        if (newQuantity > item.stock) {
            toast.error(`Only ${item.stock} units available for ${item.name}`);
            return;
        }

        dispatch(updateQuantity({ _id: item._id, quantity: newQuantity }));
    };

    return (
        <ListGroup.Item className="cart-item">
            <Row className="align-items-center">
                <Col xs={3} md={2}>
                    <div className="product-image-wrapper">
                        <Image
                            src={`${BASE_URL}${item.images?.[0]?.url || "/default-product.png"}`}
                            fluid
                            rounded
                            className="product-image"
                        />
                        {item.discount > 0 && (
                            <Badge bg="danger" className="discount-badge">
                                -{item.discount}%
                            </Badge>
                        )}
                    </div>
                </Col>
                <Col xs={4} md={5} className="product-info">
                    <h5 className="product-name mb-1">{item.name}</h5>
                    <p className="product-price mb-2">
                        ₹{item.price.toFixed(2)}
                        {item.originalPrice && (
                            <span className="original-price ms-2">
                                <del>₹{item.originalPrice.toFixed(2)}</del>
                            </span>
                        )}
                    </p>
                    {item.stock <= 5 && (
                        <p className="stock-warning mb-2">
                            <FaCheck className="me-1" />
                            Only {item.stock} left in stock!
                        </p>
                    )}
                    <Button variant="link" size="sm" onClick={() => {
                        dispatch(removeFromCart(item._id));
                        toast.info(`Removed ${item.name} from cart`);
                    }}>
                        <FaTrash className="me-1" /> Remove
                    </Button>
                </Col>
                <Col xs={5} md={5} className="quantity-section">
                    <div className="d-flex align-items-center justify-content-end">
                        <InputGroup size="sm" className="quantity-control">
                            <Button
                                variant="outline-secondary"
                                disabled={item.quantity <= 1}
                                onClick={() => handleQuantityChange(item.quantity - 1)}
                            >
                                <FaMinus />
                            </Button>
                            <Form.Control
                                value={item.quantity}
                                readOnly
                                className="quantity-input text-center"
                            />
                            <Button
                                variant="outline-secondary"
                                disabled={item.quantity >= item.stock}
                                onClick={() => handleQuantityChange(item.quantity + 1)}
                            >
                                <FaPlus />
                            </Button>
                        </InputGroup>
                        <div className="item-total-price ms-3">
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default CartItemRow;
