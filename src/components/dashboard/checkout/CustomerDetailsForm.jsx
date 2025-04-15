import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CustomerDetailsForm = ({
    formData,
    setFormData,
    isEditing,
    setIsEditing,
    isNewCustomer,
    setIsNewCustomer,
    setCustomerAddError
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
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
        </>
    );
};

export default CustomerDetailsForm;