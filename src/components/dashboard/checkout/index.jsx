


// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
// import { clearCart } from '../../../store/features/cart/cartSlice';
// import { useCheckoutMutation } from '../../../store/features/cart/cartApi';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         address: '67e28e1b2725b21bb3619aac',
//         payment: 'credit',
//     });
//     const [checkout, { isLoading }] = useCheckoutMutation();
//     const { userInfo } = useSelector(state => state.auth);
//     const cartItems = useSelector(state => state.cart.items);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();


//     console.log("userInfo ==================>", userInfo)
//     const calculateTotal = () => {
//         return cartItems.reduce(
//             (total, item) => total + item.price * item.quantity, 0
//         ).toFixed(2);
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const orderData = {
//                 userId: userInfo?.id,
//                 items: cartItems,
//                 shippingInfo: formData,
//                 address: '67e28e1b2725b21bb3619aac',
//                 paymentMethod: "Credit Card",
//                 total: calculateTotal(),
//             };
//             console.log("Card orderData is =========>", orderData)

//             const result = await checkout(orderData).unwrap();
//             dispatch(clearCart());
//             setTimeout(() => {
//                 navigate(`/dashboard/order-complete/`);
//             }, 500)
//             // navigate(`/dashboard/order-complete/${result.orderId}`);
//         } catch (err) {
//             console.error("Checkout failed:", err);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     return (
//         <Container className="mt-5">
//             <Row className="justify-content-center">
//                 <Col md={8}>
//                     <Card className="p-4 shadow-lg">
//                         <Card.Body>
//                             <h2 className="text-center mb-4">Checkout</h2>
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Full Name</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="name"
//                                         placeholder="Enter your full name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Form.Group>

//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Shipping Address</Form.Label>
//                                     <Form.Control
//                                         as="textarea"
//                                         name="address"
//                                         placeholder="Enter your shipping address"
//                                         value={formData.address}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Form.Group>

//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Payment Method</Form.Label>
//                                     <Form.Select name="payment" value={formData.payment} onChange={handleChange}>
//                                         <option value="credit">Credit Card</option>
//                                         <option value="paypal">PayPal</option>
//                                         <option value="bank">Bank Transfer</option>
//                                     </Form.Select>
//                                 </Form.Group>

//                                 <Card className="p-3 mb-3">
//                                     <h4>Order Summary</h4>
//                                     <p>Total Items: {cartItems.length}</p>
//                                     <p className="fw-bold">Total Amount: ${calculateTotal()}</p>
//                                 </Card>

//                                 <Button
//                                     variant="primary"
//                                     type="submit"
//                                     disabled={isLoading || cartItems.length === 0}
//                                     className="w-100"
//                                 >
//                                     {isLoading ? <Spinner animation="border" size="sm" /> : 'Place Order'}
//                                 </Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default CheckoutPage;


import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner, Modal, Alert } from 'react-bootstrap';
import { clearCart } from '../../../store/features/cart/cartSlice';
import { useCheckoutMutation } from '../../../store/features/cart/cartApi';
import { useGetCustomersQuery, useAddCustomerMutation, useUpdateCustomerMutation } from '../../../store/features/customer/customerApi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 


const CheckoutPage = () => {
    // Form state
    const [formData, setFormData] = useState({
        customerId: '',
        fullName: '',
        email: '',
        mobileNo: '',
        address: '',
        city: '',
        state: '',
        payment: 'credit',
        password: '',
        gst_number: ''
    });

    const [validated, setValidated] = useState(false);
    const [showCustomerSearch, setShowCustomerSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [customerAddError, setCustomerAddError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isNewCustomer, setIsNewCustomer] = useState(false);

    // API hooks
    const [checkout, { isLoading }] = useCheckoutMutation();
    const [addCustomer, { isLoading: isAddingCustomer }] = useAddCustomerMutation();
    const [updateCustomer, { isLoading: isUpdatingCustomer }] = useUpdateCustomerMutation();

    const { data: customers = [], isLoading: isCustomersLoading } = useGetCustomersQuery();
    const { userInfo } = useSelector(state => state.auth);
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Location data
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Lucknow'];
    const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'Uttar Pradesh'];

    // Search customers when search term changes
    useEffect(() => {
        if (searchTerm.length > 2) {
            const results = customers.filter(customer =>
                customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.mobileNo?.includes(searchTerm)
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, customers]);

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity, 0
        ).toFixed(2);
    };

    // Handle selecting an existing customer
    const handleSelectCustomer = (customer) => {
        setFormData({
            ...formData,
            customerId: customer._id,
            fullName: customer.fullName,
            email: customer.email,
            password: customer.password,
            gst_number: customer.gst_number,
            mobileNo: customer.mobileNo,
            address: customer.address,
            city: customer.city,
            state: customer.state
        });
        setIsEditing(false);
        setIsNewCustomer(false);
        setShowCustomerSearch(false);
    };

    // Clear search and form
    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setShowCustomerSearch(false);
    };

    // Handle adding a new customer
    const handleAddCustomer = async () => {
        try {
            const customerData = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                gst_number: formData.gst_number,
                mobileNo: formData.mobileNo,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                role: 'customer'
            };

            const result = await addCustomer(customerData).unwrap();

            setFormData(prev => ({
                ...prev,
                customerId: result._id
            }));
            setIsNewCustomer(true);
            setIsEditing(false);
            setCustomerAddError('');
            return result;
        } catch (err) {
            setCustomerAddError(err.data?.error || 'Failed to add customer');
            throw err;
        }
    };

    // Handle updating customer
    const handleUpdateCustomer = async () => {
        try {
            const customerData = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                gst_number: formData.gst_number,
                mobileNo: formData.mobileNo,
                address: formData.address,
                city: formData.city,
                state: formData.state
            };

            // await updateCustomer({ id: formData.customerId, ...customerData }).unwrap();
            await updateCustomer({ id: formData.customerId, ...customerData }).unwrap();
            setIsEditing(false);
            setCustomerAddError('');
        } catch (err) {
            setCustomerAddError(err.data?.error || 'Failed to update customer');
            throw err;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            if (!formData.customerId) {
                await handleAddCustomer();
            } else if (isEditing) {
                await handleUpdateCustomer();
            }
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle placing the order
    const placeOrder = async (e) => {
        e.preventDefault();

        if (!formData.customerId) {
            alert('Please save customer details first');
            return;
        }

        try {
            // const orderData = {
            //     userId: userInfo?.id,
            //     items: cartItems,
            //     shippingInfo: formData,
            //     customerId: formData.customerId,
            //     paymentMethod: formData.payment,
            //     total: calculateTotal(),
            // };

            // const orderData = {
            //     employeeId: userInfo?.id,
            //     items: cartItems,
            //     shippingInfo: formData,
            //     address: formData.address,
            //     customerId: formData.customerId,
            //     // paymentMethod: "Cash on Delivery",
            //     total: calculateTotal(),
            // };

            const orderData = {
                employeeId: userInfo?.id,
                customerId: formData.customerId,
                items: cartItems,
                shippingInfo: formData,  // ✅ Contains address, payment, etc.
                // paymentMethod: formData.payment, // ✅ Dynamically set payment method

                total: calculateTotal(), // ✅ Calculated once for better performance
            };



            console.log("customer id is ========>", formData.customerId,)

            const result = await checkout(orderData).unwrap();

            dispatch(clearCart());
            toast.success('Your order has been placed successfully! 🎉', {
                position: "top-center", // Centers the toast
                autoClose: 3000, // Closes after 3 seconds
            });
            setTimeout(() => {
                navigate(`/dashboard/order-complete/`);
            }, 500);
        } catch (err) {
            console.error("Checkout failed:", err);
        }
    };

    // Enable editing mode
    const enableEditing = () => {
        setIsEditing(true);
    };

    // Clear form and start over
    const clearForm = () => {
        setFormData({
            customerId: '',
            fullName: '',
            email: '',
            mobileNo: '',
            address: '',
            city: '',
            state: '',
            payment: 'credit',
            password: '',
            gst_number: ''
        });
        setIsEditing(false);
        setIsNewCustomer(false);
        clearSearch();
    };

    return (
        <Container className="my-5">
            <ToastContainer />
            <Row>
                {/* Left Column - Customer Form */}
                <Col md={7} className="pe-md-4">
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary">
                                    <i className="fa fa-user me-2"></i>
                                    Customer Information
                                </h2>
                                <p className="text-muted">Add new customer or select existing one</p>
                            </div>

                            {/* Customer Search/Selection Section */}
                            <div className="mb-4">
                                {!formData.customerId ? (
                                    <>
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => setShowCustomerSearch(true)}
                                            className="w-100 mb-3"
                                        >
                                            <i className="fa fa-search me-2"></i>
                                            Search Existing Customer
                                        </Button>
                                        <div className="alert alert-warning py-2">
                                            <i className="fa fa-exclamation-circle me-2"></i>
                                            New customer will be created with these details
                                        </div>
                                    </>
                                ) : (
                                    <div className="alert alert-success py-2">
                                        <i className="fa fa-check-circle me-2"></i>
                                        {isNewCustomer ? 'New customer created: ' : 'Selected customer: '}
                                        {formData.fullName} ({formData.mobileNo})
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="float-end text-danger p-0"
                                            onClick={clearForm}
                                        >
                                            Change Customer
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {customerAddError && <Alert variant="danger" className="mb-3">{customerAddError}</Alert>}

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label className="fw-medium">
                                                <i className="fa fa-user text-muted me-2"></i>
                                                Full Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="fullName"
                                                placeholder="Enter customer full name"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                disabled={formData.customerId && !isEditing}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide customer name.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label className="fw-medium">
                                                <i className="fa fa-envelope text-muted me-2"></i>
                                                Email <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter customer email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                disabled={formData.customerId && !isEditing}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid email.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    {/* Password Field */}
                                    <Col md={6} className="mb-3">
                                        <Form.Group className="position-relative">
                                            <Form.Label className="fw-medium">
                                                Password <span className="text-danger">*</span>
                                            </Form.Label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="fa fa-lock text-muted"></i>
                                                </span>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter customer Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={formData.customerId && !isEditing}
                                                />
                                            </div>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide customer password.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    {/* GST Number Field */}
                                    <Col md={6} className="mb-3">
                                        <Form.Group className="position-relative">
                                            <Form.Label className="fw-medium">
                                                GST Number <span className="text-danger">*</span>
                                            </Form.Label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="fa fa-id-card text-muted"></i>
                                                </span>
                                                <Form.Control
                                                    type="text"
                                                    name="gst_number"
                                                    placeholder="Enter GST Number"
                                                    value={formData.gst_number}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={formData.customerId && !isEditing}
                                                />
                                            </div>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide GST Number.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12} className="mb-3">
                                        <Form.Group>
                                            <Form.Label className="fw-medium">
                                                <i className="fa fa-mobile-alt text-muted me-2"></i>
                                                Mobile Number <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="mobileNo"
                                                placeholder="Enter 10-digit mobile number"
                                                value={formData.mobileNo}
                                                onChange={handleChange}
                                                required
                                                pattern="[0-9]{10}"
                                                disabled={formData.customerId && !isEditing}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid 10-digit mobile number.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Shipping Address */}
                                <h5 className="fw-bold mb-3 text-secondary mt-4">
                                    <i className="fa fa-map-marker-alt me-2"></i>
                                    Shipping Address
                                </h5>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">
                                        Complete Address <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="address"
                                        placeholder="House no, Street, Area"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        disabled={formData.customerId && !isEditing}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide customer address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label className="fw-medium">
                                                City <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                className="form-select-lg"
                                                disabled={formData.customerId && !isEditing}
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((city, index) => (
                                                    <option key={index} value={city}>{city}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Please select customer city.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label className="fw-medium">
                                                State <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                                className="form-select-lg"
                                                disabled={formData.customerId && !isEditing}
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state, index) => (
                                                    <option key={index} value={state}>{state}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Please select customer state.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Payment Method */}
                                <h5 className="fw-bold mb-3 text-secondary mt-4">
                                    <i className="fa fa-credit-card me-2"></i>
                                    Payment Method
                                </h5>
                                <Form.Group>
                                    <Form.Select
                                        name="payment"
                                        value={formData.payment}
                                        onChange={handleChange}
                                        required
                                        className="form-select-lg py-2"
                                    >
                                        <option value="credit">Credit/Debit Card</option>
                                        <option value="upi">UPI Payment</option>
                                        <option value="netbanking">Net Banking</option>
                                        <option value="cod">Cash on Delivery</option>
                                    </Form.Select>
                                </Form.Group>

                                <div className="d-flex gap-3 mt-4">
                                    {!formData.customerId ? (
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-100 py-3"
                                            disabled={isAddingCustomer}
                                        >
                                            {isAddingCustomer ? (
                                                <>
                                                    <Spinner animation="border" size="sm" className="me-2" />
                                                    Adding Customer...
                                                </>
                                            ) : (
                                                'Add Customer'
                                            )}
                                        </Button>
                                    ) : isEditing ? (
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-100 py-3"
                                            disabled={isUpdatingCustomer}
                                        >
                                            {isUpdatingCustomer ? (
                                                <>
                                                    <Spinner animation="border" size="sm" className="me-2" />
                                                    Updating...
                                                </>
                                            ) : (
                                                'Update Customer'
                                            )}
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outline-primary"
                                                className="w-100 py-3"
                                                onClick={enableEditing}
                                            >
                                                <i className="fa fa-edit me-2"></i>
                                                Edit Details
                                            </Button>
                                            <Button
                                                variant="success"
                                                className="w-100 py-3"
                                                disabled={isEditing}
                                            >
                                                <i className="fa fa-check-circle me-2"></i>
                                                Customer Verified
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right Column - Order Summary */}
                <Col md={5}>
                    <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                        <Card.Body className="p-4">
                            <h2 className="fw-bold text-primary mb-4">
                                <i className="fa fa-shopping-bag me-2"></i>
                                Order Summary
                            </h2>

                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-bold mb-0">Total Items</h5>
                                    <span className="badge bg-primary rounded-pill fs-6">
                                        {cartItems.length}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-bold mb-0">Delivery</h5>
                                    <span className="text-success fw-bold">FREE</span>
                                </div>

                                <hr className="my-3" />

                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="fw-bold mb-0">Total Amount</h4>
                                    <h3 className="text-primary mb-0">₹{calculateTotal()}</h3>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                type="button"
                                disabled={isLoading || cartItems.length === 0 || !formData.customerId || isEditing}
                                className="w-100 py-3 fw-bold"
                                size="lg"
                                onClick={placeOrder}
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
                </Col>
            </Row>

            {/* Customer Search Modal */}
            <Modal show={showCustomerSearch} onHide={() => {
                setShowCustomerSearch(false);
                clearSearch();
            }} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fa fa-search me-2"></i>
                        Search Customer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Search by Name, Email or Mobile</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter search term..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>

                    {isCustomersLoading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2">Loading customers...</p>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="list-group" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {searchResults.map(customer => (
                                <button
                                    key={customer._id}
                                    type="button"
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handleSelectCustomer(customer)}
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h6 className="mb-1">{customer.fullName}</h6>
                                        <small>{customer.mobileNo}</small>
                                    </div>
                                    <p className="mb-1 text-muted">{customer.email}</p>
                                    <small className="text-muted">
                                        {customer.address}, {customer.city}, {customer.state}
                                    </small>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            {searchTerm.length > 2 ? (
                                <p>No customers found. Add as new customer.</p>
                            ) : (
                                <p>Enter at least 3 characters to search</p>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShowCustomerSearch(false);
                        clearSearch();
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CheckoutPage;