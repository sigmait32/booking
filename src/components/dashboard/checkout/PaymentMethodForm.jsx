import React from 'react';
import { Form } from 'react-bootstrap';

const PaymentMethodForm = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
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
        </>
    );
};

export default PaymentMethodForm;