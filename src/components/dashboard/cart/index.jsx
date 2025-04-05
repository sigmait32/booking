

// import React from "react";
// import {
//     Container, ListGroup, Button, Row, Col, Card, Image, InputGroup, Form
// } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromCart, updateQuantity, clearCart } from "../../../store/features/cart/cartSlice";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "../../../utils/imageConfig";
// import { useMemo } from "react";

// const CartPage = () => {
//     const cart = useSelector((state) => state.cart.items);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Memoize calculations
//     const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
//     const shippingFee = subtotal > 1000 ? 0 : 50;
//     const totalPrice = subtotal + shippingFee;

//     return (
//         <Container className="py-4 py-md-5">
//             {/* Header Section */}
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <Button
//                     variant="light"
//                     onClick={() => navigate(-1)}
//                     className="d-flex align-items-center"
//                 >
//                     <i className="fa fa-arrow-left me-2"></i> Continue Shopping
//                 </Button>
//                 <h2 className="mb-0">Your Shopping Cart</h2>
//                 <div style={{ width: "120px" }}></div> {/* Spacer for alignment */}
//             </div>

//             {cart.length === 0 ? (
//                 /* Empty Cart State */
//                 <Card className="text-center p-4 border-0 shadow-sm">
//                     <Card.Body className="py-5">
//                         <img
//                             src="/assets/images/empty-cart.jpg"
//                             alt="Empty Cart"
//                             width="180px"
//                             className="mb-4 opacity-75"
//                         />
//                         <h4 className="mb-3">Your cart is empty</h4>
//                         <Button
//                             variant="primary"
//                             size="lg"
//                             onClick={() => navigate("/dashboard/cart-products")}
//                             className="px-4"
//                         >
//                             Browse Products
//                         </Button>
//                     </Card.Body>
//                 </Card>
//             ) : (
//                 <Row>
//                     {/* Cart Items Column */}
//                     <Col lg={8} className="mb-4 mb-lg-0">
//                         <Card className="border-0 shadow-sm">
//                             <ListGroup variant="flush">
//                                 {cart.map((item) => (
//                                     <ListGroup.Item key={item._id} className="p-3 p-md-4">
//                                         <Row className="align-items-center">
//                                             {/* Product Image */}
//                                             <Col xs={3} md={2}>
//                                                 <Image
//                                                     src={`${BASE_URL}${item.images?.[0]?.url || "/default-product.png"}`}
//                                                     fluid
//                                                     rounded
//                                                     className="shadow-sm"
//                                                     style={{ minWidth: "60px" }}
//                                                 />
//                                             </Col>

//                                             {/* Product Info */}
//                                             <Col xs={4} md={5} className="pe-3">
//                                                 <h5 className="mb-1">{item.name}</h5>
//                                                 <p className="text-muted mb-2">₹{item.price.toFixed(2)}</p>
//                                                 <Button
//                                                     variant="link"
//                                                     size="sm"
//                                                     className="text-danger p-0"
//                                                     onClick={() => dispatch(removeFromCart(item._id))}
//                                                 >
//                                                     <i className="fa fa-trash me-1"></i> Remove
//                                                 </Button>
//                                             </Col>

//                                             {/* Quantity Controls */}
//                                             <Col xs={5} md={5}>
//                                                 <div className="d-flex align-items-center justify-content-end">
//                                                     <InputGroup size="sm" style={{ width: "120px" }}>
//                                                         <Button
//                                                             variant="outline-secondary"
//                                                             disabled={item.quantity === 1}
//                                                             onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: item.quantity - 1 }))}
//                                                             className="px-3"
//                                                         >
//                                                             -
//                                                         </Button>
//                                                         <Form.Control
//                                                             value={item.quantity}
//                                                             className="text-center border-secondary"
//                                                             readOnly
//                                                         />
//                                                         <Button
//                                                             variant="outline-secondary"
//                                                             onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: item.quantity + 1 }))}
//                                                             className="px-3"
//                                                         >
//                                                             +
//                                                         </Button>
//                                                     </InputGroup>

//                                                     <div className="ms-3 text-end" style={{ width: "80px" }}>
//                                                         <span className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
//                                                     </div>
//                                                 </div>
//                                             </Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                 ))}
//                             </ListGroup>
//                         </Card>
//                     </Col>

//                     {/* Order Summary Column */}
//                     <Col lg={4}>
//                         <Card className="border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
//                             <Card.Body className="p-4">
//                                 <h5 className="mb-4">Order Summary</h5>

//                                 <ListGroup variant="flush" className="mb-3">
//                                     <ListGroup.Item className="d-flex justify-content-between py-2">
//                                         <span>{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</span>
//                                         <span>₹{subtotal.toFixed(2)}</span>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item className="d-flex justify-content-between py-2">
//                                         <span>Shipping</span>
//                                         <span className={shippingFee === 0 ? "text-success fw-bold" : ""}>
//                                             {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
//                                         </span>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item className="d-flex justify-content-between py-2 border-bottom-0">
//                                         <span>Tax</span>
//                                         <span>₹0.00</span>
//                                     </ListGroup.Item>
//                                 </ListGroup>

//                                 <div className="d-flex justify-content-between align-items-center mb-4">
//                                     <h5 className="mb-0">Total</h5>
//                                     <h4 className="mb-0 text-primary">₹{totalPrice.toFixed(2)}</h4>
//                                 </div>

//                                 <Button
//                                     variant="primary"
//                                     size="lg"
//                                     className="w-100 mb-3"
//                                     onClick={() => navigate("/dashboard/checkout")}
//                                 >
//                                     Proceed to Checkout
//                                 </Button>

//                                 <Button
//                                     variant="outline-danger"
//                                     size="sm"
//                                     className="w-100"
//                                     onClick={() => dispatch(clearCart())}
//                                 >
//                                     Clear Cart
//                                 </Button>

//                                 {subtotal < 1000 && (
//                                     <div className="mt-3 text-center text-success small">
//                                         <i className="fa fa-truck me-1"></i>
//                                         Spend ₹{(1000 - subtotal).toFixed(2)} more for free shipping!
//                                     </div>
//                                 )}
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
    Container, ListGroup, Button, Row, Col, Card, Image,
    InputGroup, Form, Alert, Badge
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../utils/imageConfig";
import { useMemo } from "react";
import {
    FaArrowLeft, FaTrash, FaTruck, FaShoppingBag,
    FaPlus, FaMinus, FaCheck
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CartPage.css"; // Custom CSS file

const CartPage = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Memoize calculations
    const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
    const shippingFee = subtotal > 1000 ? 0 : 50;
    const totalPrice = subtotal + shippingFee;

    const handleQuantityChange = (item, newQuantity) => {
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
        <Container className="cart-page py-4 py-md-5">
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header Section */}
            <div className="cart-header mb-5">
                <Button
                    variant="outline-secondary"
                    onClick={() => navigate(-1)}
                    className="back-btn"
                >
                    <FaArrowLeft className="me-2" /> Continue Shopping
                </Button>
                <h2 className="cart-title">
                    <FaShoppingBag className="me-3" />
                    Your Shopping Cart
                    <Badge bg="secondary" className="ms-3 cart-count">
                        {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                    </Badge>
                </h2>
            </div>

            {cart.length === 0 ? (
                /* Empty Cart State */
                <Card className="empty-cart-card text-center">
                    <Card.Body className="py-5">
                        <div className="empty-cart-icon mb-4">
                            <FaShoppingBag size={64} />
                        </div>
                        <h3 className="mb-3">Your cart is empty</h3>
                        <p className="text-muted mb-4">Looks like you haven't added any items yet</p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate("/dashboard/cart-products")}
                            className="browse-btn"
                        >
                            Browse Products
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {/* Cart Items Column */}
                    <Col lg={8} className="mb-4 mb-lg-0">
                        <Card className="cart-items-card">
                            <Card.Header className="cart-items-header">
                                <h5 className="mb-0">Your Items</h5>
                            </Card.Header>
                            <ListGroup variant="flush">
                                {cart.map((item) => (
                                    <ListGroup.Item key={item._id} className="cart-item">
                                        <Row className="align-items-center">
                                            {/* Product Image */}
                                            <Col xs={3} md={2}>
                                                <div className="product-image-wrapper">
                                                    <Image
                                                        src={`${BASE_URL}${item.images?.[0]?.url || "/default-product.png"}`}
                                                        fluid
                                                        rounded
                                                        className="product-image"
                                                        loading="lazy"
                                                    />
                                                    {item.discount > 0 && (
                                                        <Badge bg="danger" className="discount-badge">
                                                            -{item.discount}%
                                                        </Badge>
                                                    )}
                                                </div>
                                            </Col>

                                            {/* Product Info */}
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
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="remove-btn"
                                                    onClick={() => {
                                                        dispatch(removeFromCart(item._id));
                                                        toast.info(`Removed ${item.name} from cart`);
                                                    }}
                                                >
                                                    <FaTrash className="me-1" /> Remove
                                                </Button>
                                            </Col>

                                            {/* Quantity Controls */}
                                            <Col xs={5} md={5} className="quantity-section">
                                                <div className="d-flex align-items-center justify-content-end">
                                                    <InputGroup size="sm" className="quantity-control">
                                                        <Button
                                                            variant="outline-secondary"
                                                            disabled={item.quantity <= 1}
                                                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                            className="quantity-btn"
                                                        >
                                                            <FaMinus />
                                                        </Button>
                                                        <Form.Control
                                                            value={item.quantity}
                                                            className="quantity-input text-center"
                                                            readOnly
                                                        />
                                                        <Button
                                                            variant="outline-secondary"
                                                            disabled={item.quantity >= item.stock}
                                                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                            className="quantity-btn"
                                                        >
                                                            <FaPlus />
                                                        </Button>
                                                    </InputGroup>

                                                    <div className="item-total-price">
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
                        <Card className="order-summary-card sticky-top">
                            <Card.Header className="order-summary-header">
                                <h5 className="mb-0">Order Summary</h5>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush" className="mb-3">
                                    <ListGroup.Item className="summary-item">
                                        <span>Subtotal ({cart.length} items)</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="summary-item">
                                        <span>Shipping</span>
                                        <span className={shippingFee === 0 ? "free-shipping" : ""}>
                                            {shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`}
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="summary-item">
                                        <span>Tax</span>
                                        <span>₹0.00</span>
                                    </ListGroup.Item>
                                </ListGroup>

                                <div className="order-total">
                                    <h5>Total</h5>
                                    <h4 className="total-price">₹{totalPrice.toFixed(2)}</h4>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="checkout-btn w-100 mb-3"
                                    onClick={() => navigate("/dashboard/checkout")}
                                >
                                    Proceed to Checkout
                                </Button>

                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="clear-cart-btn w-100"
                                    onClick={() => {
                                        dispatch(clearCart());
                                        toast.info("Cart cleared");
                                    }}
                                >
                                    Clear Cart
                                </Button>

                                {subtotal < 1000 && (
                                    <div className="free-shipping-notice mt-3">
                                        <FaTruck className="me-2" />
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