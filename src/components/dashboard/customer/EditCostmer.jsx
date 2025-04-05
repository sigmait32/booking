

// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { updateCustomer, fetchCustomers, resetUpdateStatus } from '../../../store/reducers/customerReducer';
// // import { Form, Button, Container, Card } from 'react-bootstrap';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const EditCustomer = () => {
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();
// //     const { id } = useParams(); // Get customer ID from URL
// //     const { customers, updateStatus, error } = useSelector(state => state.customers);

// //     // State for form data
// //     const [formData, setFormData] = useState({
// //         fullName: '',
// //         email: '',
// //         password: '', // Keep this empty for security reasons
// //         mobileNo: '',
// //         gst_number: '',
// //         address: '',
// //     });

// //     // Fetch customers and reset update status when component mounts
// //     useEffect(() => {
// //         dispatch(resetUpdateStatus()); // Reset status for consecutive updates
// //         dispatch(fetchCustomers());
// //     }, [dispatch]);

// //     // Populate the form when customers are loaded
// //     useEffect(() => {
// //         const customer = customers.find(item => item._id === id);
// //         if (customer) {
// //             setFormData({
// //                 fullName: customer.fullName || '',
// //                 email: customer.email || '',
// //                 password: '', // Do not prefill password for security
// //                 mobileNo: customer.mobileNo || '',
// //                 gst_number: customer.gst_number || '',
// //                 address: customer.address || '',
// //             });
// //         }
// //     }, [customers, id]);

// //     // Handle form submission
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await dispatch(updateCustomer({ id, customerData: formData })).unwrap();
// //         } catch (error) {
// //             console.error('Failed to update customer:', error);
// //         }
// //     };

// //     // Handle success or failure of the update operation
// //     useEffect(() => {
// //         if (updateStatus === 'succeeded') {
// //             toast.success('Customer updated successfully!');
// //             dispatch(resetUpdateStatus()); // Reset update status after success
// //             setTimeout(() => {
// //                 navigate('/dashboard/customer-list');
// //             }, 1000);
// //         } else if (updateStatus === 'failed') {
// //             toast.error(error || 'Failed to update customer!');
// //             dispatch(resetUpdateStatus()); // Reset error status too
// //         }
// //     }, [updateStatus, dispatch, navigate, error]);

// //     return (
// //         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
// //             <ToastContainer />
// //             <Card style={{ width: '40rem', padding: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
// //                 <Card.Body>
// //                     <h2 className="text-center mb-4">Edit Customer</h2>
// //                     <Form onSubmit={handleSubmit}>
// //                         {/* Full Name */}
// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Full Name</Form.Label>
// //                             <Form.Control
// //                                 type="text"
// //                                 value={formData.fullName}
// //                                 onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
// //                                 placeholder="Enter full name"
// //                                 required
// //                             />
// //                         </Form.Group>

// //                         {/* Email */}
// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Email</Form.Label>
// //                             <Form.Control
// //                                 type="email"
// //                                 value={formData.email}
// //                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                                 placeholder="Enter email"
// //                                 required
// //                             />
// //                         </Form.Group>

// //                         {/* Password (Not Prefilled) */}
// //                         <Form.Group className="mb-3">
// //                             <Form.Label>New Password</Form.Label>
// //                             <Form.Control
// //                                 type="password"
// //                                 value={formData.password}
// //                                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //                                 placeholder="Enter new password (leave blank if unchanged)"
// //                             />
// //                         </Form.Group>

// //                         {/* Mobile No */}
// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Mobile No</Form.Label>
// //                             <Form.Control
// //                                 type="text"
// //                                 value={formData.mobileNo}
// //                                 onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
// //                                 placeholder="Enter mobile number"
// //                                 required
// //                             />
// //                         </Form.Group>

// //                         {/* GST Number */}
// //                         <Form.Group className="mb-3">
// //                             <Form.Label>GST Number</Form.Label>
// //                             <Form.Control
// //                                 type="text"
// //                                 value={formData.gst_number}
// //                                 onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
// //                                 placeholder="Enter GST number"
// //                             />
// //                         </Form.Group>

// //                         {/* Address */}
// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Address</Form.Label>
// //                             <Form.Control
// //                                 as="textarea"
// //                                 rows={3}
// //                                 value={formData.address}
// //                                 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
// //                                 placeholder="Enter address"
// //                             />
// //                         </Form.Group>

// //                         {/* Submit Button */}
// //                         <Button variant="primary" type="submit" className="w-100" disabled={updateStatus === 'loading'}>
// //                             {updateStatus === 'loading' ? 'Updating...' : 'Update Customer'}
// //                         </Button>
// //                     </Form>
// //                 </Card.Body>
// //             </Card>
// //         </Container>
// //     );
// // };

// // export default EditCustomer;



// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addCustomer, resetAddStatus } from "../../../store/reducers/customerReducer";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Container, Card } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useGetStateQuery } from "../../../store/features/location/state/stateApi";
// import { useGetCityByStateIdQuery } from "../../../store/features/location/city/cityApi";

// const AddCustomer = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { addStatus, error } = useSelector(state => state.customers);

//     const { data: stateList } = useGetStateQuery();
//     const [selectedState, setSelectedState] = useState("");

//     // Fetch cities only when a state is selected
//     const { data: fetchedCities, isFetching } = useGetCityByStateIdQuery(selectedState, {
//         skip: !selectedState, // Prevent unnecessary API calls
//     });

//     const [cities, setCities] = useState([]);

//     const [formData, setFormData] = useState({
//         fullName: "",
//         email: "",
//         password: "",
//         mobileNo: "",
//         gst_number: "",
//         address: "",
//         state: "",
//         city: "",
//     });

//     useEffect(() => {
//         // Reset cities whenever the selected state changes
//         if (fetchedCities && fetchedCities.length > 0) {
//             setCities(fetchedCities);
//         } else {
//             setCities([]); // Clear previous city list
//             setFormData(prev => ({ ...prev, city: "" })); // Reset city selection
//         }
//     }, [fetchedCities, selectedState]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await dispatch(addCustomer(formData)).unwrap();
//         } catch (error) {
//             console.error("Failed to add customer:", error);
//         }
//     };

//     useEffect(() => {
//         if (addStatus === "succeeded") {
//             toast.success("Customer added successfully!");
//             dispatch(resetAddStatus());
//             navigate("/dashboard/customer-list");
//         }
//         if (addStatus === "failed") {
//             toast.error(error || "Failed to add customer!");
//             dispatch(resetAddStatus());
//         }
//     }, [addStatus, dispatch, navigate, error]);

//     console.log("Selected State:", selectedState);
//     console.log("City List Response:", cities);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));

//         // If the state is changed, reset city selection and update selected state
//         if (name === "state") {
//             setSelectedState(value);
//             setCities([]); // Clear cities when state changes
//             setFormData(prev => ({
//                 ...prev,
//                 city: "",
//             }));
//         }
//     };

//     return (
//         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
//             <ToastContainer />
//             <Card style={{ width: "40rem", padding: "2rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
//                 <Card.Body>
//                     <h2 className="text-center mb-4">Add Customer</h2>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Full Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="fullName"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                                 placeholder="Enter full name"
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>State *</Form.Label>
//                             <Form.Select name="state" value={formData.state} onChange={handleChange} required>
//                                 <option value="">Select a State</option>
//                                 {stateList?.map((item) => (
//                                     <option key={item._id} value={item._id}>
//                                         {item.name}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>City *</Form.Label>
//                             <Form.Select
//                                 name="city"
//                                 value={formData.city}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!selectedState || cities.length === 0}
//                             >
//                                 <option value="">Select a City</option>
//                                 {cities.map((item) => (
//                                     <option key={item._id} value={item._id}>
//                                         {item.name}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="Enter email"
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 placeholder="Enter password"
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Mobile No</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="mobileNo"
//                                 value={formData.mobileNo}
//                                 onChange={handleChange}
//                                 placeholder="Enter mobile number"
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>GST Number</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="gst_number"
//                                 value={formData.gst_number}
//                                 onChange={handleChange}
//                                 placeholder="Enter GST number"
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Address</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 name="address"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                                 placeholder="Enter address"
//                             />
//                         </Form.Group>

//                         <Button variant="primary" type="submit" className="w-100" disabled={addStatus === "loading"}>
//                             {addStatus === "loading" ? "Adding..." : "Add Customer"}
//                         </Button>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default AddCustomer;



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, resetAddStatus } from "../../../store/reducers/customerReducer";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useGetStateQuery } from "../../../store/features/location/state/stateApi";
import { useGetCityByStateIdQuery } from "../../../store/features/location/city/cityApi";
import { useGetCustomerByIdQuery } from "../../../store/features/customer/customerApi";

const UpdateCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    if (!id) {
        navigate("/dashboard/customer-list");
        return null;
    }

    const { addStatus } = useSelector((state) => state.customers);
    const { data: stateList } = useGetStateQuery();
    const [selectedState, setSelectedState] = useState("");

    const { data: cityList } = useGetCityByStateIdQuery(selectedState, {
        skip: !selectedState,
    });

    const { data: customerData, isFetching } = useGetCustomerByIdQuery(id);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        mobileNo: "",
        gst_number: "",
        address: "",
        state: "",
        city: "",
    });

    const [isPasswordEditable, setIsPasswordEditable] = useState(false);

    useEffect(() => {
        if (customerData) {
            setFormData({
                fullName: customerData.fullName || "",
                email: customerData.email || "",
                password: "",
                mobileNo: customerData.mobileNo || "",
                gst_number: customerData.gst_number || "",
                address: customerData.address || "",
                state: customerData.state || "",
                city: customerData.city || "",
            });
            setSelectedState(customerData.state || "");
        }
    }, [customerData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "state") {
            setSelectedState(value);
            setFormData((prev) => ({
                ...prev,
                city: "",
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formDataToSend = {
                fullName: formData.fullName,
                email: formData.email,
                mobileNo: formData.mobileNo,
                gst_number: formData.gst_number,
                address: formData.address,
                state: formData.state,
                city: formData.city,
            };

            if (isPasswordEditable && formData.password) {
                formDataToSend.password = formData.password;
            }

            // console.log("Dispatching updateCustomer with:", formDataToSend); // ✅ Debugging log

            await dispatch(updateCustomer({ id, customerData: formDataToSend })).unwrap();

            toast.success("Customer updated successfully!");
            dispatch(resetAddStatus());
            setTimeout(() => navigate("/dashboard/customer-list"), 500);
        } catch (error) {
            console.error("Update failed:", error); // ✅ Debugging log
            toast.error(error?.message || "Update failed!");
        }
    };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formDataToSend = new FormData();

    //         let formData = {
    //             id,
    //             fullName:formData.fullName
    //         }
    //         formDataToSend.append("id", id);
    //         formDataToSend.append("fullName", formData.fullName);
    //         formDataToSend.append("email", formData.email);
    //         formDataToSend.append("mobileNo", formData.mobileNo);
    //         formDataToSend.append("gst_number", formData.gst_number);
    //         formDataToSend.append("address", formData.address);
    //         formDataToSend.append("state", formData.state);
    //         formDataToSend.append("city", formData.city);

    //         if (isPasswordEditable && formData.password) {
    //             formDataToSend.append("password", formData.password);
    //         }

    //         await dispatch(updateCustomer({ id, customerData: formData })).unwrap();
    //         toast.success("Customer updated successfully!");
    //         dispatch(resetAddStatus());

    //         setTimeout(() => navigate("/dashboard/customer-list"), 500);
    //     } catch (error) {
    //         toast.error(error?.message || "Update failed!");
    //     }
    // };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <ToastContainer />
            <Card style={{ width: "40rem", padding: "2rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Customer</h2>
                    {isFetching ? (
                        <p className="text-center">Loading customer data...</p>
                    ) : (
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>State *</Form.Label>
                                <Form.Select name="state" value={formData.state} onChange={handleChange} required>
                                    <option value="">Select a State</option>
                                    {stateList?.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>City *</Form.Label>
                                <Form.Select name="city" value={formData.city} onChange={handleChange} required disabled={!selectedState}>
                                    <option value="">Select a City</option>
                                    {cityList?.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} disabled />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter new password (leave blank if unchanged)"
                                        disabled={!isPasswordEditable}
                                    />
                                    <Button variant="outline-secondary" onClick={() => setIsPasswordEditable(!isPasswordEditable)}>
                                        <FaEdit />
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mobile No</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    placeholder="Enter mobile number"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>GST Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="gst_number"
                                    value={formData.gst_number}
                                    onChange={handleChange}
                                    placeholder="Enter GST number"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter address"
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100" disabled={addStatus === "loading"}>
                                {addStatus === "loading" ? "Updating..." : "Update Customer"}
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UpdateCustomer;
