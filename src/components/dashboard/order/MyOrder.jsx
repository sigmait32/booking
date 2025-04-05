// import React, { useState } from 'react';
// import {
//     Container,
//     Card,
//     Row,
//     Col,
//     Button,
//     Badge,
//     Table,
//     ProgressBar,
//     Alert,
//     Form,
//     InputGroup,
//     Pagination
// } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './OrdersPage.css';

// const OrdersPage = () => {
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState('all');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [activePage, setActivePage] = useState(1);

//     // Sample order data
//     const orders = [
//         {
//             id: 'ORD-2023-0015',
//             date: '2023-11-15',
//             status: 'delivered',
//             items: 3,
//             total: 149.99,
//             deliveryDate: '2023-11-20',
//             trackingNumber: 'TRK123456789',
//             products: [
//                 { id: 1, name: 'Wireless Headphones', price: 89.99, quantity: 1, image: '/images/headphones.jpg' },
//                 { id: 2, name: 'Phone Case', price: 29.99, quantity: 2, image: '/images/case.jpg' }
//             ]
//         },
//         {
//             id: 'ORD-2023-0014',
//             date: '2023-11-10',
//             status: 'shipped',
//             items: 2,
//             total: 75.50,
//             deliveryDate: 'Estimated 2023-11-18',
//             trackingNumber: 'TRK987654321',
//             products: [
//                 { id: 3, name: 'Smart Watch', price: 75.50, quantity: 1, image: '/images/watch.jpg' }
//             ]
//         },
//         {
//             id: 'ORD-2023-0013',
//             date: '2023-11-05',
//             status: 'processing',
//             items: 1,
//             total: 45.00,
//             deliveryDate: 'Processing',
//             products: [
//                 { id: 4, name: 'Bluetooth Speaker', price: 45.00, quantity: 1, image: '/images/speaker.jpg' }
//             ]
//         }
//     ];

//     // Filter orders based on active tab and search term
//     const filteredOrders = orders.filter(order => {
//         const matchesTab = activeTab === 'all' || order.status === activeTab;
//         const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             order.status.toLowerCase().includes(searchTerm.toLowerCase());
//         return matchesTab && matchesSearch;
//     });

//     // Pagination
//     const itemsPerPage = 4;
//     const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
//     const paginatedOrders = filteredOrders.slice(
//         (activePage - 1) * itemsPerPage,
//         activePage * itemsPerPage
//     );

//     const getStatusBadge = (status) => {
//         const statusMap = {
//             delivered: { variant: 'success', text: 'Delivered', icon: 'fa-check-circle' },
//             shipped: { variant: 'primary', text: 'Shipped', icon: 'fa-truck' },
//             processing: { variant: 'warning', text: 'Processing', icon: 'fa-cog fa-spin' },
//             cancelled: { variant: 'danger', text: 'Cancelled', icon: 'fa-times-circle' }
//         };

//         const statusInfo = statusMap[status] || { variant: 'secondary', text: status, icon: 'fa-question-circle' };

//         return (
//             <Badge bg={statusInfo.variant} className="d-flex align-items-center gap-2">
//                 <i className={`fas ${statusInfo.icon}`}></i>
//                 {statusInfo.text}
//             </Badge>
//         );
//     };

//     const getProgress = (status) => {
//         const progressMap = {
//             processing: { now: 25, label: 'Order Received' },
//             shipped: { now: 65, label: 'On The Way' },
//             delivered: { now: 100, label: 'Delivered' },
//             cancelled: { now: 0, label: 'Cancelled' }
//         };
//         return progressMap[status] || { now: 0, label: 'Pending' };
//     };

//     const handleViewDetails = (orderId) => {
//         navigate(`/orders/${orderId}`);
//     };

//     return (
//         <Container className="my-5 orders-page">
//             <h2 className="mb-4 text-center fw-bold">My Orders</h2>

//             {/* Filter and Search Section */}
//             <Card className="mb-4 shadow-sm">
//                 <Card.Body>
//                     <Row className="align-items-center">
//                         <Col md={6}>
//                             <div className="d-flex flex-wrap gap-2 mb-3 mb-md-0">
//                                 <Button
//                                     variant={activeTab === 'all' ? 'primary' : 'outline-secondary'}
//                                     onClick={() => setActiveTab('all')}
//                                     size="sm"
//                                 >
//                                     All Orders
//                                 </Button>
//                                 <Button
//                                     variant={activeTab === 'processing' ? 'primary' : 'outline-secondary'}
//                                     onClick={() => setActiveTab('processing')}
//                                     size="sm"
//                                 >
//                                     Processing
//                                 </Button>
//                                 <Button
//                                     variant={activeTab === 'shipped' ? 'primary' : 'outline-secondary'}
//                                     onClick={() => setActiveTab('shipped')}
//                                     size="sm"
//                                 >
//                                     Shipped
//                                 </Button>
//                                 <Button
//                                     variant={activeTab === 'delivered' ? 'primary' : 'outline-secondary'}
//                                     onClick={() => setActiveTab('delivered')}
//                                     size="sm"
//                                 >
//                                     Delivered
//                                 </Button>
//                             </div>
//                         </Col>
//                         <Col md={6}>
//                             <InputGroup>
//                                 <InputGroup.Text>
//                                     <i className="fas fa-search"></i>
//                                 </InputGroup.Text>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Search orders..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </InputGroup>
//                         </Col>
//                     </Row>
//                 </Card.Body>
//             </Card>

//             {/* Orders List */}
//             {paginatedOrders.length === 0 ? (
//                 <Card className="text-center py-5 empty-orders">
//                     <Card.Body>
//                         <i className="fas fa-box-open fa-4x text-muted mb-3"></i>
//                         <h4>No orders found</h4>
//                         <p className="text-muted mb-4">You haven't placed any orders yet</p>
//                         <Button variant="primary" onClick={() => navigate('/products')}>
//                             Browse Products
//                         </Button>
//                     </Card.Body>
//                 </Card>
//             ) : (
//                 <>
//                     {paginatedOrders.map((order) => (
//                         <Card key={order.id} className="mb-4 order-card shadow-sm">
//                             <Card.Header className="d-flex justify-content-between align-items-center bg-light">
//                                 <div>
//                                     <span className="fw-bold me-2">Order #{order.id}</span>
//                                     <small className="text-muted">
//                                         <i className="far fa-calendar-alt me-1"></i>
//                                         {order.date}
//                                     </small>
//                                 </div>
//                                 {getStatusBadge(order.status)}
//                             </Card.Header>
//                             <Card.Body>
//                                 <Row>
//                                     <Col md={8}>
//                                         <div className="order-items">
//                                             {order.products.map((product) => (
//                                                 <div key={product.id} className="d-flex align-items-center mb-3">
//                                                     <div
//                                                         className="product-thumbnail me-3"
//                                                         style={{ backgroundImage: `url(${product.image})` }}
//                                                     ></div>
//                                                     <div className="flex-grow-1">
//                                                         <h6 className="mb-1">{product.name}</h6>
//                                                         <small className="text-muted">
//                                                             {product.quantity} × ${product.price.toFixed(2)}
//                                                         </small>
//                                                     </div>
//                                                     <div className="text-end">
//                                                         <small className="text-muted">${(product.price * product.quantity).toFixed(2)}</small>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </Col>
//                                     <Col md={4} className="mt-3 mt-md-0">
//                                         <div className="order-summary">
//                                             <div className="mb-3">
//                                                 <h6>Delivery Progress</h6>
//                                                 <ProgressBar
//                                                     now={getProgress(order.status).now}
//                                                     label={getProgress(order.status).label}
//                                                     variant={order.status === 'delivered' ? 'success' : 'primary'}
//                                                     className="mb-2"
//                                                 />
//                                                 <small className="text-muted">
//                                                     {order.status === 'shipped' ? (
//                                                         <>
//                                                             <i className="fas fa-truck me-1"></i>
//                                                             Tracking: {order.trackingNumber}
//                                                         </>
//                                                     ) : order.deliveryDate}
//                                                 </small>
//                                             </div>
//                                             <Table borderless size="sm">
//                                                 <tbody>
//                                                     <tr>
//                                                         <td>Items:</td>
//                                                         <td className="text-end">{order.items}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <td>Subtotal:</td>
//                                                         <td className="text-end">${order.total.toFixed(2)}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <td>Shipping:</td>
//                                                         <td className="text-end">$0.00</td>
//                                                     </tr>
//                                                     <tr className="fw-bold">
//                                                         <td>Total:</td>
//                                                         <td className="text-end">${order.total.toFixed(2)}</td>
//                                                     </tr>
//                                                 </tbody>
//                                             </Table>
//                                             <div className="d-flex gap-2">
//                                                 <Button
//                                                     variant="outline-primary"
//                                                     size="sm"
//                                                     onClick={() => handleViewDetails(order.id)}
//                                                 >
//                                                     <i className="fas fa-eye me-1"></i> View Details
//                                                 </Button>
//                                                 <Button variant="outline-success" size="sm">
//                                                     <i className="fas fa-file-invoice me-1"></i> Invoice
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </Card.Body>
//                         </Card>
//                     ))}

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                         <div className="d-flex justify-content-center mt-4">
//                             <Pagination>
//                                 <Pagination.Prev
//                                     onClick={() => setActivePage(p => Math.max(1, p - 1))}
//                                     disabled={activePage === 1}
//                                 />
//                                 {Array.from({ length: totalPages }).map((_, idx) => (
//                                     <Pagination.Item
//                                         key={idx + 1}
//                                         active={idx + 1 === activePage}
//                                         onClick={() => setActivePage(idx + 1)}
//                                     >
//                                         {idx + 1}
//                                     </Pagination.Item>
//                                 ))}
//                                 <Pagination.Next
//                                     onClick={() => setActivePage(p => Math.min(totalPages, p + 1))}
//                                     disabled={activePage === totalPages}
//                                 />
//                             </Pagination>
//                         </div>
//                     )}
//                 </>
//             )}

//             {/* Help Section */}
//             <Card className="mt-5 help-section">
//                 <Card.Body className="text-center py-4">
//                     <h5 className="mb-3">
//                         <i className="fas fa-question-circle me-2"></i>
//                         Need help with your orders?
//                     </h5>
//                     <Button variant="outline-secondary" className="me-2">
//                         <i className="fas fa-headset me-1"></i> Contact Support
//                     </Button>
//                     <Button variant="outline-primary">
//                         <i className="fas fa-info-circle me-1"></i> Order Help
//                     </Button>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default OrdersPage;





// import React, { useState, useEffect } from 'react';
// import {
//     Container, Card, Row, Col, Button, Badge, Pagination
// } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useGetEmployeeOrdersQuery } from '../../../store/features/order/orderApi';
// import { useSelector } from 'react-redux';

// const OrdersPage = () => {
//     const navigate = useNavigate();
//     const employee = useSelector(state => state.auth.employee);
//     const { data: employeeOrder, isLoading, error, refetch } = useGetEmployeeOrdersQuery();
//     const orders = employeeOrder?.orders || [];

//     // Local state for filtering and pagination
//     const [activeTab, setActiveTab] = useState('all');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [activePage, setActivePage] = useState(1);
//     const itemsPerPage = 10;

//     useEffect(() => {
//         if (employee) {
//             refetch();
//         }
//     }, [employee, refetch]);

//     // Get badge color based on order status
//     const getStatusBadgeColor = (status) => {
//         switch (status) {
//             case 'Pending':
//                 return 'secondary'; // Gray
//             case 'Processing':
//                 return 'info';     // Blue
//             case 'Dispatched':
//                 return 'primary';  // Darker blue
//             case 'Shipped':
//                 return 'warning';  // Yellow
//             case 'Out for Delivery':
//                 return 'success'; // Green
//             case 'Delivered':
//                 return 'success';  // Green
//             case 'Cancelled':
//                 return 'danger';   // Red
//             case 'Returned':
//                 return 'danger';   // Red
//             case 'Refunded':
//                 return 'dark';     // Black
//             default:
//                 return 'light';    // Default
//         }
//     };

//     // Filter orders based on active tab and search term
//     const filteredOrders = orders.filter(order => {
//         const matchesTab = activeTab === 'all' || order.status?.toLowerCase() === activeTab;
//         const matchesSearch = order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             order.status?.toLowerCase().includes(searchTerm.toLowerCase());
//         return matchesTab && matchesSearch;
//     });

//     // Pagination logic
//     const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
//     const paginatedOrders = filteredOrders.slice(
//         (activePage - 1) * itemsPerPage,
//         activePage * itemsPerPage
//     );

