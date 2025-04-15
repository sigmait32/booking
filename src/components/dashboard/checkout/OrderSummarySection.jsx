


// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { useSelector } from 'react-redux';

// const OrderSummarySection = ({ formData, isLoading, placeOrder, discount, shippingFee, totalGST, total }) => {

//     const cartItems = useSelector((state) => state.cart.items);


//     const subtotal = cartItems.reduce((sum, item) => {
//         return sum + item.price * item.quantity;
//     }, 0);

//     const discount = cartItems.reduce((sum, item) => {

//         const itemTotal = item.price * item.quantity;

//         const itemDiscount = itemTotal * (item.maxDiscount || 0) / 100
//         return sum + itemDiscount;

//     }, 0)



//     const shippingFee = cartItems.reduce((sum, item) => {
//         if (item.shipping && !item.shipping.isFreeShipping) {
//             return sum + (item.shipping.cost || 0) * item.quantity;
//         }
//         return sum;
//     }, 0);

//     const totalGST = cartItems.reduce((total, item) => {
//         const gstAmount = (item.price * item.quantity * 18) / 100;
//         return total + gstAmount;
//     }, 0);

//     const total = subtotal - discount + totalGST + shippingFee;



//     return (
//         <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
//             <Card.Body className="p-4">
//                 <h2 className="fw-bold text-primary mb-4">
//                     <i className="fa fa-shopping-bag me-2"></i>
//                     Order Summary
//                 </h2>

//                 <div className="mb-4">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h5 className="fw-bold mb-0">Total Items</h5>
//                         <span className="badge bg-primary rounded-pill fs-6">
//                             {cartItems?.length}
//                         </span>
//                     </div>


//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h5 className="fw-bold mb-0">Discount</h5>
//                         <span className="text-success fw-bold">
//                             {discount > 0 ? `− ₹${discount.toFixed(2)}` : "₹0.00"}
//                         </span>
//                     </div>
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h5 className="fw-bold mb-0">Shipping</h5>
//                         <span className="text-success fw-bold">
//                             {shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`}
//                         </span>
//                     </div>
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h5 className="fw-bold mb-0">Tax</h5>
//                         <span className="text-success fw-bold">₹{totalGST.toFixed(2)}</span>
//                     </div>
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h5 className="fw-bold mb-0">Platform Fee</h5>
//                         <span className="text-success fw-bold">0</span>
//                     </div>

//                     <hr className="my-3" />

//                     <div className="d-flex justify-content-between align-items-center">
//                         <h4 className="fw-bold mb-0">Total Amount</h4>
//                         <h3 className="text-primary mb-0">₹{total.toFixed(2)}</h3>
//                     </div>
//                 </div>

//                 <Button
//                     variant="primary"
//                     type="button"

//                     disabled={
//                         isLoading ||
//                         cartItems.length === 0 ||
//                         !formData.customerId || !formData.customerId
//                     }
//                     className="w-100 py-3 fw-bold"
//                     size="lg"
//                     onClick={placeOrder}
//                 >
//                     {isLoading ? (
//                         <>
//                             <i className="fa fa-spinner fa-spin me-2"></i>
//                             Processing Order...
//                         </>
//                     ) : (
//                         <>
//                             <i className="fa fa-check-circle me-2"></i>
//                             Place Order
//                         </>
//                     )}
//                 </Button>
//             </Card.Body>
//         </Card>
//     );
// };

// export default OrderSummarySection;

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const OrderSummarySection = ({ formData, isLoading, placeOrder, discount, shippingFee, totalGST, total, subtotal }) => {
    const cartItems = useSelector((state) => state.cart.items);

    return (
        <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Body className="p-4">
                <h2 className="fw-bold text-primary mb-4">
                    <i className="fa fa-shopping-bag me-2"></i>
                    Order Summary
                </h2>

                <div className="mb-4">
                    <SummaryRow label="Sub Total" value={subtotal} badge />
                    <hr />
                    <SummaryRow label="Total Items" value={cartItems?.length} badge />
                    <hr />
                    <SummaryRow label="Discount" value={`− ₹${discount.toFixed(2)}`} isPositive={false} />
                    <hr />
                    <SummaryRow label="Shipping" value={shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`} />
                    <hr />
                    <SummaryRow label="Tax" value={`₹${totalGST.toFixed(2)}`} />
                    <hr />
                    <SummaryRow label="Platform Fee" value="₹0.00" mutedNote="No extra platform charges" />

                    <hr className="my-3" />

                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="fw-bold mb-0">Total Amount</h4>
                        <h3 className="text-primary mb-0" aria-live="polite">₹{total.toFixed(2)}</h3>
                    </div>
                </div>

                <Button
                    variant="primary"
                    type="button"
                    disabled={isLoading || cartItems.length === 0 || !formData.customerId}
                    className="w-100 py-3 fw-bold"
                    size="lg"
                    onClick={placeOrder}
                    aria-busy={isLoading}
                >
                    {isLoading ? (
                        <>
                            <i className="fa fa-spinner fa-spin me-2"></i>
                            Processing Order...
                        </>
                    ) : (
                        <>
                            <i className="fa fa-check-circle me-2"></i>
                            Place Order
                        </>
                    )}
                </Button>
            </Card.Body>
        </Card>
    );
};

// Small reusable row component
const SummaryRow = ({ label, value, badge = false, isPositive = true, mutedNote }) => (
    <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
            <h5 className="fw-bold mb-0">{label}</h5>
            {mutedNote && <small className="text-muted">{mutedNote}</small>}
        </div>
        <span className={badge ? "badge bg-primary rounded-pill fs-6" : `fw-bold ${isPositive ? "text-success" : "text-danger"}`}>
            {value}
        </span>
    </div>
);

export default OrderSummarySection;

