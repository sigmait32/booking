import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useGetCustomersQuery } from '../../../store/features/customer/customerApi';

const CustomerSearchModal = ({ show, onHide, setFormData, setIsNewCustomer, setIsEditing }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { data: customers = [], isLoading: isCustomersLoading } = useGetCustomersQuery();

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

    const handleSelectCustomer = (customer) => {
        setFormData({
            customerId: customer._id,
            fullName: customer.fullName,
            email: customer.email,
            password: customer.password,
            gst_number: customer.gst_number,
            mobileNo: customer.mobileNo,
            address: customer.address,
            city: customer.city._id || customer.city,
            state: customer.state._id || customer.state
        });
        setIsEditing(false);
        setIsNewCustomer(false);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
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
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomerSearchModal;