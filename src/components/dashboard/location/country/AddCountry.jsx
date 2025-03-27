
// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // 
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Spinner } from 'react-bootstrap';
// import { useAddCountryMutation } from '../../../../store/features/location/country/countryApi';

// const AddCountry = () => {

//     const [name, setName] = useState('');


//     const navigate = useNavigate();
//     const [addCountry, { isLoading: isAdding, isError }] = useAddCountryMutation();





//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let formData = {
//             name
//         }

//         if (!name) return toast.error("Category name is required");

//         try {
//             let data = await addCountry(formData).unwrap();

//             toast.success('Country added successfully!');
//             // navigate('/dashboard/banner-list');
//             setTimeout(() => {
//                 navigate('/dashboard/country-list');
//             }, 1000)

//         } catch (error) {
//             console.log("error is =====>", error.data.error)
//             toast.error(error.data.error || "An unexpected error occurred. Please try again.");
//         }
//     };





//     return (
//         <div className="container">
//             <ToastContainer />
//             <h5 className="mb-4">Add Country</h5>
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div className="row row-cols-1">


//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 {/* <div className="col-md-4">
//                                     <div>
//                                         <h6>Description</h6>
//                                         <p className="text-secondary">
//                                             Edit your product description and necessary information from here
//                                         </p>
//                                     </div>
//                                 </div> */}
//                                 <div className="col-md-10">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Country Name *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="text"
//                                                         placeholder="Name"
//                                                         value={name}
//                                                         onChange={(e) => setName(e.target.value)}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col sticky-bottom">
//                         <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
//                             <div className="row">
//                                 <div className="col-auto">
//                                     <a className="btn btn-outline-primary btn-lg fw-semibold" href="#">
//                                         Back
//                                     </a>
//                                 </div>
//                                 <div className="col-auto ms-auto">
//                                     {/* <button className="btn btn-primary btn-lg fw-semibold" type="submit">
//                                         Submit
//                                     </button> */}
//                                     <Button variant="btn btn-primary btn-lg fw-semibold" type="submit" disabled={isAdding}>
//                                         {isAdding ? <Spinner animation="border" size="sm" /> : "Submit"}
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddCountry;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Spinner, Card } from 'react-bootstrap';
import { useAddCountryMutation } from '../../../../store/features/location/country/countryApi';

const AddCountry = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [addCountry, { isLoading: isAdding }] = useAddCountryMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!name.trim()) {
            toast.error('Country name is required');
            return;
        }

        // Prepare form data
        const formData = { name };

        try {
            // Trigger the add mutation
            await addCountry(formData).unwrap();
            toast.success('Country added successfully!');

            // Redirect to country list after 1 second
            setTimeout(() => {
                navigate('/dashboard/country-list');
            }, 1000);
        } catch (error) {
            console.error('Error adding country:', error);
            toast.error(error?.data?.error || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <Container>
            <ToastContainer />
            <h5 className="mb-4">Add Country</h5>
            <Form onSubmit={handleSubmit}>
                <div className="row row-cols-1">
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-10">
                                    <Card border="0" className="p-3 shadow-sm">
                                        <Card.Body>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-medium">
                                                    Country Name *
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    disabled={isAdding} // Disable input while adding
                                                />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col sticky-bottom">
                        <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
                            <div className="row">
                                <div className="col-auto">
                                    <Button
                                        variant="outline-primary"
                                        size="lg"
                                        className="fw-semibold"
                                        onClick={() => navigate('/dashboard/country-list')}
                                    >
                                        Back
                                    </Button>
                                </div>
                                <div className="col-auto ms-auto">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="fw-semibold"
                                        disabled={isAdding} // Disable button while adding
                                    >
                                        {isAdding ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Adding...
                                            </>
                                        ) : (
                                            'Submit'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Container>
    );
};

export default AddCountry;