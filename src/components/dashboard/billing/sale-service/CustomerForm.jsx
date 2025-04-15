import React, { useState, useEffect, useMemo } from 'react';
import { Form, Row, Col, Spinner, Card } from 'react-bootstrap';
import { FaSearch, FaTimes, FaPlus } from 'react-icons/fa';
import { useGetCustomersQuery } from '../../../../store/features/customer/customerApi';
import { Link } from 'react-router-dom';
import './CustomerForm.css';

const CustomerForm = ({
    fullName,
    setFullName,
    email,
    setEmail,
    mobileNo,
    setMobileNo,
    gst_number,
    setGstNumber,
    address,
    setAddress,
    customerId,
    setCustomerId
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const { data: customers = [], isLoading, isError } = useGetCustomersQuery();

    const filteredCustomers = useMemo(() => {
        return customers.filter(
            (c) =>
                c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.mobileNo?.includes(searchTerm)
        );
    }, [customers, searchTerm]);

    useEffect(() => {
        if (selectedCustomer) {

            setCustomerId(selectedCustomer._id || '');
            setFullName(selectedCustomer.fullName || '');
            setEmail(selectedCustomer.email || '');
            setMobileNo(selectedCustomer.mobileNo || '');
            setGstNumber(selectedCustomer.gst_number || '');
            setAddress(selectedCustomer.address || '');
        }
    }, [selectedCustomer]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowDropdown(value.trim().length > 0);
        if (!value) clearForm();
    };

    const handleCustomerSelect = (customer) => {
        setSelectedCustomer(customer);
        setSearchTerm(customer.fullName);
        setShowDropdown(false);
    };

    const clearForm = () => {
        setSelectedCustomer(null);
        setSearchTerm('');
        setFullName('');
        setEmail('');
        setMobileNo('');
        setGstNumber('');
        setAddress('');
    };

    return (
        <div className="customer-form-container p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="m-0 text-primary">
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Customer Details
                </h4>
                <Link
                    to="/dashboard/add-customer"
                    className="btn btn-primary btn-sm"
                >
                    <FaPlus className="me-2" />
                    Add New Customer
                </Link>
            </div>

            {/* Search Section */}
            <Card className="mb-4 border-0 shadow-sm">
                <Card.Body>
                    <h5 className="mb-3 text-secondary">
                        <i className="bi bi-search me-2"></i>
                        Customer Search
                    </h5>
                    <Form.Group controlId="customerSearch">
                        <div className={`search-container ${isFocused ? 'focused' : ''}`}>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <FaSearch className="text-muted" />
                                </span>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by name or phone number..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onFocus={() => {
                                        setIsFocused(true);
                                        if (searchTerm) setShowDropdown(true);
                                    }}
                                    onBlur={() => setTimeout(() => {
                                        setIsFocused(false);
                                        setShowDropdown(false);
                                    }, 200)}
                                    className="border-start-0 py-2"
                                />
                                {searchTerm && (
                                    <button
                                        className="btn btn-outline-secondary border-start-0"
                                        onClick={clearForm}
                                        type="button"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>

                            {showDropdown && (
                                <div className="dropdown-menu w-100 show mt-1 p-0 border shadow-sm">
                                    <div className="dropdown-content">
                                        {isLoading ? (
                                            <div className="dropdown-item py-2 px-3 text-center">
                                                <Spinner animation="border" size="sm" className="me-2" />
                                                Loading customers...
                                            </div>
                                        ) : isError ? (
                                            <div className="dropdown-item py-2 px-3 text-danger">
                                                <i className="bi bi-exclamation-circle me-2"></i>
                                                Error loading customers
                                            </div>
                                        ) : filteredCustomers.length === 0 ? (
                                            <div className="dropdown-item py-2 px-3 text-muted">
                                                <i className="bi bi-info-circle me-2"></i>
                                                No matching customers found
                                            </div>
                                        ) : (
                                            filteredCustomers.map((customer) => (
                                                <button
                                                    key={customer._id}
                                                    className="dropdown-item py-2 px-3 text-start"
                                                    onClick={() => handleCustomerSelect(customer)}
                                                >
                                                    <div className="d-flex justify-content-between">
                                                        <strong>{customer.fullName}</strong>
                                                        <small className="text-muted">{customer.mobileNo}</small>
                                                    </div>
                                                    <div className="text-truncate text-muted small">
                                                        {customer.email}
                                                    </div>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Form.Group>
                </Card.Body>
            </Card>

            {/* Customer Details Form */}
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <h5 className="mb-4 text-secondary">
                        <i className="bi bi-person-badge me-2"></i>
                        Customer Information
                    </h5>
                    <Row className="g-3">
                        <Col md={6}>
                            <Form.Group controlId="fullName" className="mb-3">
                                <Form.Label className="fw-semibold">Full Name</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-person"></i>
                                    </span>
                                    <Form.Control
                                        type="text"
                                        placeholder="John Doe"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="py-2"
                                        disabled
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label className="fw-semibold">Email</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-envelope"></i>
                                    </span>
                                    <Form.Control
                                        type="email"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="py-2"
                                        disabled
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="mobileNo" className="mb-3">
                                <Form.Label className="fw-semibold">Mobile Number</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-phone"></i>
                                    </span>
                                    <Form.Control
                                        type="text"
                                        placeholder="+1 234 567 8900"
                                        value={mobileNo}
                                        onChange={(e) => setMobileNo(e.target.value)}
                                        className="py-2"
                                        disabled
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="customerId" className="mb-3">
                                <Form.Label className="fw-semibold">customerId </Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-phone"></i>
                                    </span>
                                    <Form.Control
                                        type="text"
                                        placeholder="#"
                                        value={customerId}
                                        onChange={(e) => setCustomerId(e.target.value)}
                                        className="py-2"
                                        disabled
                                    />
                                </div>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="gstNumber" className="mb-3">
                                <Form.Label className="fw-semibold">GST Number</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-file-earmark-text"></i>
                                    </span>
                                    <Form.Control
                                        type="text"
                                        placeholder="22AAAAA0000A1Z5"
                                        value={gst_number}
                                        onChange={(e) => setGstNumber(e.target.value)}
                                        className="py-2"
                                        disabled
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group controlId="address">
                                <Form.Label className="fw-semibold">Address</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text align-items-start pt-2">
                                        <i className="bi bi-geo-alt"></i>
                                    </span>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="123 Main St, City, State, ZIP"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="py-2"
                                        disabled
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CustomerForm;