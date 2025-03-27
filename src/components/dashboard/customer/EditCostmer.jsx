// import React from "react";

// const EditCustomer = () => {

//     return (
//         <>
//             <h1> this is Edit Customer</h1>
//         </>
//     )
// }

// export default EditCustomer;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCustomer, fetchCustomers, resetDeleteStatus } from '../../../store/reducers/customerReducer';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //

const EditCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get the customer ID from the URL
    const { customers, updateStatus, error } = useSelector(state => state.customers);

    // State to hold the form data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        mobileNo: '',
        gst_number: '',
        address: '',
    });

    // Fetch customers when the component mounts
    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    // Populate the form with the customer's data when the customers are loaded
    useEffect(() => {
        const customer = customers.find(item => item._id === id);
        if (customer) {
            setFormData({
                fullName: customer.fullName,
                email: customer.email,
                password: customer.password,
                mobileNo: customer.mobileNo,
                gst_number: customer.gst_number,
                address: customer.address,
            });
        }
    }, [customers, id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateCustomer({ id, customerData: formData })).unwrap();
        } catch (error) {
            console.error('Failed to update customer:', error);
        }
    };

    // Handle success or failure of the update operation
    useEffect(() => {
        if (updateStatus === 'succeeded') {
            toast.success('Customer updated successfully!');
            dispatch(resetDeleteStatus());
            setTimeout(() => {
                navigate('/dashboard/customer-list');
            }, 1000)
        } else if (updateStatus === 'failed') {
            toast.error(error || 'Failed to update customer!');
            dispatch(resetDeleteStatus());
        }
    }, [updateStatus, dispatch, navigate, error]);

    return (
        <Container className="d-flex justify-content-center align-customers-center" style={{ minHeight: '100vh' }}>
            <ToastContainer />
            <Card style={{ width: '40rem', padding: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Edit Customer</h2>
                    <Form onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                placeholder="Enter full name"
                                required
                            />
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Enter password"
                                required
                            />
                        </Form.Group>

                        {/* Mobile No */}
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.mobileNo}
                                onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                                placeholder="Enter mobile number"
                                required
                            />
                        </Form.Group>

                        {/* GST Number */}
                        <Form.Group className="mb-3">
                            <Form.Label>GST Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.gst_number}
                                onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
                                placeholder="Enter GST number"
                            />
                        </Form.Group>

                        {/* Address */}
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Enter address"
                            />
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit" className="w-100" disabled={updateStatus === 'loading'}>
                            {updateStatus === 'loading' ? 'Updating...' : 'Update Customer'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditCustomer;