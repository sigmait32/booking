// import React from 'react';
// import {
//     Container,
//     Card,
//     Row,
//     Col,
//     Badge,
//     Table,
//     Button,
//     Alert,
//     ListGroup,
//     ProgressBar
// } from 'react-bootstrap';
// import { useParams, useNavigate } from 'react-router-dom';

// import { useGetOrderByIdQuery } from '../../../store/features/order/orderApi';
// import BASE_URL from '../../../utils/imageConfig';
// const OrderDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { data: order, isLoading, isError, error } = useGetOrderByIdQuery(id);

//     console.log("order is =========>", order)

//     const getStatusBadge = (status) => {
//         const statusInfo = {
//             Pending: { bg: 'warning', icon: 'fa-clock' },
//             Processing: { bg: 'primary', icon: 'fa-cogs' },
//             Dispatched: { bg: 'info', icon: 'fa-truck-loading' },
//             Shipped: { bg: 'info', icon: 'fa-shipping-fast' },
//             'Out for Delivery': { bg: 'primary', icon: 'fa-motorcycle' },
//             Delivered: { bg: 'success', icon: 'fa-check-circle' },
//             Cancelled: { bg: 'danger', icon: 'fa-times-circle' },
//             Returned: { bg: 'danger', icon: 'fa-undo' },
//             Refunded: { bg: 'secondary', icon: 'fa-money-bill-wave' }
//         };

//         const { bg, icon } = statusInfo[status] || { bg: 'dark', icon: 'fa-question-circle' };

//         return (
//             <Badge bg={bg} className="d-flex align-items-center fs-6 p-2">
//                 <i className={`fa ${icon} me-2`}></i>
//                 {status}
//             </Badge>
//         );
//     };

//     const getPaymentIcon = (method) => {
//         const icons = {
//             'Credit Card': 'fa-credit-card',
//             'Debit Card': 'fa-credit-card',
//             'PayPal': 'fa-paypal',
//             'Bank Transfer': 'fa-university',
//             'Cash on Delivery': 'fa-money-bill-wave'
//         };
//         return icons[method] || 'fa-money-check-alt';
//     };

//     const getProgressValue = (status) => {
//         const statusOrder = [
//             'Pending',
//             'Processing',
//             'Dispatched',
//             'Shipped',
//             'Out for Delivery',
//             'Delivered'
//         ];
//         const index = statusOrder.indexOf(status);
//         return index >= 0 ? Math.round((index / (statusOrder.length - 1)) * 100) : 0;
//     };

//     if (isLoading) {
//         return (
//             <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
//                 <div className="text-center">
//                     <div className="mb-3">
//                         <i className="fa fa-spinner fa-spin fa-3x text-primary"></i>
//                     </div>
//                     <h4>Loading Order Details...</h4>
//                 </div>
//             </Container>
//         );
//     }

//     if (isError) {
//         return (
//             <Container className="mt-5">
//                 <Alert variant="danger">
//                     <div className="d-flex align-items-center">
//                         <i className="fa fa-exclamation-circle fa-2x me-3"></i>
//                         <div>
//                             <h4>Error Loading Order</h4>
//                             <p className="mb-0">{error.data?.message || 'Failed to load order details'}</p>
//                         </div>
//                     </div>
//                     <div className="mt-3">
//                         <Button variant="outline-danger" onClick={() => navigate(-1)}>
//                             <i className="fa fa-arrow-left me-2"></i> Back to Orders
//                         </Button>
//                     </div>
//                 </Alert>
//             </Container>
//         );
//     }

//     if (!order) {
//         return (
//             <Container className="mt-5">
//                 <Alert variant="warning">
//                     <div className="d-flex align-items-center">
//                         <i className="fa fa-exclamation-triangle fa-2x me-3"></i>
//                         <div>
//                             <h4>Order Not Found</h4>
//                             <p className="mb-0">The requested order could not be found.</p>
//                         </div>
//                     </div>
//                     <div className="mt-3">
//                         <Button variant="outline-warning" onClick={() => navigate(-1)}>
//                             <i className="fa fa-arrow-left me-2"></i> Back to Orders
//                         </Button>
//                     </div>
//                 </Alert>
//             </Container>
//         );
//     }

//     return (
//         <Container className="my-4">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2 className="mb-0">
//                     <i className="fa fa-file-invoice me-2 text-primary"></i>
//                     Order Details
//                 </h2>
//                 <Button variant="outline-secondary" onClick={() => navigate(-1)}>
//                     <i className="fa fa-arrow-left me-2"></i> Back to Orders
//                 </Button>
//             </div>

//             <Card className="shadow-sm mb-4">
//                 <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
//                     <div>
//                         <h5 className="mb-1">
//                             Order ID: <span className="text-primary">{order.orderId}</span>
//                         </h5>
//                         <small className="text-muted">
//                             <i className="fa fa-calendar-alt me-1"></i>
//                             Placed on {new Date(order.createdAt).toLocaleDateString()}
//                         </small>
//                     </div>
//                     <div>
//                         {getStatusBadge(order.status)}
//                     </div>
//                 </Card.Header>
//                 <Card.Body>
//                     {/* Order Progress */}
//                     <div className="mb-4">
//                         <h5 className="mb-3">
//                             <i className="fa fa-truck me-2"></i> Order Progress
//                         </h5>
//                         <ProgressBar
//                             now={getProgressValue(order.status)}
//                             label={`${getProgressValue(order.status)}%`}
//                             variant={order.status === 'Delivered' ? 'success' : 'primary'}
//                             className="mb-2"
//                             style={{ height: '10px' }}
//                         />
//                         <div className="d-flex justify-content-between text-center">
//                             <div>
//                                 <i className={`fa fa-check-circle ${['Pending', 'Processing', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
//                                 <p className="mb-0 small">Order Placed</p>
//                             </div>
//                             <div>
//                                 <i className={`fa fa-check-circle ${['Processing', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
//                                 <p className="mb-0 small">Processing</p>
//                             </div>
//                             <div>
//                                 <i className={`fa fa-check-circle ${['Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
//                                 <p className="mb-0 small">Dispatched</p>
//                             </div>
//                             <div>
//                                 <i className={`fa fa-check-circle ${['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
//                                 <p className="mb-0 small">Shipped</p>
//                             </div>
//                             <div>
//                                 <i className={`fa fa-check-circle ${['Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
//                                 <p className="mb-0 small">Out for Delivery</p>
//                             </div>
//                             <div>
//                                 <i className={`fa fa-check-circle ${order.status === 'Delivered' ? 'text-success' : 'text-muted'}`}></i>
//                                 <p className="mb-0 small">Delivered</p>
//                             </div>
//                         </div>
//                     </div>

//                     <Row>
//                         {/* Order Items */}
//                         <Col md={8}>
//                             <Card className="mb-4 shadow-sm">
//                                 <Card.Header className="bg-white">
//                                     <h5 className="mb-0">
//                                         <i className="fa fa-boxes me-2"></i>
//                                         Order Items ({order.products.length})
//                                     </h5>
//                                 </Card.Header>
//                                 <Card.Body>
//                                     <Table hover responsive>
//                                         <thead>
//                                             <tr>
//                                                 <th>Item</th>
//                                                 <th>Price</th>
//                                                 <th>Qty</th>
//                                                 <th>Total</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {order?.products?.map((item, index) => (
//                                                 <tr key={index}>
//                                                     <td>
//                                                         <div className="d-flex align-items-center">
//                                                             <div className="me-3" style={{ width: '60px' }}>
//                                                                 <img
//                                                                     src={`${BASE_URL}${item.product?.images?.[0]?.url || '/placeholder-product.jpg'}`}
//                                                                     // src={item.product.images[0]?.url || '/placeholder-product.jpg'}
//                                                                     alt={item.product.name}
//                                                                     className="img-fluid rounded"
//                                                                 />
//                                                             </div>
//                                                             <div>
//                                                                 <h6 className="mb-1">{item.product.name}</h6>
//                                                                 <small className="text-muted">SKU: {item.product._id}</small>
//                                                             </div>
//                                                         </div>
//                                                     </td>
//                                                     <td>₹{item.priceAtOrder.toLocaleString('en-IN')}</td>
//                                                     <td>{item.quantity}</td>
//                                                     <td>₹{(item.priceAtOrder * item.quantity).toLocaleString('en-IN')}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </Table>
//                                 </Card.Body>
//                             </Card>
//                         </Col>

//                         {/* Order Summary */}
//                         <Col md={4}>
//                             <Card className="mb-4 shadow-sm">
//                                 <Card.Header className="bg-white">
//                                     <h5 className="mb-0">
//                                         <i className="fa fa-receipt me-2"></i>
//                                         Order Summary
//                                     </h5>
//                                 </Card.Header>
//                                 <Card.Body>
//                                     <ListGroup variant="flush">
//                                         <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                                             <span>Subtotal:</span>
//                                             <span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
//                                         </ListGroup.Item>
//                                         <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                                             <span>Shipping:</span>
//                                             <span>₹0.00</span>
//                                         </ListGroup.Item>
//                                         <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                                             <span>Tax:</span>
//                                             <span>₹0.00</span>
//                                         </ListGroup.Item>
//                                         {order.couponApplied && (
//                                             <ListGroup.Item className="d-flex justify-content-between align-items-center text-success">
//                                                 <span>
//                                                     <i className="fa fa-tag me-1"></i>
//                                                     Discount ({order.couponApplied.code}):
//                                                 </span>
//                                                 <span>-₹{order.couponApplied.discount.toLocaleString('en-IN')}</span>
//                                             </ListGroup.Item>
//                                         )}
//                                         <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold fs-5">
//                                             <span>Total:</span>
//                                             <span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
//                                         </ListGroup.Item>
//                                     </ListGroup>
//                                 </Card.Body>
//                             </Card>

//                             {/* Payment Information */}
//                             <Card className="mb-4 shadow-sm">
//                                 <Card.Header className="bg-white">
//                                     <h5 className="mb-0">
//                                         <i className="fa fa-credit-card me-2"></i>
//                                         Payment Information
//                                     </h5>
//                                 </Card.Header>
//                                 <Card.Body>
//                                     <ListGroup variant="flush">
//                                         <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                                             <span>Method:</span>
//                                             <span>
//                                                 <i className={`fa ${getPaymentIcon(order.paymentMethod)} me-2`}></i>
//                                                 {order.paymentMethod}
//                                             </span>
//                                         </ListGroup.Item>
//                                         <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                                             <span>Status:</span>
//                                             <Badge bg={order.paymentStatus === 'Completed' ? 'success' : 'warning'}>
//                                                 {order.paymentStatus}
//                                             </Badge>
//                                         </ListGroup.Item>
//                                         {order.transactionId && (
//                                             <ListGroup.Item>
//                                                 <div>Transaction ID:</div>
//                                                 <small className="text-muted">{order.transactionId}</small>
//                                             </ListGroup.Item>
//                                         )}
//                                     </ListGroup>
//                                 </Card.Body>
//                             </Card>

//                             {/* Customer Information */}
//                             <Card className="shadow-sm">
//                                 <Card.Header className="bg-white">
//                                     <h5 className="mb-0">
//                                         <i className="fa fa-user me-2"></i>
//                                         Customer Information
//                                     </h5>
//                                 </Card.Header>
//                                 <Card.Body>
//                                     <ListGroup variant="flush">
//                                         <ListGroup.Item>
//                                             <div className="fw-bold">{order?.user?.fullName}</div>
//                                             <div>
//                                                 <i className="fa fa-envelope me-2"></i>
//                                                 {order?.user?.email}
//                                             </div>
//                                             <div>
//                                                 <i className="fa fa-phone me-2"></i>
//                                                 {order?.user?.mobileNo}
//                                             </div>
//                                         </ListGroup.Item>
//                                         <ListGroup.Item>
//                                             <h6 className="mb-2">
//                                                 <i className="fa fa-truck me-2"></i>
//                                                 Shipping Address
//                                             </h6>
//                                             <div>{order.shippingAddress?.addressLine1}</div>
//                                             {order.shippingAddress?.addressLine2 && (
//                                                 <div>{order.shippingAddress.addressLine2}</div>
//                                             )}
//                                             <div>
//                                                 {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
//                                             </div>
//                                             <div>{order.shippingAddress?.country}</div>
//                                         </ListGroup.Item>
//                                     </ListGroup>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>

//                     {/* Order Actions */}
//                     <div className="mt-4 d-flex justify-content-end gap-2">
//                         <Button variant="outline-primary">
//                             <i className="fa fa-print me-2"></i> Print Invoice
//                         </Button>
//                         <Button variant="outline-secondary">
//                             <i className="fa fa-envelope me-2"></i> Email Invoice
//                         </Button>
//                         {order.status !== 'Cancelled' && order.status !== 'Refunded' && (
//                             <Button variant="outline-danger">
//                                 <i className="fa fa-times me-2"></i> Cancel Order
//                             </Button>
//                         )}
//                     </div>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default OrderDetail;

// // const OrderDetail = () => {
// //     return (
// //         <>

// //             <h1> ORder Details</h1>
// //         </>
// //     )
// // }

// // export default OrderDetail;

import React, { useRef } from 'react';
import {
    Container,
    Card,
    Row,
    Col,
    Badge,
    Table,
    Button,
    Alert,
    ListGroup,
    ProgressBar,
    Spinner
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../store/features/order/orderApi';
import BASE_URL from '../../../utils/imageConfig';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
    FaPrint,
    FaFilePdf,
    FaEnvelope,
    FaTimes,
    FaArrowLeft,
    FaBoxes,
    FaReceipt,
    FaCreditCard,
    FaUser,
    FaTruck,
    FaCalendarAlt,
    FaFileInvoice,
    FaTag,
    FaPhone,
    FaMapMarkerAlt,
    FaCheckCircle
} from 'react-icons/fa';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: order, isLoading, isError, error } = useGetOrderByIdQuery(id);
    const orderRef = useRef();

    // const handlePrint = useReactToPrint({
    //     content: () => orderRef.current,
    //     pageStyle: `
    //         @page {
    //             size: auto;
    //             margin: 10mm;
    //         }
    //         @media print {
    //             body {
    //                 padding: 20px;
    //                 background: white;
    //             }
    //             .no-print {
    //                 display: none !important;
    //             }
    //             .card {
    //                 box-shadow: none !important;
    //                 border: 1px solid #ddd !important;
    //             }
    //             .progress {
    //                 height: 10px !important;
    //             }
    //             .print-header {
    //                 display: block !important;
    //             }
    //         }
    //     `,
    //     documentTitle: `Order_${order?.orderId || id}`
    // });

    const handlePrint = useReactToPrint({
        documentTitle: `Invoice_${order?.orderId || "Order"}`,
        // content: () => invoiceRef.current,
        contentRef: orderRef,
    });

    const handleDownloadPDF = () => {
        const input = orderRef.current;
        html2canvas(input, {
            scale: 2,
            logging: false,
            useCORS: true,
            letterRendering: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
            pdf.save(`Order_${order?.orderId || id}.pdf`);
        });
    };

    const getStatusBadge = (status) => {
        const statusInfo = {
            Pending: { bg: 'warning', icon: 'fa-clock' },
            Processing: { bg: 'primary', icon: 'fa-cogs' },
            Dispatched: { bg: 'info', icon: 'fa-truck-loading' },
            Shipped: { bg: 'info', icon: 'fa-shipping-fast' },
            'Out for Delivery': { bg: 'primary', icon: 'fa-motorcycle' },
            Delivered: { bg: 'success', icon: 'fa-check-circle' },
            Cancelled: { bg: 'danger', icon: 'fa-times-circle' },
            Returned: { bg: 'danger', icon: 'fa-undo' },
            Refunded: { bg: 'secondary', icon: 'fa-money-bill-wave' }
        };

        const { bg, icon } = statusInfo[status] || { bg: 'dark', icon: 'fa-question-circle' };

        return (
            <Badge bg={bg} className="d-flex align-items-center fs-6 p-2">
                <i className={`fa ${icon} me-2`}></i>
                {status}
            </Badge>
        );
    };

    const getPaymentIcon = (method) => {
        const icons = {
            'Credit Card': 'fa-credit-card',
            'Debit Card': 'fa-credit-card',
            'PayPal': 'fa-paypal',
            'Bank Transfer': 'fa-university',
            'Cash on Delivery': 'fa-money-bill-wave'
        };
        return icons[method] || 'fa-money-check-alt';
    };

    const getProgressValue = (status) => {
        const statusOrder = [
            'Pending',
            'Processing',
            'Dispatched',
            'Shipped',
            'Out for Delivery',
            'Delivered'
        ];
        const index = statusOrder.indexOf(status);
        return index >= 0 ? Math.round((index / (statusOrder.length - 1)) * 100) : 0;
    };

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="text-center">
                    <Spinner animation="border" variant="primary" className="mb-3" />
                    <h4>Loading Order Details...</h4>
                </div>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <div className="d-flex align-items-center">
                        <i className="fa fa-exclamation-circle fa-2x me-3"></i>
                        <div>
                            <h4>Error Loading Order</h4>
                            <p className="mb-0">{error.data?.message || 'Failed to load order details'}</p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button variant="outline-danger" onClick={() => navigate(-1)}>
                            <FaArrowLeft className="me-2" /> Back to Orders
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    if (!order) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">
                    <div className="d-flex align-items-center">
                        <i className="fa fa-exclamation-triangle fa-2x me-3"></i>
                        <div>
                            <h4>Order Not Found</h4>
                            <p className="mb-0">The requested order could not be found.</p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button variant="outline-warning" onClick={() => navigate(-1)}>
                            <FaArrowLeft className="me-2" /> Back to Orders
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    return (
        <Container className="my-4" style={{ maxWidth: '1200px' }}>
            {/* Print Header (hidden by default) */}
            <div className="print-header d-none p-4 border-bottom mb-4">
                <Row className="align-items-center">
                    <Col md={6}>
                        <h2 className="text-primary mb-1">
                            <FaFileInvoice className="me-2" /> Order Invoice
                        </h2>
                        <p className="text-muted mb-0">Order #{order.orderId}</p>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <h4 className="mb-1">E-Commerce Store</h4>
                        <p className="text-muted mb-0">123 Business Street, City</p>
                        <p className="text-muted mb-0">GSTIN: 22ABCDE1234F1Z5</p>
                    </Col>
                </Row>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 no-print">
                <h2 className="mb-0">
                    <FaFileInvoice className="me-2 text-primary" />
                    Order Details
                </h2>
                <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                    <FaArrowLeft className="me-2" /> Back to Orders
                </Button>
            </div>

            <div ref={orderRef}>
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3 border-0">
                        <div>
                            <h5 className="mb-1">
                                Order ID: <span className="text-primary">{order.orderId}</span>
                            </h5>
                            <small className="text-muted">
                                <FaCalendarAlt className="me-1" />
                                {formatDate(order.createdAt)}
                            </small>
                        </div>
                        {/* <div>
                            {getStatusBadge(order.status)}
                        </div> */}
                    </Card.Header>
                    <Card.Body className="p-4">
                        {/* Order Progress */}
                        <div className="mb-4">
                            <h5 className="mb-3 d-flex align-items-center">
                                <FaTruck className="me-2 text-primary" /> Order Progress
                            </h5>
                            <ProgressBar
                                now={getProgressValue(order.status)}
                                label={`${getProgressValue(order.status)}%`}
                                variant={order.status === 'Delivered' ? 'success' : 'primary'}
                                className="mb-3"
                                style={{ height: '8px' }}
                            />
                            <div className="d-flex justify-content-between text-center">
                                {['Order Placed', 'Processing', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, index) => {
                                    const statusSteps = ['Pending', 'Processing', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'];
                                    const currentIndex = statusSteps.indexOf(order.status);
                                    const isCompleted = index <= currentIndex;

                                    return (
                                        <div key={index} className="position-relative" style={{ flex: 1 }}>
                                            <div className={`position-absolute top-0 start-50 translate-middle-x ${isCompleted ? 'text-primary' : 'text-muted'}`}>
                                                <FaCheckCircle className="fs-5" />
                                            </div>
                                            <p className="mt-3 mb-0 small text-muted">{step}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <Row>
                            {/* Order Items */}
                            <Col lg={8}>
                                <Card className="mb-4 border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0 py-3">
                                        <h5 className="mb-0 d-flex align-items-center">
                                            <FaBoxes className="me-2 text-primary" />
                                            Order Items ({order.products.length})
                                        </h5>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Table hover responsive className="mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="py-3 ps-4">Item</th>
                                                    <th className="py-3 text-end">Price</th>
                                                    <th className="py-3 text-center">Qty</th>
                                                    <th className="py-3 text-end pe-4">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order?.products?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="py-3 ps-4">
                                                            <div className="d-flex align-items-center">
                                                                <div className="me-3" style={{ width: '60px' }}>
                                                                    <img
                                                                        src={`${BASE_URL}${item.product?.images?.[0]?.url || '/placeholder-product.jpg'}`}
                                                                        alt={item.product.name}
                                                                        className="img-fluid rounded border"
                                                                        style={{ maxHeight: '60px', objectFit: 'cover' }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h6 className="mb-1">{item.product.name}</h6>
                                                                    <small className="text-muted">SKU: {item.product._id}</small>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 text-end align-middle">₹{item.priceAtOrder.toLocaleString('en-IN')}</td>
                                                        <td className="py-3 text-center align-middle">
                                                            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1">
                                                                {item.quantity}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-end align-middle pe-4">₹{(item.priceAtOrder * item.quantity).toLocaleString('en-IN')}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Order Summary */}
                            <Col lg={4}>
                                <Card className="mb-4 border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0 py-3">
                                        <h5 className="mb-0 d-flex align-items-center">
                                            <FaReceipt className="me-2 text-primary" />
                                            Order Summary
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                                                <span className="text-muted">Subtotal:</span>
                                                <span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                                                <span className="text-muted">Shipping:</span>
                                                <span>₹{order.shippingCost?.toLocaleString('en-IN') || '0.00'}</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                                                <span className="text-muted">Tax:</span>
                                                <span>₹{order.taxAmount?.toLocaleString('en-IN') || '0.00'}</span>
                                            </ListGroup.Item>
                                            {order.couponApplied && (
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 text-success">
                                                    <span className="text-muted">
                                                        <FaTag className="me-1" />
                                                        Discount ({order.couponApplied.code}):
                                                    </span>
                                                    <span>-₹{order.couponApplied.discount.toLocaleString('en-IN')}</span>
                                                </ListGroup.Item>
                                            )}
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 fw-bold border-top">
                                                <span>Total:</span>
                                                <span className="text-primary">
                                                    ₹{order.grandTotal?.toLocaleString('en-IN') || order.totalPrice.toLocaleString('en-IN')}
                                                </span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>

                                {/* Payment Information */}
                                {/* <Card className="mb-4 border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0 py-3">
                                        <h5 className="mb-0 d-flex align-items-center">
                                            <FaCreditCard className="me-2 text-primary" />
                                            Payment Information
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                                                <span className="text-muted">Method:</span>
                                                <span>
                                                    <i className={`fa ${getPaymentIcon(order.paymentMethod)} me-2`}></i>
                                                    {order.paymentMethod}
                                                </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                                                <span className="text-muted">Status:</span>
                                                <Badge bg={order.paymentStatus === 'Completed' ? 'success' : order.paymentStatus === 'Failed' ? 'danger' : 'warning'}>
                                                    {order.paymentStatus}
                                                </Badge>
                                            </ListGroup.Item>
                                            {order.transactionId && (
                                                <ListGroup.Item className="py-3">
                                                    <div className="text-muted mb-1">Transaction ID:</div>
                                                    <small className="text-muted">{order.transactionId}</small>
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Card.Body>
                                </Card> */}

                                {/* Employee Information */}
                                <Card className="mb-4 border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0 py-3">
                                        <h5 className="mb-0 d-flex align-items-center">
                                            <FaUser className="me-2 text-primary" />
                                            Employee Information
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="py-3">
                                                <div className="fw-bold mb-2">{order?.user?.fullName}</div>
                                                <div className="d-flex align-items-center mb-2 text-muted">
                                                    <FaEnvelope className="me-2" />
                                                    {order?.user?.email}
                                                </div>
                                                <div className="d-flex align-items-center text-muted">
                                                    <FaPhone className="me-2" />
                                                    {order?.user?.mobileNo}
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>

                                {/* Customer Information */}
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white border-0 py-3">
                                        <h5 className="mb-0 d-flex align-items-center">
                                            <FaUser className="me-2 text-primary" />
                                            Customer Information
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="py-3">
                                                <div className="fw-bold mb-2">{order?.customerId?.fullName}</div>
                                                <div className="d-flex align-items-center mb-2 text-muted">
                                                    <FaEnvelope className="me-2" />
                                                    {order?.customerId?.email}
                                                </div>
                                                <div className="d-flex align-items-center mb-3 text-muted">
                                                    <FaPhone className="me-2" />
                                                    {order?.customerId?.mobileNo}
                                                </div>
                                                <div>
                                                    <h6 className="d-flex align-items-center mb-2">
                                                        <FaMapMarkerAlt className="me-2 text-primary" />
                                                        Shipping Address
                                                    </h6>
                                                    <div className="text-muted">{order.customerId.address}</div>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>

            {/* Order Actions */}
            <div className="mt-4 d-flex justify-content-end gap-3 no-print">
                <Button variant="outline-primary" onClick={handlePrint} className="px-4">
                    <FaPrint className="me-2" /> Print Invoice
                </Button>
                <Button variant="primary" onClick={handleDownloadPDF} className="px-4">
                    <FaFilePdf className="me-2" /> Download PDF
                </Button>
                <Button variant="outline-secondary" className="px-4">
                    <FaEnvelope className="me-2" /> Email Invoice
                </Button>
                {order.status !== 'Cancelled' && order.status !== 'Refunded' && (
                    <Button variant="outline-danger" className="px-4">
                        <FaTimes className="me-2" /> Cancel Order
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default OrderDetail;