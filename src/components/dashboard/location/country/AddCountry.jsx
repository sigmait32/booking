
// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Spinner, Card } from 'react-bootstrap';
// import { useAddCountryMutation } from '../../../../store/features/location/country/countryApi';

// const AddCountry = () => {
//     const [name, setName] = useState('');
//     const navigate = useNavigate();
//     const [addCountry, { isLoading: isAdding }] = useAddCountryMutation();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate input
//         if (!name.trim()) {
//             toast.error('Country name is required');
//             return;
//         }

//         // Prepare form data
//         const formData = { name };

//         try {
//             // Trigger the add mutation
//             await addCountry(formData).unwrap();
//             toast.success('Country added successfully!');

//             // Redirect to country list after 1 second
//             setTimeout(() => {
//                 navigate('/dashboard/country-list');
//             }, 1000);
//         } catch (error) {
//             console.error('Error adding country:', error);
//             toast.error(error?.data?.error || 'An unexpected error occurred. Please try again.');
//         }
//     };

//     return (
//         <Container>
//             <ToastContainer />
//             <h5 className="mb-4">Add Country</h5>
//             <Form onSubmit={handleSubmit}>
//                 <div className="row row-cols-1">
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-10">
//                                     <Card border="0" className="p-3 shadow-sm">
//                                         <Card.Body>
//                                             <Form.Group className="mb-3">
//                                                 <Form.Label className="fw-medium">
//                                                     Country Name *
//                                                 </Form.Label>
//                                                 <Form.Control
//                                                     type="text"
//                                                     placeholder="Name"
//                                                     value={name}
//                                                     onChange={(e) => setName(e.target.value)}
//                                                     disabled={isAdding} // Disable input while adding
//                                                 />
//                                             </Form.Group>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col sticky-bottom">
//                         <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
//                             <div className="row">
//                                 <div className="col-auto">
//                                     <Button
//                                         variant="outline-primary"
//                                         size="lg"
//                                         className="fw-semibold"
//                                         onClick={() => navigate('/dashboard/country-list')}
//                                     >
//                                         Back
//                                     </Button>
//                                 </div>
//                                 <div className="col-auto ms-auto">
//                                     <Button
//                                         type="submit"
//                                         variant="primary"
//                                         size="lg"
//                                         className="fw-semibold"
//                                         disabled={isAdding} // Disable button while adding
//                                     >
//                                         {isAdding ? (
//                                             <>
//                                                 <Spinner
//                                                     as="span"
//                                                     animation="border"
//                                                     size="sm"
//                                                     role="status"
//                                                     aria-hidden="true"
//                                                     className="me-2"
//                                                 />
//                                                 Adding...
//                                             </>
//                                         ) : (
//                                             'Submit'
//                                         )}
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Form>
//         </Container>
//     );
// };

// export default AddCountry;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useAddCountryMutation } from '../../../../store/features/location/country/countryApi';

const AddCountry = () => {
    const [formData, setFormData] = useState({
        name: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [addCountry, { isLoading: isAdding, error }] = useAddCountryMutation();

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
        if (!formData.name.trim()) newErrors.name = 'Country name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await addCountry(formData).unwrap();
            toast.success('Country added successfully!');
            setTimeout(() => navigate('/dashboard/country-list'), 1000);
        } catch (err) {
            console.error('Failed to add country:', err);
            toast.error(err?.data?.error || 'Failed to add country. Please try again.');
        }
    };

    return (
        <Container className="py-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <Card className="border-0 shadow">
                <Card.Header className="bg-white border-0 py-3">
                    <h5 className="mb-0 d-flex align-items-center">
                        <i className="bi bi-globe me-2"></i>
                        Add New Country
                    </h5>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* Country Name Field */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Country Name *</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter country name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                disabled={isAdding}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* API Error Display */}
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error?.data?.error || 'An error occurred while adding the country'}
                            </Alert>
                        )}

                        {/* Form Actions */}
                        <div className="d-flex justify-content-between border-top pt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate('/dashboard/country-list')}
                                disabled={isAdding}
                            >
                                Back to List
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isAdding}
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
                                ) : 'Add Country'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddCountry;