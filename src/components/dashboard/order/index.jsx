


// import React, { useState } from 'react';
// import {
//     Table,
//     Button,
//     Badge,
//     Dropdown,
//     Form,
//     Container,
//     Card,
//     InputGroup,
//     Pagination,
//     Alert,
//     Spinner,
//     Modal
// } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import {
//     useGetOrdersQuery,
//     useUpdateOrderStatusMutation
// } from '../../../store/features/order/orderApi';

// const OrderList = () => {
//     const navigate = useNavigate();
//     // State management
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [statusFilter, setStatusFilter] = useState('');
//     const [showAlert, setShowAlert] = useState(false);
//     const [alertMessage, setAlertMessage] = useState({ text: '', variant: 'success' });
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [newStatus, setNewStatus] = useState('');
//     const itemsPerPage = 5;

//     // RTK Query hooks
//     const {
//         data: ordersData,
//         isLoading,
//         isError,
//         error,
//         refetch
//     } = useGetOrdersQuery({
//         page: currentPage,
//         limit: itemsPerPage,
//         status: statusFilter,
//         search: searchTerm
//     });

//     const [updateStatus] = useUpdateOrderStatusMutation();

//     // Derived data - adjust based on your API response structure
//     const orders = ordersData || [];
//     const totalPages = ordersData?.pagination?.totalPages || 1;
//     const totalOrders = ordersData?.pagination?.totalCount || 0;

//     // Enhanced status options with workflow progression
//     const statusOptions = [
//         { value: 'Pending', icon: 'fa-clock', color: 'warning' },
//         { value: 'Processing', icon: 'fa-cogs', color: 'primary' },
//         { value: 'Dispatched', icon: 'fa-truck-loading', color: 'info' },
//         { value: 'Shipped', icon: 'fa-shipping-fast', color: 'info' },
//         { value: 'Out for Delivery', icon: 'fa-motorcycle', color: 'primary' },
//         { value: 'Delivered', icon: 'fa-check-circle', color: 'success' },
//         { value: 'Cancelled', icon: 'fa-times-circle', color: 'danger' },
//         { value: 'Returned', icon: 'fa-undo', color: 'danger' },
//         { value: 'Refunded', icon: 'fa-money-bill-wave', color: 'secondary' }
//     ];

//     // Status change handler with confirmation
//     const handleStatusChange = (orderId, status) => {
//         setSelectedOrder(orderId);
//         setNewStatus(status);
//         setShowConfirmModal(true);
//     };

//     const confirmStatusChange = async () => {
//         try {
//             await updateStatus({ id: selectedOrder, status: newStatus }).unwrap();
//             setAlertMessage({
//                 text: `Order #${selectedOrder} status updated to ${newStatus}`,
//                 variant: 'success'
//             });
//             refetch();
//         } catch (err) {
//             setAlertMessage({
//                 text: `Failed to update order status: ${err.data?.message || 'Please try again'}`,
//                 variant: 'danger'
//             });
//         } finally {
//             setShowConfirmModal(false);
//             setShowAlert(true);
//             setTimeout(() => setShowAlert(false), 5000);
//         }
//     };

//     const getStatusBadge = (status) => {
//         const statusInfo = statusOptions.find(opt => opt.value === status) ||
//             { icon: 'fa-question-circle', color: 'dark' };

//         return (
//             <Badge bg={statusInfo.color} className="d-flex align-items-center">
//                 <i className={`fa ${statusInfo.icon} me-1`}></i>
//                 {status}
//             </Badge>
//         );
//     };

//     const getPaymentIcon = (method) => {
//         const icons = {
//             'Credit Card': 'fa-credit-card',
//             'PayPal': 'fa-paypal',
//             'Bank Transfer': 'fa-university',
//             'Cash on Delivery': 'fa-money-bill-wave'
//         };
//         return icons[method] || 'fa-money-check-alt';
//     };

//     // Loading and error states
//     if (isLoading) {
//         return (
//             <Container className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
//                 <Spinner animation="border" variant="primary" />
//                 <span className="ms-3">Loading orders...</span>
//             </Container>
//         );
//     }

//     if (isError) {
//         return (
//             <Container className="mt-5">
//                 <Alert variant="danger">
//                     <h5>Error loading orders</h5>
//                     <p>{error.data?.message || 'Failed to fetch orders. Please try again.'}</p>
//                     <Button variant="outline-danger" onClick={refetch}>
//                         <i className="fa fa-sync-alt me-1"></i> Retry
//                     </Button>
//                 </Alert>
//             </Container>
//         );
//     }

//     return (
//         <Container className="mt-4 admin-order-list">
//             {/* Alert Notification */}
//             {showAlert && (
//                 <Alert
//                     variant={alertMessage.variant}
//                     onClose={() => setShowAlert(false)}
//                     dismissible
//                     className="mt-3"
//                 >
//                     {alertMessage.text}
//                 </Alert>
//             )}

//             {/* Confirmation Modal */}
//             <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>
//                         <i className="fa fa-exclamation-circle me-2 text-warning"></i>
//                         Confirm Status Change
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to change the status of order #{selectedOrder} to {newStatus}?
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
//                         <i className="fa fa-times me-1"></i> Cancel
//                     </Button>
//                     <Button variant="primary" onClick={confirmStatusChange}>
//                         <i className="fa fa-check me-1"></i> Confirm
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Main Card */}
//             <Card className="shadow-sm border-0">
//                 <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center py-3">
//                     <h4 className="mb-0">
//                         <i className="fa fa-shopping-bag me-2 text-primary"></i>
//                         Order Management
//                     </h4>
//                     <div className="d-flex gap-2">
//                         <Button variant="outline-primary" size="sm">
//                             <i className="fa fa-file-export me-1"></i> Export
//                         </Button>
//                     </div>
//                 </Card.Header>

//                 <Card.Body>
//                     {/* Search and Filter Section */}
//                     <div className="d-flex justify-content-between flex-wrap mb-4 gap-3">
//                         <InputGroup style={{ minWidth: '300px', flex: 1 }}>
//                             <InputGroup.Text>
//                                 <i className="fa fa-search"></i>
//                             </InputGroup.Text>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Search by order ID, customer, or status..."
//                                 value={searchTerm}
//                                 onChange={(e) => {
//                                     setSearchTerm(e.target.value);
//                                     setCurrentPage(1);
//                                 }}
//                             />
//                         </InputGroup>

//                         <Dropdown>
//                             <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter">
//                                 <i className="fa fa-filter me-1"></i>
//                                 {statusFilter ? `Status: ${statusFilter}` : 'Filter by Status'}
//                             </Dropdown.Toggle>
//                             <Dropdown.Menu>
//                                 <Dropdown.Item onClick={() => {
//                                     setStatusFilter('');
//                                     setCurrentPage(1);
//                                 }}>
//                                     <i className="fa fa-list me-2"></i> All Orders
//                                 </Dropdown.Item>
//                                 {statusOptions.map(status => (
//                                     <Dropdown.Item
//                                         key={status.value}
//                                         onClick={() => {
//                                             setStatusFilter(status.value);
//                                             setCurrentPage(1);
//                                         }}
//                                     >
//                                         <i className={`fa ${status.icon} me-2 text-${status.color}`}></i>
//                                         {status.value}
//                                     </Dropdown.Item>
//                                 ))}
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </div>

//                     {/* Orders Table */}
//                     <div className="table-responsive">
//                         <Table hover className="mb-0">
//                             <thead className="table-light">
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Order ID</th>
//                                     <th>Date</th>
//                                     {/* <th>Customer</th>

//                                     <th>Payment</th>
//                                     */}
//                                     <th>Amount</th>
//                                     <th>Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {orders.length > 0 ? (
//                                     orders.map((order, index) => (
//                                         <tr key={order._id}>
//                                             <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                                             <td>
//                                                 <Button
//                                                     variant="link"
//                                                     className="text-primary p-0 text-decoration-none"
//                                                     onClick={() => navigate(`/dashboard/orders-detail/${order._id}`)}
//                                                 >
//                                                     {order.orderId}
//                                                 </Button>
//                                             </td>
//                                             {/* <td>
//                                                 <div className="d-flex flex-column">
//                                                     <strong>{order.user?.fullName}</strong>

//                                                 </div>
//                                             </td> */}
//                                             <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                                             {/* <td>
//                                                 <i className={`fa ${getPaymentIcon(order.paymentMethod)} me-1`}></i>
//                                                 {order.paymentMethod}
//                                             </td> */}
//                                             <td>${order.totalPrice?.toFixed(2)}</td>
//                                             <td>{getStatusBadge(order.status)}</td>
//                                             <td>
//                                                 <div className="d-flex gap-2">
//                                                     <Button
//                                                         variant="outline-primary"
//                                                         size="sm"
//                                                         title="View Details"
//                                                         onClick={() => navigate(`/dashboard/order-details/${order._id}`)}
//                                                     >
//                                                         <i className="fa fa-eye"></i>
//                                                     </Button>
//                                                     <Dropdown>
//                                                         <Dropdown.Toggle
//                                                             variant="outline-secondary"
//                                                             size="sm"
//                                                             id={`dropdown-status-${order._id}`}
//                                                             title="Change Status"
//                                                             disabled={['Cancelled', 'Refunded'].includes(order.status)}
//                                                         >
//                                                             <i className="fa fa-edit"></i>
//                                                         </Dropdown.Toggle>
//                                                         <Dropdown.Menu>
//                                                             {statusOptions.map(status => (
//                                                                 <Dropdown.Item
//                                                                     key={status.value}
//                                                                     onClick={() => handleStatusChange(order._id, status.value)}
//                                                                     disabled={order.status === status.value}
//                                                                 >
//                                                                     <i className={`fa ${status.icon} me-2 text-${status.color}`}></i>
//                                                                     Mark as {status.value}
//                                                                 </Dropdown.Item>
//                                                             ))}
//                                                         </Dropdown.Menu>
//                                                     </Dropdown>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8" className="text-center py-4">
//                                             <i className="fa fa-box-open fa-3x text-muted mb-3"></i>
//                                             <h5>No orders found</h5>
//                                             <p className="text-muted">Try adjusting your search or filter</p>
//                                             <Button
//                                                 variant="outline-primary"
//                                                 onClick={() => {
//                                                     setSearchTerm('');
//                                                     setStatusFilter('');
//                                                     setCurrentPage(1);
//                                                 }}
//                                             >
//                                                 <i className="fa fa-times me-1"></i> Clear filters
//                                             </Button>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </Table>
//                     </div>

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                         <div className="d-flex justify-content-between align-items-center mt-4">
//                             <div className="text-muted">
//                                 Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
//                                 {Math.min(currentPage * itemsPerPage, totalOrders)} of{' '}
//                                 {totalOrders} orders
//                             </div>
//                             <Pagination className="mb-0">
//                                 <Pagination.Prev
//                                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                                     disabled={currentPage === 1}
//                                 >
//                                     <i className="fa fa-chevron-left"></i>
//                                 </Pagination.Prev>
//                                 {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
//                                     let pageNum;
//                                     if (totalPages <= 5) {
//                                         pageNum = idx + 1;
//                                     } else if (currentPage <= 3) {
//                                         pageNum = idx + 1;
//                                     } else if (currentPage >= totalPages - 2) {
//                                         pageNum = totalPages - 4 + idx;
//                                     } else {
//                                         pageNum = currentPage - 2 + idx;
//                                     }
//                                     return (
//                                         <Pagination.Item
//                                             key={pageNum}
//                                             active={pageNum === currentPage}
//                                             onClick={() => setCurrentPage(pageNum)}
//                                         >
//                                             {pageNum}
//                                         </Pagination.Item>
//                                     );
//                                 })}
//                                 <Pagination.Next
//                                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                                     disabled={currentPage === totalPages}
//                                 >
//                                     <i className="fa fa-chevron-right"></i>
//                                 </Pagination.Next>
//                             </Pagination>
//                         </div>
//                     )}
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default OrderList;


import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Badge,
    Dropdown,
    Form,
    Container,
    Card,
    InputGroup,
    Pagination,
    Alert,
    Spinner,
    Modal
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
    useGetOrdersQuery,
    useUpdateOrderStatusMutation
} from '../../../store/features/order/orderApi';

