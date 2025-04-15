import React from 'react';
import {
    Container, Card, Row, Col, Button, Badge, Table,
    ProgressBar, Alert, Spinner, ListGroup
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
// import { useGetOrderDetailsQuery } from '../../../store/features/order/orderApi';
import { useGetEmpOrderDtlByIdQuery } from '../../../store/features/order/orderApi';
import { useSelector } from 'react-redux';
import BASE_URL from '../../../utils/imageConfig';
import './OrderDetailPage.css';

const MyOrderDetail = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const employee = useSelector(state => state.auth.employee);
    const { data: order, isLoading, error, refetch } = useGetEmpOrderDtlByIdQuery(id);

    // Reuse the same helper functions from OrdersPage for consistency
    const getStatusBadge = (status) => {
        const statusMap = {
            'Pending': { variant: 'secondary', text: 'Pending', icon: 'fa-clock' },
            'Processing': { variant: 'info', text: 'Processing', icon: 'fa-cog fa-spin' },
            'Dispatched': { variant: 'primary', text: 'Dispatched', icon: 'fa-box' },
            'Shipped': { variant: 'warning', text: 'Shipped', icon: 'fa-shipping-fast' },
            'Out for Delivery': { variant: 'success', text: 'Out for Delivery', icon: 'fa-truck' },
            'Delivered': { variant: 'success', text: 'Delivered', icon: 'fa-check-circle' },
            'Cancelled': { variant: 'danger', text: 'Cancelled', icon: 'fa-times-circle' },
            'Returned': { variant: 'danger', text: 'Returned', icon: 'fa-undo' },
            'Refunded': { variant: 'dark', text: 'Refunded', icon: 'fa-money-bill-wave' }
        };
        const statusInfo = statusMap[status] || { variant: 'light', text: status, icon: 'fa-question-circle' };
        return (
            <Badge bg={statusInfo.variant} className="d-flex align-items-center gap-2">
                <i className={`fas ${statusInfo.icon}`}></i>
                {statusInfo.text}
            </Badge>
        );
    };

    const getProgress = (status) => {
        const progressMap = {
            'Pending': { now: 10, label: 'Order Received' },
            'Processing': { now: 30, label: 'Processing' },
            'Dispatched': { now: 50, label: 'Dispatched' },
            'Shipped': { now: 70, label: 'Shipped' },
            'Out for Delivery': { now: 90, label: 'Out for Delivery' },
            'Delivered': { now: 100, label: 'Delivered' },
            'Cancelled': { now: 0, label: 'Cancelled' },
            'Returned': { now: 0, label: 'Returned' },
            'Refunded': { now: 0, label: 'Refunded' }
        };
        return progressMap[status] || { now: 0, label: 'Pending' };
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const ProductImage = ({ product }) => {
        const [imgError, setImgError] = React.useState(false);

        if (imgError || !product?.images?.[0]?.url) {
            return (
                <div className="product-thumbnail-lg d-flex align-items-center justify-content-center">
                    <i className="fas fa-image fa-2x text-muted"></i>
                </div>
            );
        }

        return (
            <img
                src={`${BASE_URL}${product.images[0].url}`}
                alt={product.name}
                className="product-thumbnail-lg"
                onError={() => setImgError(true)}
            />
        );
    };

    if (isLoading) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading order details...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">
                    Error loading order: {error.message}
                </Alert>
                <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
            </Container>
        );
    }

    if (!order) {
        return (
            <Container className="my-5">
                <Alert variant="warning">
                    Order not found
                </Alert>
                <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
            </Container>
        );
    }

    return (
        <Container className="my-5 order-detail-page">
            <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                className="mb-4"
            >
                <i className="fas fa-arrow-left me-2"></i> Back to Orders
            </Button>

            <Card className="mb-4 shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                    <h4 className="mb-0">Order #{order.orderId}</h4>
                    {getStatusBadge(order.status)}
                </Card.Header>
                <Card.Body>
                    <Row className="mb-4">
                        <Col md={6}>
                            <h5>Delivery Progress</h5>
                            <ProgressBar
                                now={getProgress(order.status).now}
                                label={getProgress(order.status).label}
                                variant={order.status === 'Delivered' ? 'success' :
                                    order.status === 'Cancelled' || order.status === 'Returned' ? 'danger' : 'primary'}
                                className="mb-3"
                                animated={order.status === 'Processing'}
                            />

                            {order.trackingNumber && (
                                <div className="tracking-info mb-3">
                                    <h6>Tracking Information</h6>
                                    <p className="mb-1">
                                        <strong>Tracking #:</strong> {order.trackingNumber}
                                    </p>
                                    {order.estimatedDelivery && (
                                        <p className="mb-1">
                                            <strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}
                                        </p>
                                    )}
                                    <Button variant="outline-primary" size="sm" className="mt-2">
                                        <i className="fas fa-truck me-1"></i> Track Package
                                    </Button>
                                </div>
                            )}
                        </Col>
                        <Col md={6}>
                            <h5>Order Summary</h5>
                            <Table borderless size="sm" className="order-summary">
                                <tbody>
                                    <tr>
                                        <td>Order Date:</td>
                                        <td className="text-end">{formatDate(order.createdAt)}</td>
                                    </tr>
                                    <tr>
                                        <td>Status Updated:</td>
                                        <td className="text-end">{formatDate(order.updatedAt)}</td>
                                    </tr>
                                    <tr>
                                        <td>Customer:</td>
                                        <td className="text-end">{order.customerId?.fullName || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Employee:</td>
                                        <td className="text-end">{order.employeeId?.fullName || 'N/A'}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>Payment:</td>
                                        <td className="text-end">
                                            <Badge bg={order.paymentStatus === 'Paid' ? 'success' : 'warning'}>
                                                {order.paymentMethod} ({order.paymentStatus})
                                            </Badge>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Card className="mb-4">
                                <Card.Header className="bg-light">
                                    <h5>Shipping Address</h5>
                                </Card.Header>
                                <Card.Body>
                                    <address>
                                        <strong>{order.customerId?.fullName || 'N/A'}</strong><br />
                                        {order.address || 'No address provided'}
                                    </address>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="mb-4">
                                <Card.Header className="bg-light">
                                    <h5>Billing Information</h5>
                                </Card.Header>
                                <Card.Body>
                                    <p>
                                        <strong>Payment Method:</strong> {order.paymentMethod}<br />
                                        <strong>Status:</strong>
                                        {/* <Badge bg={order.paymentStatus === 'Paid' ? 'success' : 'warning'}>
                                            {order.paymentStatus}
                                        </Badge> */}
                                    </p>
                                    {order.transactionId && (
                                        <p>
                                            <strong>Transaction ID:</strong> {order.transactionId}
                                        </p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <h5 className="mb-3">Order Items</h5>
                    <Table responsive className="order-items">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}></th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <ProductImage product={item.product} />
                                    </td>
                                    <td>
                                        <div className="product-info">
                                            <h6>{item.product?.name || 'Product not available'}</h6>
                                            {item.product?.description && (
                                                <small className="text-muted">{item.product.description}</small>
                                            )}
                                        </div>
                                    </td>
                                    <td>₹{item.priceAtOrder.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{(item.priceAtOrder * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Row className="mt-4">
                        <Col md={{ span: 4, offset: 8 }}>
                            <Table borderless>
                                <tbody>
                                    <tr>
                                        <td><strong>Subtotal:</strong></td>
                                        <td className="text-end">₹{order.totalPrice?.toFixed(2) || '0.00'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Discount:</strong></td>
                                        <td className="text-end">₹{order.discount?.toFixed(2) || '0.00'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Shipping:</strong></td>
                                        <td className="text-end">₹{order.shipping?.toFixed(2) || '0.00'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Tax:</strong></td>
                                        <td className="text-end">₹{order.tax?.toFixed(2) || '0.00'}</td>
                                    </tr>
                                    <tr className="fw-bold fs-5 border-top">
                                        <td><strong>Total:</strong></td>
                                        <td className="text-end">₹{order.totalAfterDiscount?.toFixed(2) || '0.00'}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
                {/* <Card.Footer className="d-flex justify-content-between bg-light">
                    <Button variant="outline-primary">
                        <i className="fas fa-print me-2"></i> Print Invoice
                    </Button>
                    <div>
                        {['Processing', 'Dispatched', 'Shipped'].includes(order.status) && (
                            <Button variant="warning" className="me-2">
                                <i className="fas fa-edit me-1"></i> Update Status
                            </Button>
                        )}
                        <Button variant="primary">
                            <i className="fas fa-headset me-1"></i> Contact Support
                        </Button>
                    </div>
                </Card.Footer> */}
            </Card>

            {/* Order History Timeline */}
            {order.statusHistory?.length > 0 && (
                <Card className="mb-4">
                    <Card.Header className="bg-light">
                        <h5>Order History</h5>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {order.statusHistory.map((history, index) => (
                                <ListGroup.Item key={index}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <strong>{history.status}</strong>
                                            <div className="text-muted small">
                                                {history.note || 'Status updated'}
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <div>{formatDate(history.date)}</div>
                                            <div className="text-muted small">
                                                by {history.changedBy || 'System'}
                                            </div>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default MyOrderDetail;