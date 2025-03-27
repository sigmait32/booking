import React from 'react';
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
    ProgressBar
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetOrderByIdQuery } from '../../../store/features/order/orderApi';
import BASE_URL from '../../../utils/imageConfig';
const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: order, isLoading, isError, error } = useGetOrderByIdQuery(id);

    console.log("order is =========>", order)

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
                    <div className="mb-3">
                        <i className="fa fa-spinner fa-spin fa-3x text-primary"></i>
                    </div>
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
                            <i className="fa fa-arrow-left me-2"></i> Back to Orders
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
                            <i className="fa fa-arrow-left me-2"></i> Back to Orders
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                    <i className="fa fa-file-invoice me-2 text-primary"></i>
                    Order Details
                </h2>
                <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                    <i className="fa fa-arrow-left me-2"></i> Back to Orders
                </Button>
            </div>

            <Card className="shadow-sm mb-4">
                <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
                    <div>
                        <h5 className="mb-1">
                            Order ID: <span className="text-primary">{order.orderId}</span>
                        </h5>
                        <small className="text-muted">
                            <i className="fa fa-calendar-alt me-1"></i>
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </small>
                    </div>
                    <div>
                        {getStatusBadge(order.status)}
                    </div>
                </Card.Header>
                <Card.Body>
                    {/* Order Progress */}
                    <div className="mb-4">
                        <h5 className="mb-3">
                            <i className="fa fa-truck me-2"></i> Order Progress
                        </h5>
                        <ProgressBar
                            now={getProgressValue(order.status)}
                            label={`${getProgressValue(order.status)}%`}
                            variant={order.status === 'Delivered' ? 'success' : 'primary'}
                            className="mb-2"
                            style={{ height: '10px' }}
                        />
                        <div className="d-flex justify-content-between text-center">
                            <div>
                                <i className={`fa fa-check-circle ${['Pending', 'Processing', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
                                <p className="mb-0 small">Order Placed</p>
                            </div>
                            <div>
                                <i className={`fa fa-check-circle ${['Processing', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
                                <p className="mb-0 small">Processing</p>
                            </div>
                            <div>
                                <i className={`fa fa-check-circle ${['Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
                                <p className="mb-0 small">Dispatched</p>
                            </div>
                            <div>
                                <i className={`fa fa-check-circle ${['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
                                <p className="mb-0 small">Shipped</p>
                            </div>
                            <div>
                                <i className={`fa fa-check-circle ${['Out for Delivery', 'Delivered'].includes(order.status) ? 'text-success' : 'text-muted'}`}></i>
                                <p className="mb-0 small">Out for Delivery</p>
                            </div>
                            <div>
                                <i className={`fa fa-check-circle ${order.status === 'Delivered' ? 'text-success' : 'text-muted'}`}></i>
                                <p className="mb-0 small">Delivered</p>
                            </div>
                        </div>
                    </div>

                    <Row>
                        {/* Order Items */}
                        <Col md={8}>
                            <Card className="mb-4 shadow-sm">
                                <Card.Header className="bg-white">
                                    <h5 className="mb-0">
                                        <i className="fa fa-boxes me-2"></i>
                                        Order Items ({order.products.length})
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <Table hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order?.products?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="me-3" style={{ width: '60px' }}>
                                                                <img
                                                                    src={`${BASE_URL}${item.product?.images?.[0]?.url || '/placeholder-product.jpg'}`}
                                                                    // src={item.product.images[0]?.url || '/placeholder-product.jpg'}
                                                                    alt={item.product.name}
                                                                    className="img-fluid rounded"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-1">{item.product.name}</h6>
                                                                <small className="text-muted">SKU: {item.product._id}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>₹{item.priceAtOrder.toLocaleString('en-IN')}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>₹{(item.priceAtOrder * item.quantity).toLocaleString('en-IN')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Order Summary */}
                        <Col md={4}>
                            <Card className="mb-4 shadow-sm">
                                <Card.Header className="bg-white">
                                    <h5 className="mb-0">
                                        <i className="fa fa-receipt me-2"></i>
                                        Order Summary
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <span>Subtotal:</span>
                                            <span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <span>Shipping:</span>
                                            <span>₹0.00</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <span>Tax:</span>
                                            <span>₹0.00</span>
                                        </ListGroup.Item>
                                        {order.couponApplied && (
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center text-success">
                                                <span>
                                                    <i className="fa fa-tag me-1"></i>
                                                    Discount ({order.couponApplied.code}):
                                                </span>
                                                <span>-₹{order.couponApplied.discount.toLocaleString('en-IN')}</span>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold fs-5">
                                            <span>Total:</span>
                                            <span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                            {/* Payment Information */}
                            <Card className="mb-4 shadow-sm">
                                <Card.Header className="bg-white">
                                    <h5 className="mb-0">
                                        <i className="fa fa-credit-card me-2"></i>
                                        Payment Information
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <span>Method:</span>
                                            <span>
                                                <i className={`fa ${getPaymentIcon(order.paymentMethod)} me-2`}></i>
                                                {order.paymentMethod}
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <span>Status:</span>
                                            <Badge bg={order.paymentStatus === 'Completed' ? 'success' : 'warning'}>
                                                {order.paymentStatus}
                                            </Badge>
                                        </ListGroup.Item>
                                        {order.transactionId && (
                                            <ListGroup.Item>
                                                <div>Transaction ID:</div>
                                                <small className="text-muted">{order.transactionId}</small>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                            {/* Customer Information */}
                            <Card className="shadow-sm">
                                <Card.Header className="bg-white">
                                    <h5 className="mb-0">
                                        <i className="fa fa-user me-2"></i>
                                        Customer Information
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className="fw-bold">{order?.user?.fullName}</div>
                                            <div>
                                                <i className="fa fa-envelope me-2"></i>
                                                {order?.user?.email}
                                            </div>
                                            <div>
                                                <i className="fa fa-phone me-2"></i>
                                                {order?.user?.mobileNo}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h6 className="mb-2">
                                                <i className="fa fa-truck me-2"></i>
                                                Shipping Address
                                            </h6>
                                            <div>{order.shippingAddress?.addressLine1}</div>
                                            {order.shippingAddress?.addressLine2 && (
                                                <div>{order.shippingAddress.addressLine2}</div>
                                            )}
                                            <div>
                                                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                                            </div>
                                            <div>{order.shippingAddress?.country}</div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Order Actions */}
                    <div className="mt-4 d-flex justify-content-end gap-2">
                        <Button variant="outline-primary">
                            <i className="fa fa-print me-2"></i> Print Invoice
                        </Button>
                        <Button variant="outline-secondary">
                            <i className="fa fa-envelope me-2"></i> Email Invoice
                        </Button>
                        {order.status !== 'Cancelled' && order.status !== 'Refunded' && (
                            <Button variant="outline-danger">
                                <i className="fa fa-times me-2"></i> Cancel Order
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderDetail;

// const OrderDetail = () => {
//     return (
//         <>

//             <h1> ORder Details</h1>
//         </>
//     )
// }

// export default OrderDetail;