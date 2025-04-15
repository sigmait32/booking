

// import React from "react";
// import { Card, ListGroup, Button } from "react-bootstrap";
// import { FaTruck } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { clearCart } from "../../../store/features/cart/cartSlice";
// import "./summery.css";

// const OrderSummary = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const cartItems = useSelector((state) => state.cart.items);

//     const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//     const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//     const discount = cartItems.reduce((total, item) => {
//         const discountPerItem = (item.price * (item.maxDiscount || 0)) / 100;
//         return total + discountPerItem * item.quantity;
//     }, 0);

//     // Tax Calculation
//     let taxAmount = 0;
//     taxAmount = cartItems.reduce((total, item) => {
//         if (!item.isTaxable) return total;

//         const totalItemPrice = item.price * item.quantity;
//         const cgstAmount = (totalItemPrice * (item.cgst || 0)) / 100;
//         const sgstAmount = (totalItemPrice * (item.sgst || 0)) / 100;
//         const igstAmount = (totalItemPrice * (item.igst || 0)) / 100;

//         return total + cgstAmount + sgstAmount + igstAmount;
//     }, 0);

//     // Tax Label Logic (Improved)
//     let taxLabel = "";
//     const taxableItems = cartItems.filter(item => item.isTaxable);
//     if (taxableItems.length > 0) {
//         const allIgst = taxableItems.every(item => item.igst > 0);
//         const allCgstSgst = taxableItems.every(item => item.cgst > 0 && item.sgst > 0);

//         if (allIgst) taxLabel = "GST (IGST)";
//         else if (allCgstSgst) taxLabel = "GST (CGST + SGST)";
//         else taxLabel = "GST (Mixed)";
//     }

//     const shippingFee = cartItems.reduce((total, item) => {
//         const shippingCost =
//             item.shipping?.isFreeShipping || item.shipping?.cost === 0
//                 ? 0
//                 : item.shipping?.cost || 0;
//         return total + shippingCost;
//     }, 0);

//     const platformFee = 0;

//     const totalPrice = subtotal - discount + taxAmount + shippingFee + platformFee;

//     const handleClearCart = () => {
//         dispatch(clearCart());
//         toast.info("Cart cleared");
//     };

//     return (
//         <Card className="order-summary-card sticky-top shadow-sm">
//             <Card.Header className="order-summary-header bg-light">
//                 <h5 className="mb-0">Order Summary</h5>
//             </Card.Header>

//             <Card.Body>
//                 <ListGroup variant="flush" className="mb-3">
//                     <ListGroup.Item className="summary-item d-flex justify-content-between">
//                         <span>Subtotal ({itemCount} items)</span>
//                         <span>₹{subtotal.toFixed(2)}</span>
//                     </ListGroup.Item>

//                     <ListGroup.Item className="summary-item d-flex justify-content-between">
//                         <span>Discount</span>
//                         <span className={discount > 0 ? "text-success" : ""}>
//                             {discount > 0 ? `− ₹${discount.toFixed(2)}` : "₹0.00"}
//                         </span>
//                     </ListGroup.Item>

//                     <ListGroup.Item className="summary-item d-flex justify-content-between">
//                         <span>Shipping</span>
//                         <span className={shippingFee === 0 ? "text-success" : ""}>
//                             {shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`}
//                         </span>
//                     </ListGroup.Item>

//                     <ListGroup.Item className="summary-item d-flex justify-content-between">
//                         <span>Platform Fee</span>
//                         <span>₹{platformFee.toFixed(2)}</span>
//                     </ListGroup.Item>

//                     {taxAmount > 0 && (
//                         <ListGroup.Item className="summary-item d-flex justify-content-between">
//                             <span>{taxLabel}</span>
//                             <span>₹{taxAmount.toFixed(2)}</span>
//                         </ListGroup.Item>
//                     )}
//                 </ListGroup>

//                 <div className="order-total d-flex justify-content-between border-top pt-3 mb-1">
//                     <h5>Total</h5>
//                     <h4 className="total-price">₹{totalPrice.toFixed(2)}</h4>
//                 </div>

//                 <div className="text-muted small text-end mb-3">
//                     *Inclusive of all applicable taxes
//                 </div>

//                 <Button
//                     variant="primary"
//                     size="lg"
//                     className="checkout-btn w-100 mb-3"
//                     onClick={() => navigate("/dashboard/checkout")}
//                 >
//                     Proceed to Checkout
//                 </Button>

//                 <Button
//                     variant="outline-danger"
//                     size="sm"
//                     className="clear-cart-btn w-100"
//                     onClick={handleClearCart}
//                 >
//                     Clear Cart
//                 </Button>

//                 {subtotal < 1000 && (
//                     <div className="free-shipping-notice mt-3 text-muted small d-flex align-items-center">
//                         <FaTruck className="me-2" />
//                         Spend ₹{(1000 - subtotal).toFixed(2)} more for free shipping!
//                     </div>
//                 )}

//                 {discount > 0 && (
//                     <div className="text-success mt-2 text-center fw-semibold">
//                         You will save ₹{discount.toFixed(2)} on this order
//                     </div>
//                 )}
//             </Card.Body>
//         </Card>
//     );
// };

