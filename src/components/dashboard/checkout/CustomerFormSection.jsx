


import React, { useState } from 'react';
import { Form, Card, Button, Alert, Spinner } from 'react-bootstrap';
import CustomerSearchModal from './CustomerSearchModal';
import CustomerDetailsForm from './CustomerDetailsForm';
import AddressForm from './AddressForm';
import PaymentMethodForm from './PaymentMethodForm';
import { useAddCustomerMutation, useUpdateCustomerMutation } from '../../../store/features/customer/customerApi';

const CustomerFormSection = ({ formData, setFormData, calculateTotal }) => {
    const [showCustomerSearch, setShowCustomerSearch] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewCustomer, setIsNewCustomer] = useState(false);
    const [customerAddError, setCustomerAddError] = useState('');
    const [validated, setValidated] = useState(false);

    const [addCustomer, { isLoading: isAddingCustomer }] = useAddCustomerMutation();
    const [updateCustomer, { isLoading: isUpdatingCustomer }] = useUpdateCustomerMutation();



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
    };



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
                    customerId: result?.user?.id
                }));

                setIsNewCustomer(true);
                setCustomerAddError('');
            } else if (isEditing) {
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
                await updateCustomer({ id: formData.customerId, ...customerData }).unwrap();
                setIsEditing(false);
                setCustomerAddError('');
            }
        } catch (err) {
            setCustomerAddError(err.data?.error || 'Failed to save customer');
        }
    };

    const enableEditing = () => {
        setIsEditing(true);
    };

    return (
        <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">
                        <i className="fa fa-user me-2"></i>
                        Customer Information
                    </h2>
                    <p className="text-muted">Add new customer or select existing one</p>
                </div>

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
                    <CustomerDetailsForm
                        formData={formData}
                        setFormData={setFormData}
                        isEditing={isEditing}
                    />

                    <AddressForm
                        formData={formData}
                        setFormData={setFormData}
                        isEditing={isEditing}
                    />

                    <PaymentMethodForm
                        formData={formData}
                        setFormData={setFormData}
                    />

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

                <CustomerSearchModal
                    show={showCustomerSearch}
                    onHide={() => setShowCustomerSearch(false)}
                    setFormData={setFormData}
                    setIsNewCustomer={setIsNewCustomer}
                    setIsEditing={setIsEditing}
                />
            </Card.Body>
        </Card>
    );
};

export default CustomerFormSection;