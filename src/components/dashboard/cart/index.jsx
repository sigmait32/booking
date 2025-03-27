// import React, { useState, useEffect } from "react";
// import {
//     Container,
//     ListGroup,
//     Button,
//     Row,
//     Col,
//     Card,
//     Image,
//     Badge,
//     Alert,
//     InputGroup,
//     FormControl
// } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import BASE_URL from "../../../utils/imageConfig";
// import "./CartPage.css"; // Custom CSS for additional styling

// const CartPage = () => {
//     const [cart, setCart] = useState(() => {
//         const savedCart = localStorage.getItem("cart");
//         return savedCart ? JSON.parse(savedCart) : [];
//     });
//     const [couponCode, setCouponCode] = useState("");
//     const [discount, setDiscount] = useState(0);
//     const navigate = useNavigate();

//     const removeFromCart = (productId, productName) => {
//         const updatedCart = cart.filter((item) => item._id !== productId);
//         setCart(updatedCart);
//         showToast(`${productName} removed from cart`, "danger");
//     };

//     const updateQuantity = (productId, newQuantity) => {
//         if (newQuantity < 1) return;
//         const updatedCart = cart.map(item =>
//             item._id === productId ? { ...item, quantity: newQuantity } : item
//         );
//         setCart(updatedCart);
//     };

//     const applyCoupon = () => {
//         if (couponCode === "SAVE10") {
//             setDiscount(0.1); // 10% discount
//             showToast("Coupon applied successfully!", "success");
//         } else {
//             showToast("Invalid coupon code", "danger");
//         }
//     };

//     const showToast = (message, variant) => {
//         // Implement your toast notification system here
//         console.log(`${variant}: ${message}`);
//     };

//     useEffect(() => {
//         localStorage.setItem("cart", JSON.stringify(cart));
//     }, [cart]);

//     const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
//     const discountAmount = subtotal * discount;
//     const totalPrice = subtotal - discountAmount;
//     const shippingFee = subtotal > 1000 ? 0 : 50;

//     return (
//         <Container className="cart-page py-5">
//             <Row className="mb-4">
//                 <Col>
//                     <Button
//                         variant="outline-secondary"
//                         onClick={() => navigate(-1)}
//                         className="mb-3"
//                     >
//                         <i className="fa fa-arrow-left me-2"></i> Continue Shopping
//                     </Button>
//                     <h1 className="display-5">
//                         <i className="fa fa-shopping-cart me-2"></i> Your Shopping Cart
//                     </h1>
//                     <p className="text-muted">{cart.length} item(s) in your cart</p>
//                 </Col>
//             </Row>

//             {cart.length === 0 ? (
//                 <Card className="empty-cart">
//                     <Card.Body className="text-center py-5">
//                         <div className="empty-cart-icon mb-4">
//                             <i className="fa fa-shopping-cart fa-3x"></i>
//                         </div>
//                         <h3>Your cart is empty</h3>
//                         <p className="text-muted">Looks like you haven't added anything to your cart yet</p>
//                         <Button
//                             variant="primary"
//                             onClick={() => navigate("/dashboard/products")}
//                             className="mt-3"
//                         >
//                             Browse Products
//                         </Button>
//                     </Card.Body>
//                 </Card>
//             ) : (
//                 <Row>
//                     <Col lg={8}>
//                         <Card className="mb-4">
//                             <Card.Header className="bg-light">
//                                 <h5 className="mb-0">Cart Items</h5>
//                             </Card.Header>
//                             <ListGroup variant="flush">
//                                 {cart.map((item) => (
//                                     <ListGroup.Item key={item._id}>
//                                         <Row className="align-items-center">
//                                             <Col xs={3} md={2}>
//                                                 <Image
//                                                     src={`${BASE_URL}${item.images?.[0]?.url || "/default-product.png"}`}
//                                                     alt={item.name}
//                                                     fluid
//                                                     rounded
//                                                     className="cart-item-image"
//                                                 />
//                                             </Col>
//                                             <Col xs={9} md={6}>
//                                                 <h5 className="mb-1">{item.name}</h5>
//                                                 {item.isNew && (
//                                                     <Badge bg="success" className="me-2">New</Badge>
//                                                 )}
//                                                 <p className="text-muted mb-1">₹{item.price.toFixed(2)} each</p>
//                                             </Col>
//                                             <Col xs={6} md={2}>
//                                                 <InputGroup size="sm">
//                                                     <Button
//                                                         variant="outline-secondary"
//                                                         onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                                                     >
//                                                         -
//                                                     </Button>
//                                                     <FormControl
//                                                         value={item.quantity}
//                                                         onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
//                                                         className="text-center"
//                                                     />
//                                                     <Button
//                                                         variant="outline-secondary"
//                                                         onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                                                     >
//                                                         +
//                                                     </Button>
//                                                 </InputGroup>
//                                             </Col>
//                                             <Col xs={6} md={2} className="text-end">
//                                                 <h5 className="mb-0">₹{(item.price * item.quantity).toFixed(2)}</h5>
//                                                 <Button
//                                                     variant="outline-danger"
//                                                     size="sm"
//                                                     onClick={() => removeFromCart(item._id, item.name)}
//                                                     className="mt-2"
//                                                 >
//                                                     <i className="fa fa-trash"></i>
//                                                 </Button>
//                                             </Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                 ))}
//                             </ListGroup>
//                         </Card>
//                     </Col>
//                     <Col lg={4}>
//                         <Card className="order-summary">
//                             <Card.Body>
//                                 <Button
//                                     variant="primary"
//                                     size="lg"
//                                     className="w-100 mt-3"
//                                     onClick={() => navigate("/dashboard/checkout")}
//                                 >
//                                     Proceed to Checkout
//                                 </Button>
//                                 <div className="secure-checkout mt-3 text-center">
//                                     <i className="fa fa-lock me-2"></i>
//                                     <span className="text-muted">Secure Checkout</span>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             )}
//         </Container>
//     );
// };

// export default CartPage;

import React from "react";
import {
    Container, ListGroup, Button, Row, Col, Card, Image, InputGroup, Form
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../utils/imageConfig";
import { useMemo } from "react";

const CartPage = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Memoize calculations
    const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
    const shippingFee = subtotal > 1000 ? 0 : 50;
    const totalPrice = subtotal + shippingFee;

    return (
        <Container className="py-4 py-md-5">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Button
                    variant="light"
                    onClick={() => navigate(-1)}
                    className="d-flex align-items-center"
                >
                    <i className="fa fa-arrow-left me-2"></i> Continue Shopping
                </Button>
                <h2 className="mb-0">Your Shopping Cart</h2>
                <div style={{ width: "120px" }}></div> {/* Spacer for alignment */}
            </div>

            {cart.length === 0 ? (
                /* Empty Cart State */
                <Card className="text-center p-4 border-0 shadow-sm">
                    <Card.Body className="py-5">
                        <img
                            src="/assets/images/empty-cart.jpg"
                            alt="Empty Cart"
                            width="180px"
                            className="mb-4 opacity-75"
                        />
                        <h4 className="mb-3">Your cart is empty</h4>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate("/dashboard/cart-products")}
                            className="px-4"
                        >
                            Browse Products
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {/* Cart Items Column */}
                    <Col lg={8} className="mb-4 mb-lg-0">
                        <Card className="border-0 shadow-sm">
                            <ListGroup variant="flush">
                                {cart.map((item) => (
                                    <ListGroup.Item key={item._id} className="p-3 p-md-4">
                                        <Row className="align-items-center">
                                            {/* Product Image */}
                                            <Col xs={3} md={2}>
                                                <Image
                                                    src={`${BASE_URL}${item.images?.[0]?.url || "/default-product.png"}`}
                                                    fluid
                                                    rounded
                                                    className="shadow-sm"
                                                    style={{ minWidth: "60px" }}
                                                />
                                            </Col>

                                            {/* Product Info */}
                                            <Col xs={4} md={5} className="pe-3">
                                                <h5 className="mb-1">{item.name}</h5>
                                                <p className="text-muted mb-2">₹{item.price.toFixed(2)}</p>
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="text-danger p-0"
                                                    onClick={() => dispatch(removeFromCart(item._id))}
                                                >
                                                    <i className="fa fa-trash me-1"></i> Remove
                                                </Button>
                                            </Col>

                                            {/* Quantity Controls */}
                                            <Col xs={5} md={5}>
                                                <div className="d-flex align-items-center justify-content-end">
                                                    <InputGroup size="sm" style={{ width: "120px" }}>
                                                        <Button
                                                            variant="outline-secondary"
                                                            disabled={item.quantity === 1}
                                                            onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: item.quantity - 1 }))}
                                                            className="px-3"
                                                        >
                                                            -
                                                        </Button>
                                                        <Form.Control
                                                            value={item.quantity}
                                                            className="text-center border-secondary"
                                                            readOnly
                                                        />
                                                        <Button
                                                            variant="outline-secondary"
                                                            onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: item.quantity + 1 }))}
                                                            className="px-3"
                                                        >
                                                            +
                                                        </Button>
                                                    </InputGroup>

                                                    <div className="ms-3 text-end" style={{ width: "80px" }}>
                                                        <span className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    </Col>

                    {/* Order Summary Column */}
                    <Col lg={4}>
                        <Card className="border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
                            <Card.Body className="p-4">
                                <h5 className="mb-4">Order Summary</h5>

                                <ListGroup variant="flush" className="mb-3">
                                    <ListGroup.Item className="d-flex justify-content-between py-2">
                                        <span>{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between py-2">
                                        <span>Shipping</span>
                                        <span className={shippingFee === 0 ? "text-success fw-bold" : ""}>
                                            {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between py-2 border-bottom-0">
                                        <span>Tax</span>
                                        <span>₹0.00</span>
                                    </ListGroup.Item>
                                </ListGroup>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="mb-0">Total</h5>
                                    <h4 className="mb-0 text-primary">₹{totalPrice.toFixed(2)}</h4>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-100 mb-3"
                                    onClick={() => navigate("/dashboard/checkout")}
                                >
                                    Proceed to Checkout
                                </Button>

                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="w-100"
                                    onClick={() => dispatch(clearCart())}
                                >
                                    Clear Cart
                                </Button>

                                {subtotal < 1000 && (
                                    <div className="mt-3 text-center text-success small">
                                        <i className="fa fa-truck me-1"></i>
                                        Spend ₹{(1000 - subtotal).toFixed(2)} more for free shipping!
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default CartPage;