// export default OrderSummary;


import React, { useMemo } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { FaTruck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../../store/features/cart/cartSlice";
import "./summery.css";

// Helper to calculate tax type
const applyGST = (item, buyerState, sellerState) => {
    const isSameState = buyerState === sellerState;
    const gstRate = item.taxRate || 18; // Default GST if not provided

    return {
        ...item,
        cgst: item.isTaxable && isSameState ? gstRate / 2 : 0,
        sgst: item.isTaxable && isSameState ? gstRate / 2 : 0,
        igst: item.isTaxable && !isSameState ? gstRate : 0,
    };
};

const OrderSummary = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const buyerState = useSelector((state) => state.customer?.address?.state) || "Maharashtra";
    const sellerState = "Maharashtra"; // Set your store's default state

    const updatedCartItems = cartItems.map(item => applyGST(item, buyerState, sellerState));

    const itemCount = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const discount = updatedCartItems.reduce((total, item) => {
        const discountPerItem = (item.price * (item.maxDiscount || 0)) / 100;
        return total + discountPerItem * item.quantity;
    }, 0);

    const taxAmount = updatedCartItems.reduce((total, item) => {
        const totalPrice = item.price * item.quantity;
        const cgst = (totalPrice * (item.cgst || 0)) / 100;
        const sgst = (totalPrice * (item.sgst || 0)) / 100;
        const igst = (totalPrice * (item.igst || 0)) / 100;
        return total + cgst + sgst + igst;
    }, 0);

    const taxableItems = updatedCartItems.filter(item => item.isTaxable);
    let taxLabel = "";
    if (taxableItems.length > 0) {
        const allIgst = taxableItems.every(item => item.igst > 0);
        const allCgstSgst = taxableItems.every(item => item.cgst > 0 && item.sgst > 0);
        // taxLabel = allIgst ? "GST (IGST)" : allCgstSgst ? "GST (CGST + SGST)" : "GST (Mixed)";
        taxLabel = allIgst ? "GST (IGST)" : allCgstSgst ? "Tax" : "GST (Mixed)";
    }

    // const shippingFee = updatedCartItems.reduce((total, item) => {
    //     const shippingCost =
    //         item.shipping?.isFreeShipping || item.shipping?.cost === 0
    //             ? 0
    //             : item.shipping?.cost || 0;
    //     return total + shippingCost;
    // }, 0);
    const shippingFee = updatedCartItems.reduce((sum, item) => {
        if (item.shipping && !item.shipping.isFreeShipping) {
            return sum + (item.shipping.cost || 0) * item.quantity;
        }
        return sum;
    }, 0);

    const platformFee = 0;
    const totalPrice = subtotal - discount + taxAmount + shippingFee + platformFee;

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.info("Cart cleared");
    };

    return (
        <Card className="order-summary-card sticky-top shadow-sm">
            <Card.Header className="order-summary-header bg-light">
                <h5 className="mb-0">Order Summary</h5>
            </Card.Header>

            <Card.Body>
                <ListGroup variant="flush" className="mb-3">
                    <ListGroup.Item className="summary-item d-flex justify-content-between">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </ListGroup.Item>

                    <ListGroup.Item className="summary-item d-flex justify-content-between">
                        <span>Discount</span>
                        <span className={discount > 0 ? "text-success" : ""}>
                            {discount > 0 ? `− ₹${discount.toFixed(2)}` : "₹0.00"}
                        </span>
                    </ListGroup.Item>

                    <ListGroup.Item className="summary-item d-flex justify-content-between">
                        <span>Shipping</span>
                        <span className={shippingFee === 0 ? "text-success" : ""}>
                            {shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`}
                        </span>
                    </ListGroup.Item>

                    <ListGroup.Item className="summary-item d-flex justify-content-between">
                        <span>Platform Fee</span>
                        <span>₹{platformFee.toFixed(2)}</span>
                    </ListGroup.Item>

                    {taxAmount > 0 && (
                        <ListGroup.Item className="summary-item d-flex justify-content-between">
                            <span>{taxLabel}</span>
                            <span>₹{taxAmount.toFixed(2)}</span>
                        </ListGroup.Item>
                    )}
                </ListGroup>

                <div className="order-total d-flex justify-content-between border-top pt-3 mb-1">
                    <h5>Total</h5>
                    <h4 className="total-price">₹{totalPrice.toFixed(2)}</h4>
                </div>

                <div className="text-muted small text-end mb-3">
                    *Inclusive of all applicable taxes
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
                    onClick={handleClearCart}
                >
                    Clear Cart
                </Button>

                {subtotal < 1000 && (
                    <div className="free-shipping-notice mt-3 text-muted small d-flex align-items-center">
                        <FaTruck className="me-2" />
                        Spend ₹{(1000 - subtotal).toFixed(2)} more for free shipping!
                    </div>
                )}

                {discount > 0 && (
                    <div className="text-success mt-2 text-center fw-semibold">
                        You will save ₹{discount.toFixed(2)} on this order
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default OrderSummary;


