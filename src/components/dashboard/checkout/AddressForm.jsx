import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useGetStateQuery } from '../../../store/features/location/state/stateApi';
import { useGetCityByStateIdQuery } from '../../../store/features/location/city/cityApi';

const AddressForm = ({ formData, setFormData, isEditing }) => {
    const { data: stateList } = useGetStateQuery();
    const { data: cityList } = useGetCityByStateIdQuery(formData.state, {
        skip: !formData.state,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "state") {
            setFormData(prev => ({
                ...prev,
                city: "",
            }));
        }
    };

    return (
        <>
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
                            {stateList?.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select customer state.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
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
                            {cityList?.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select customer city.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};

export default AddressForm;