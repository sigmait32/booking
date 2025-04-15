
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

//     // Fetch cities based on selected state
//     const { data: cityList = [], refetch } = useGetCityByStateIdQuery(selectedState, {
//         skip: !selectedState,
//         keepUnusedDataFor: 0,
//     });

//     useEffect(() => {
//         if (selectedState) {
//             refetch(); // Ensures latest city data is fetched
//         }
//     }, [selectedState, refetch]);

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

//     console.log("form data is ==========>", formData);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));

//         if (name === "state") {
//             setSelectedState(value);
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
//                             <Form.Select name="city" value={formData.city} onChange={handleChange} required disabled={!selectedState}>
//                                 <option value="">Select a City</option>
//                                 {cityList?.map((item) => (
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
import { addCustomer, resetAddStatus } from "../../../store/reducers/customerReducer";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetStateQuery } from "../../../store/features/location/state/stateApi";
import { useGetCityByStateIdQuery } from "../../../store/features/location/city/cityApi";

const AddCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addStatus, error } = useSelector(state => state.customers);

    const { data: stateList } = useGetStateQuery();
    const [selectedState, setSelectedState] = useState("");

    // Fetch cities only when a state is selected
    const { data: cityList } = useGetCityByStateIdQuery(selectedState, {
        skip: !selectedState, // Skip fetching if no state is selected
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addCustomer(formData)).unwrap();
        } catch (error) {
            console.error("Failed to add customer:", error);
        }
    };

    useEffect(() => {
        if (addStatus === "succeeded") {
            toast.success("Customer added successfully!");
            dispatch(resetAddStatus());
            navigate("/dashboard/customer-list");
        }
        if (addStatus === "failed") {
            toast.error(error || "Failed to add customer!");
            dispatch(resetAddStatus());
        }
    }, [addStatus, dispatch, navigate, error]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // If the state is changed, reset city selection and update selected state
        if (name === "state") {
            setSelectedState(value);
            setFormData(prev => ({
                ...prev,
                city: "",
            }));
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <ToastContainer />
            <Card style={{ width: "40rem", padding: "2rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Customer</h2>
                    <Form onSubmit={handleSubmit}>
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
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                            />
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
                            {addStatus === "loading" ? "Adding..." : "Add Customer"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddCustomer;
