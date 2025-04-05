// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Form, Button, Container, Spinner } from "react-bootstrap";
// import { useAddStateMutation } from "../../../../store/features/location/state/stateApi";
// import { useGetCountryQuery } from "../../../../store/features/location/country/countryApi";


// const AddState = () => {
//     const [name, setName] = useState("");
//     const [country, setCountryId] = useState("");
//     const navigate = useNavigate();
//     const [addState, { isLoading: isAdding }] = useAddStateMutation();
//     const { data: countries, isLoading: isCountriesLoading } = useGetCountryQuery();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate input
//         if (!name.trim() || !country) {
//             toast.error("State name and country are required");
//             return;
//         }

//         // Prepare form data
//         const formData = { name, country };

//         try {
//             // Trigger the add mutation
//             await addState(formData).unwrap();
//             toast.success("State added successfully!");

//             // Redirect to state list after 1 second
//             setTimeout(() => {
//                 navigate("/dashboard/state-list");
//             }, 1000);
//         } catch (error) {
//             console.error("Error adding state:", error);
//             toast.error(error?.data?.error || "An unexpected error occurred. Please try again.");
//         }
//     };

//     return (
//         <Container>
//             <ToastContainer />
//             <h5 className="mb-4">Add State</h5>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                     <Form.Label>State Name *</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter state name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         disabled={isAdding}
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Country *</Form.Label>
//                     <Form.Select
//                         value={country}
//                         onChange={(e) => setCountryId(e.target.value)}
//                         disabled={isAdding || isCountriesLoading}
//                     >
//                         <option value="">Select a country</option>
//                         {countries?.map((country) => (
//                             <option key={country._id} value={country._id}>
//                                 {country.name}
//                             </option>
//                         ))}
//                     </Form.Select>
//                 </Form.Group>

//                 <Button type="submit" variant="primary" disabled={isAdding}>
//                     {isAdding ? <Spinner animation="border" size="sm" /> : "Submit"}
//                 </Button>
//             </Form>
//         </Container>
//     );
// };

// export default AddState;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useAddStateMutation } from '../../../../store/features/location/state/stateApi';
import { useGetCountryQuery } from '../../../../store/features/location/country/countryApi';

const AddState = () => {
    const [formData, setFormData] = useState({
        name: '',
        country: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // API Hooks
    const [addState, { isLoading: isAdding, error }] = useAddStateMutation();
    const {
        data: countries = [],
        isLoading: isCountriesLoading,
        isError: isCountriesError
    } = useGetCountryQuery();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when field is changed
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'State name is required';
        if (!formData.country) newErrors.country = 'Please select a country';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await addState(formData).unwrap();
            toast.success('State added successfully!');
            setTimeout(() => navigate('/dashboard/state-list'), 1000);
        } catch (err) {
            console.error('Failed to add state:', err);
            toast.error(err?.data?.error || 'Failed to add state. Please try again.');
        }
    };

    return (
        <Container className="py-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <Card className="border-0 shadow">
                <Card.Header className="bg-white border-0 py-3">
                    <h5 className="mb-0 d-flex align-items-center">
                        <i className="bi bi-geo-alt me-2"></i>
                        Add New State
                    </h5>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* State Name Field */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">State Name *</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter state name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                disabled={isAdding}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Country Selection */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Country *</Form.Label>
                            <Form.Select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                isInvalid={!!errors.country}
                                disabled={isAdding || isCountriesLoading}
                            >
                                <option value="">Select a country</option>
                                {countries.map(country => (
                                    <option key={country._id} value={country._id}>
                                        {country.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.country}
                            </Form.Control.Feedback>
                            {isCountriesError && (
                                <Alert variant="danger" className="mt-2">
                                    Failed to load countries. Please try again.
                                </Alert>
                            )}
                        </Form.Group>

                        {/* API Error Display */}
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error?.data?.error || 'An error occurred while adding the state'}
                            </Alert>
                        )}

                        {/* Form Actions */}
                        <div className="d-flex justify-content-between border-top pt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate('/dashboard/state-list')}
                                disabled={isAdding}
                            >
                                Back to List
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isAdding || isCountriesLoading}
                            >
                                {isAdding ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            className="me-2"
                                        />
                                        Adding...
                                    </>
                                ) : 'Add State'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddState;