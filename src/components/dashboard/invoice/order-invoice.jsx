

// import React, { forwardRef } from "react";

// const Invoice = forwardRef(({ order }, ref) => {
//     console.log("Received Order in Invoice:", order);

//     if (!order) return <p>No order data available.</p>;

//     return (
//         <div ref={ref} className="p-4 border rounded bg-white">
//             <h2 className="mb-3 text-center">Invoice</h2>

//             <p><strong>Order ID:</strong> {order?.orderId || order?._id || "N/A"}</p>
//             <p><strong>Customer Email:</strong> {order?.customerId?.email || "N/A"}</p>
//             <p><strong>Payment Method:</strong> {order?.paymentMethod || "N/A"}</p>
//             <p><strong>Payment Status:</strong> {order?.paymentStatus || "N/A"}</p>
//             <p><strong>Status:</strong> {order?.status || "N/A"}</p>

//             <h4 className="mt-4">Shipping Address</h4>
//             <p>{order?.address || "No address provided"}</p>

//             <h4 className="mt-4">Products</h4>
//             {order?.products?.length > 0 ? (
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th>Product</th>
//                             <th>Quantity</th>
//                             <th>Price (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {order.products.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{item?.product?.name || "Unknown Product"}</td>
//                                 <td>{item?.quantity || "N/A"}</td>
//                                 <td>₹{item?.priceAtOrder || 0}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No products in this order.</p>
//             )}

//             <h3 className="mt-4 text-end">Total: ₹{order?.totalPrice || 0}</h3>
//         </div>
//     );
// });

// export default Invoice;



import React, { forwardRef } from "react";
import { FaFileInvoice, FaBoxes, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const Invoice = forwardRef(({ order }, ref) => {
    if (!order) return <p className="text-danger text-center fw-bold">No order data available.</p>;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div ref={ref} className="p-4 p-md-5 bg-white shadow-lg rounded">
            {/* Invoice Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-4">
                <div>
                    <h1 className="h2 mb-1 fw-bold text-primary">
                        <FaFileInvoice className="me-2" /> INVOICE
                    </h1>
                    <p className="text-muted mb-0">Order #{order?.orderId || order?._id || "N/A"}</p>
                </div>
                <div className="text-end">
                    <h2 className="h4 fw-bold mb-1">E-Commerce Store</h2>
                    <p className="text-muted mb-0">123 Business Street, City, State 10001</p>
                </div>
            </div>

            {/* Order & Shipping Details */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 bg-light p-3 h-100">
                        <h5 className="fw-bold mb-3 d-flex align-items-center">
                            <FaBoxes className="me-2 text-primary" /> Order Details
                        </h5>
                        <p className="mb-1"><strong>Order Date:</strong> {formatDate(order?.createdAt)}</p>
                        <p className="mb-1"><strong>Payment Method:</strong> {order?.paymentMethod || "N/A"}</p>
                        <p className="mb-1"><strong>Payment Status:</strong>
                            <span className={`badge ms-2 ${order?.paymentStatus === 'paid' ? 'bg-success' : 'bg-warning'}`}>
                                {order?.paymentStatus || "N/A"}
                            </span>
                        </p>
                        <p className="mb-0"><strong>Order Status:</strong>
                            <span className={`badge ms-2 ${order?.status === 'completed' ? 'bg-success' : 'bg-info'}`}>
                                {order?.status || "N/A"}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                    <div className="card shadow-sm border-0 bg-light p-3 h-100">
                        <h5 className="fw-bold mb-3 d-flex align-items-center">
                            <FaMapMarkerAlt className="me-2 text-primary" /> Shipping Details
                        </h5>
                        <p className="mb-1"><strong>Employee:</strong> {order?.employeeId?.fullName || "N/A"}</p>
                        <p className="mb-1"><strong>Employee Email:</strong> {order?.employeeId?.email || "N/A"}</p>
                        <p className="mb-1"><strong>Customer Name:</strong> {order?.customerId?.fullName || "N/A"}</p>
                        <p className="mb-1"><strong>Customer Email :</strong> {order?.customerId?.email || "N/A"}</p>
                        <p className="mb-0"><strong>Address:</strong> {order?.address || "No address provided"}</p>
                    </div>
                </div>
            </div>

            {/* Order Items Table */}
            <div className="mb-4">
                <h5 className="fw-bold mb-3">Order Items</h5>
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <thead className="table-dark text-white">
                            <tr>
                                <th className="py-3">Product</th>
                                <th className="py-3">Quantity</th>
                                <th className="py-3">Unit Price</th>
                                <th className="py-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.products?.length > 0 ? (
                                order.products.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-3">
                                            <strong>{item?.product?.name || "Unknown Product"}</strong>
                                            {item?.product?.description && (
                                                <p className="text-muted mb-0 small">{item.product.description}</p>
                                            )}
                                        </td>
                                        <td className="py-3 align-middle">{item?.quantity || "N/A"}</td>
                                        <td className="py-3 align-middle">₹{item?.priceAtOrder?.toLocaleString() || 0}</td>
                                        <td className="py-3 align-middle">
                                            ₹{(item?.quantity * item?.priceAtOrder)?.toLocaleString() || 0}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No products in this order</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Summary */}
            <div className="row justify-content-end">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 bg-light p-4">
                        <h5 className="fw-bold mb-3">Order Summary</h5>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>₹{order?.totalPrice?.toLocaleString() || 0}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Discount:</span>
                            <span className="text-primary"> - ₹{order?.discount || 0}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Shipping:</span>
                            <span>₹{order?.shipping || 0}</span>
                        </div>

                        {order?.discountAmount > 0 && (
                            <div className="d-flex justify-content-between mb-2">
                                <span>Discount:</span>
                                <span className="text-danger">-₹{order?.discountAmount?.toLocaleString() || 0}</span>
                            </div>
                        )}
                        <div className="d-flex justify-content-between mb-2">
                            <span>Tax:</span>
                            <span>₹{order?.tax || 0}</span>
                        </div>
                        <div className="d-flex justify-content-between border-top pt-3 mt-2">
                            <strong>Total:</strong>
                            <strong className="h5 text-primary">
                                <FaRupeeSign className="me-1" />
                                {order.totalAfterDiscount || 0}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-4 border-top text-center text-muted small">
                <p className="mb-1">Thank you for shopping with us!</p>
                <p className="mb-0">For any queries, contact support@example.com</p>
            </div>
        </div>
    );
});

export default Invoice;