//     const handleViewDetails = (orderId) => {
//         navigate(`/orders/${orderId}`);
//     };

//     return (
//         <Container className="my-5">
//             <h2 className="text-center fw-bold">My Orders</h2>

//             {isLoading && <p>Loading orders...</p>}
//             {error && <p className="text-danger">Error fetching orders: {error.message}</p>}

//             {paginatedOrders.length === 0 && !isLoading ? (
//                 <Card className="text-center py-5">
//                     <Card.Body>
//                         <h4>No orders found</h4>
//                         <Button variant="primary" onClick={() => navigate('/products')}>Browse Products</Button>
//                     </Card.Body>
//                 </Card>
//             ) : (
//                 <>
//                     {paginatedOrders.map((order) => (
//                         <Card key={order._id} className="mb-4">
//                             <Card.Header className="d-flex justify-content-between bg-light">
//                                 <span className="fw-bold">Order #{order.orderId}</span>
//                                 <Badge bg={getStatusBadgeColor(order.status)}>
//                                     {order.status}
//                                 </Badge>
//                             </Card.Header>
//                             <Card.Body>
//                                 <Row>
//                                     <Col md={8}>
//                                         <h6>Customer: {order.customerId?.fullName || "N/A"}</h6>
//                                         <h6>Employee: {order.employeeId?.fullName || "N/A"}</h6>
//                                     </Col>
//                                     <Col md={4}>
//                                         <h6>Total: ₹{order.totalPrice}</h6>
//                                         <Button
//                                             variant="outline-primary"
//                                             className="mt-2"
//                                         // onClick={() => handleViewDetails(order._id)}
//                                         >
//                                             View Details
//                                         </Button>
//                                     </Col>
//                                 </Row>
//                             </Card.Body>
//                         </Card>
//                     ))}
//                 </>
//             )}

//             {totalPages > 1 && (
//                 <Pagination className="justify-content-center mt-4">
//                     {[...Array(totalPages)].map((_, index) => (
//                         <Pagination.Item
//                             key={index}
//                             active={index + 1 === activePage}
//                             onClick={() => setActivePage(index + 1)}
//                         >
//                             {index + 1}
//                         </Pagination.Item>
//                     ))}
//                 </Pagination>
//             )}
//         </Container>
//     );
// };

// export default OrdersPage;



import React, { useState, useEffect } from 'react';
import {
    Table,
    Container, Card, Row, Col, Button, Badge, Pagination,
    ProgressBar, InputGroup, Form, Spinner, Alert, Image
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGetEmployeeOrdersQuery } from '../../../store/features/order/orderApi';
import { useSelector } from 'react-redux';
import './OrdersPage.css';
import BASE_URL from '../../../utils/imageConfig';

const OrdersPage = () => {
    const navigate = useNavigate();
    const employee = useSelector(state => state.auth.employee);
    const { data: employeeOrder, isLoading, error, refetch } = useGetEmployeeOrdersQuery();
    const orders = employeeOrder?.orders || [];

    // State management
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (employee) refetch();
    }, [employee, refetch]);

    // Helper functions
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

    // Data processing
    const filteredOrders = orders.filter(order => {
        const matchesTab = activeTab === 'all' || order.status?.toLowerCase() === activeTab.toLowerCase();
        const matchesSearch =
            order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (order.customerId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.employeeId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesTab && matchesSearch;
    });

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );

    const handleViewDetails = (orderId) => navigate(`/dashboard/my-order-detail/${orderId}`);

    // Image component with error handling
    const ProductImage = ({ product }) => {
        const [imgError, setImgError] = useState(false);

        if (imgError || !product?.images?.[0]?.url) {
            return (
                <div className="product-thumbnail me-3 d-flex align-items-center justify-content-center">
                    <i className="fas fa-image text-muted"></i>
                </div>
            );
        }

        return (
            <Image
                src={`${BASE_URL}${product.images[0].url}`}
                alt={product.name}
                className="product-thumbnail me-3"
                onError={() => setImgError(true)}
                thumbnail
            />
        );
    };

    return (
        <Container className="my-5 orders-page">
            <h2 className="text-center fw-bold mb-4">Order Management</h2>

            {isLoading && (
                <div className="text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p>Loading orders...</p>
                </div>
            )}

            {error && (
                <Alert variant="danger" className="mb-4">
                    Error fetching orders: {error.message}
                </Alert>
            )}

            {/* Filter Section */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <div className="d-flex flex-wrap gap-2 mb-3 mb-md-0">
                                {['all', 'Pending', 'Dispatched', 'Out for Delivery', 'Delivered'].map((tab) => (
                                    <Button
                                        key={tab}
                                        variant={activeTab === tab ? 'primary' : 'outline-secondary'}
                                        onClick={() => setActiveTab(tab)}
                                        size="sm"
                                    >
                                        {tab === 'all' ? 'All Orders' : tab}
                                    </Button>
                                ))}
                            </div>
                        </Col>
                        <Col md={6}>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="fas fa-search"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Orders List */}
            {!isLoading && paginatedOrders.length === 0 ? (
                <Card className="text-center py-5 empty-orders">
                    <Card.Body>
                        <i className="fas fa-box-open fa-4x text-muted mb-3"></i>
                        <h4>No orders found</h4>
                        <p className="text-muted mb-4">No orders match your search criteria</p>
                    </Card.Body>
                </Card>
            ) : (
                <>
                    {paginatedOrders.map((order) => (
                        <Card key={order._id} className="mb-4 shadow-sm order-card">
                            <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                                <div>
                                    <span className="fw-bold me-2">Order #{order.orderId}</span>
                                    <small className="text-muted">
                                        <i className="far fa-calendar-alt me-1"></i>
                                        {formatDate(order.createdAt)}
                                    </small>
                                </div>
                                {getStatusBadge(order.status)}
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={8}>
                                        <div className="order-items">
                                            {order.products.map((item, index) => (
                                                <div key={index} className="d-flex align-items-center mb-3">
                                                    <ProductImage product={item.product} />
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-1">{item.product?.name || 'Product not available'}</h6>
                                                        <small className="text-muted">
                                                            {item.quantity} × ₹{item.priceAtOrder.toFixed(2)}
                                                        </small>
                                                    </div>
                                                    <div className="text-end">
                                                        <small className="text-muted">₹{(item.priceAtOrder * item.quantity).toFixed(2)}</small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                    <Col md={4} className="mt-3 mt-md-0">
                                        <div className="order-summary">
                                            <div className="mb-3">
                                                <h6>Delivery Progress</h6>
                                                <ProgressBar
                                                    now={getProgress(order.status).now}
                                                    label={getProgress(order.status).label}
                                                    variant={order.status === 'Delivered' ? 'success' :
                                                        order.status === 'Cancelled' || order.status === 'Returned' ? 'danger' : 'primary'}
                                                    className="mb-2"
                                                    animated={order.status === 'Processing'}
                                                />
                                            </div>
                                            <Table borderless size="sm">
                                                <tbody>
                                                    <tr>
                                                        <td>Customer:</td>
                                                        <td className="text-end">{order.customerId?.fullName || 'N/A'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Employee:</td>
                                                        <td className="text-end">{order.employeeId?.fullName || 'N/A'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Payment:</td>
                                                        <td className="text-end">
                                                            <Badge bg={order.paymentStatus === 'Paid' ? 'success' : 'warning'}>
                                                                {order.paymentMethod} ({order.paymentStatus})
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-top">
                                                        <td>Items:</td>
                                                        <td className="text-end">{order.products.length}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total:</td>
                                                        <td className="text-end">₹{order.totalPrice.toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <div className="d-flex gap-2 mt-3">
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => handleViewDetails(order._id)}
                                                >
                                                    <i className="fas fa-eye me-1"></i> View Details
                                                </Button>
                                                <Button variant="outline-success" size="sm">
                                                    <i className="fas fa-file-invoice me-1"></i> Invoice
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => setActivePage(p => Math.max(1, p - 1))}
                                    disabled={activePage === 1}
                                />
                                {Array.from({ length: totalPages }).map((_, idx) => (
                                    <Pagination.Item
                                        key={idx + 1}
                                        active={idx + 1 === activePage}
                                        onClick={() => setActivePage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => setActivePage(p => Math.min(totalPages, p + 1))}
                                    disabled={activePage === totalPages}
                                />
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default OrdersPage;