const OrderList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ text: '', variant: 'success' });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const itemsPerPage = 5;

    // RTK Query hooks
    const {
        data: ordersData,
        isLoading,
        isError,
        error,
        refetch
    } = useGetOrdersQuery({
        page: currentPage,
        limit: itemsPerPage,
        status: statusFilter || undefined,
        search: searchTerm || undefined
    });

    const [updateStatus] = useUpdateOrderStatusMutation();

    // Client-side filtering if API doesn't handle it
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [totalFilteredOrders, setTotalFilteredOrders] = useState(0);

    useEffect(() => {
        if (ordersData) {
            let result = [...ordersData];

            // Apply status filter if needed
            if (statusFilter) {
                result = result.filter(order => order.status === statusFilter);
            }

            // Apply search if needed
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                result = result.filter(order =>
                    order.orderId.toLowerCase().includes(term) ||
                    (order.user?.fullName?.toLowerCase().includes(term) ?? false)
                );
            }

            setFilteredOrders(result);
            setTotalFilteredOrders(result.length);
        }
    }, [ordersData, statusFilter, searchTerm]);

    const orders = filteredOrders;
    const totalOrders = ordersData?.length || 0; // Adjust based on your API response
    const totalPages = Math.ceil(totalOrders / itemsPerPage);

    const statusOptions = [
        { value: 'Pending', icon: 'fa-clock', color: 'warning' },
        { value: 'Processing', icon: 'fa-cogs', color: 'primary' },
        { value: 'Dispatched', icon: 'fa-truck-loading', color: 'info' },
        { value: 'Shipped', icon: 'fa-shipping-fast', color: 'info' },
        { value: 'Out for Delivery', icon: 'fa-motorcycle', color: 'primary' },
        { value: 'Delivered', icon: 'fa-check-circle', color: 'success' },
        { value: 'Cancelled', icon: 'fa-times-circle', color: 'danger' },
        { value: 'Returned', icon: 'fa-undo', color: 'danger' },
        { value: 'Refunded', icon: 'fa-money-bill-wave', color: 'secondary' }
    ];

    const handleStatusChange = (orderId, status) => {
        setSelectedOrder(orderId);
        setNewStatus(status);
        setShowConfirmModal(true);
    };

    const confirmStatusChange = async () => {
        try {
            await updateStatus({ id: selectedOrder, status: newStatus }).unwrap();
            setAlertMessage({
                text: `Order #${selectedOrder} status updated to ${newStatus}`,
                variant: 'success'
            });
            refetch();
        } catch (err) {
            setAlertMessage({
                text: `Failed to update order status: ${err.data?.message || 'Please try again'}`,
                variant: 'danger'
            });
        } finally {
            setShowConfirmModal(false);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    };

    const getStatusBadge = (status) => {
        const statusInfo = statusOptions.find(opt => opt.value === status) ||
            { icon: 'fa-question-circle', color: 'dark' };

        return (
            <Badge bg={statusInfo.color} className="d-flex align-items-center">
                <i className={`fa ${statusInfo.icon} me-1`}></i>
                {status}
            </Badge>
        );
    };

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-3">Loading orders...</span>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <h5>Error loading orders</h5>
                    <p>{error.data?.message || 'Failed to fetch orders. Please try again.'}</p>
                    <Button variant="outline-danger" onClick={refetch}>
                        <i className="fa fa-sync-alt me-1"></i> Retry
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4 admin-order-list">
            {showAlert && (
                <Alert variant={alertMessage.variant} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage.text}
                </Alert>
            )}

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fa fa-exclamation-circle me-2 text-warning"></i>
                        Confirm Status Change
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to change the status of order #{selectedOrder} to {newStatus}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmStatusChange}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center py-3">
                    <h4 className="mb-0">
                        <i className="fa fa-shopping-bag me-2 text-primary"></i>
                        Order Management
                    </h4>
                    <Button variant="outline-primary" size="sm">
                        <i className="fa fa-file-export me-1"></i> Export
                    </Button>
                </Card.Header>

                <Card.Body>
                    <div className="d-flex justify-content-between flex-wrap mb-4 gap-3">
                        <InputGroup style={{ minWidth: '300px', flex: 1 }}>
                            <InputGroup.Text>
                                <i className="fa fa-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search by order ID or customer..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </InputGroup>

                        <Dropdown>
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter">
                                <i className="fa fa-filter me-1"></i>
                                {statusFilter || 'Filter by Status'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                    setStatusFilter('');
                                    setCurrentPage(1);
                                }}>
                                    All Orders
                                </Dropdown.Item>
                                {statusOptions.map(status => (
                                    <Dropdown.Item
                                        key={status.value}
                                        onClick={() => {
                                            setStatusFilter(status.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        {status.value}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="table-responsive">
                        <Table hover className="mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>
                                                <Button
                                                    variant="link"
                                                    className="text-primary p-0 text-decoration-none"
                                                    onClick={() => navigate(`/dashboard/orders-detail/${order._id}`)}
                                                >
                                                    {order.orderId}
                                                </Button>
                                            </td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td>${order.totalPrice?.toFixed(2)}</td>
                                            <td>{getStatusBadge(order.status)}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => navigate(`/dashboard/order-details/${order._id}`)}
                                                    >
                                                        <i className="fa fa-eye"></i>
                                                    </Button>
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            disabled={['Cancelled', 'Refunded'].includes(order.status)}
                                                        >
                                                            <i className="fa fa-edit"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {statusOptions.map(status => (
                                                                <Dropdown.Item
                                                                    key={status.value}
                                                                    onClick={() => handleStatusChange(order._id, status.value)}
                                                                    disabled={order.status === status.value}
                                                                >
                                                                    Mark as {status.value}
                                                                </Dropdown.Item>
                                                            ))}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            <i className="fa fa-box-open fa-3x text-muted mb-3"></i>
                                            <h5>No orders found</h5>
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    setStatusFilter('');
                                                    setCurrentPage(1);
                                                }}
                                            >
                                                Clear filters
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <div className="text-muted">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                                {Math.min(currentPage * itemsPerPage, totalOrders)} of{' '}
                                {totalOrders} orders
                            </div>
                            <Pagination className="mb-0">
                                <Pagination.Prev
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                />
                                {Array.from({ length: totalPages }).map((_, idx) => (
                                    <Pagination.Item
                                        key={idx + 1}
                                        active={idx + 1 === currentPage}
                                        onClick={() => setCurrentPage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                />
                            </Pagination>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderList;