

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addCustomer, clearAddCustomer } from '../../../store/reducers/customerReducer';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container } from 'react-bootstrap';
// import { toast } from 'react-toastify';


// const AddCustomer = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { addStatus, error } = useSelector(state => state.customers);
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         password: '',
//         mobileNo: '',
//         gst_number: '',
//         address: '',
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await dispatch(addCustomer(formData)).unwrap();
//         } catch (error) {
//             console.error('Failed to add customer:', error);
//         }
//     };

//     // Show toast messages based on addStatus
//     useEffect(() => {
//         if (addStatus === 'succeeded') {
//             toast.success('Customer added successfully!');
//             dispatch(clearAddCustomer()); // Reset the addStatus to 'idle'
//             navigate('/dashboard/customer-list'); // Navigate back to the list page
//         } else if (addStatus === 'failed') {
//             toast.error('Failed to add customer!');
//             dispatch(clearAddCustomer()); // Reset the addStatus to 'idle'
//         }
//     }, [addStatus, dispatch, navigate]);

//     return (
//         <Container>
//             <h2>Add Customer</h2>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Full Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         value={formData.fullName}
//                         onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                         placeholder="Enter full name"
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                         type="email"
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         placeholder="Enter email"
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>password</Form.Label>
//                     <Form.Control
//                         type="password"
//                         value={formData.password}
//                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                         placeholder="Enter Password"
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Mobile No</Form.Label>
//                     <Form.Control
//                         type="text"
//                         value={formData.mobileNo}
//                         onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
//                         placeholder="Enter mobile number"
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>GST Number</Form.Label>
//                     <Form.Control
//                         type="text"
//                         value={formData.gst_number}
//                         onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
//                         placeholder="Enter GST number"
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control
//                         as="textarea"
//                         rows={3}
//                         value={formData.address}
//                         onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                         placeholder="Enter address"
//                     />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" disabled={addStatus === 'loading'}>
//                     {addStatus === 'loading' ? 'Adding...' : 'Add'}
//                 </Button>
//             </Form>
//         </Container>
//     );
// };

// export default AddCustomer;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, resetAddStatus } from '../../../store/reducers/customerReducer';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addStatus, error } = useSelector(state => state.customers);
    console.log("error message is ========>", error)

    console.log("addStatus is ========>", addStatus)

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        mobileNo: '',
        gst_number: '',
        address: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addCustomer(formData)).unwrap();
        } catch (error) {
            console.error('Failed to add customer:', error);
        }
    };

    useEffect(() => {
        console.log("addStatus use effect =>", addStatus)
        if (addStatus === 'succeeded') {
            toast.success('Customer added successfully!');
            dispatch(resetAddStatus());
            navigate('/dashboard/customer-list');
        }
        if (addStatus === 'failed') {
            toast.error(error || 'Failed to add customer!');
            dispatch(resetAddStatus());
        }
    }, [addStatus, dispatch, navigate, error]);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <ToastContainer />
            <Card style={{ width: '40rem', padding: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Customer</h2>
                    <Form onSubmit={handleSubmit}>
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
                        <Form.Group className="mb-3">
                            <Form.Label>GST Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.gst_number}
                                onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
                                placeholder="Enter GST number"
                            />
                        </Form.Group>
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
                        <Button variant="primary" type="submit" className="w-100" disabled={addStatus === 'loading'}>
                            {addStatus === 'loading' ? 'Adding...' : 'Add Customer'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddCustomer;