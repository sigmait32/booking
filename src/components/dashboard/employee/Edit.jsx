

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Form, Button, Container, Card } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useUpdateEmployeeMutation, useGetEmployeeByIdQuery } from "../../../store/features/employee/employeeApi";

// const Edit = () => {
//     const navigate = useNavigate();
//     const { id } = useParams(); // Get employee ID from URL

//     // RTK Query mutations & queries
//     const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
//     const { data: employeeData, isLoading: isFetching } = useGetEmployeeByIdQuery(id);

//     const [formData, setFormData] = useState({
//         fullName: "",
//         email: "",
//         mobileNo: "",
//         address: "",
//         password: "", // Optional new password field
//     });

//     // Prefill form when editing
//     useEffect(() => {
//         if (employeeData) {
//             setFormData({
//                 fullName: employeeData.fullName || "",
//                 email: employeeData.email || "",
//                 mobileNo: employeeData.mobileNo || "",
//                 address: employeeData.address || "",
//                 password: employeeData.password || ""
//             });
//         }
//     }, [employeeData]);

//     // Handle Input Change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     // Handle Form Submission (Update Employee)
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const updatedData = { id, ...formData };

//             // Remove password field if left blank (so it doesn't update)
//             if (!formData.password) {
//                 delete updatedData.password;
//             }

//             await updateEmployee(updatedData).unwrap();
//             toast.success("Employee updated successfully!");
//             setTimeout(() => {
//                 navigate("/dashboard/employee-list"); // Redirect after success
//             }, 500);
//         } catch (error) {
//             toast.error(error.data?.message || "Failed to update employee.");
//         }
//     };

//     return (
//         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
//             <ToastContainer />
//             <Card style={{ width: "40rem", padding: "2rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
//                 <Card.Body>
//                     <h2 className="text-center mb-4">Edit Employee</h2>
//                     {isFetching ? (
//                         <p className="text-center">Loading employee data...</p>
//                     ) : (
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Full Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="fullName"
//                                     value={formData.fullName}
//                                     onChange={handleChange}
//                                     placeholder="Enter full name"
//                                     required
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     placeholder="Enter email"
//                                     disabled // Email should not be edited
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3">
//                                 <Form.Label>New Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     placeholder="Enter new password (leave blank if unchanged)"
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3">
//                                 <Form.Label>Mobile No</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="mobileNo"
//                                     value={formData.mobileNo}
//                                     onChange={handleChange}
//                                     placeholder="Enter mobile number"
//                                     required
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3">
//                                 <Form.Label>Address</Form.Label>
//                                 <Form.Control
//                                     as="textarea"
//                                     rows={3}
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleChange}
//                                     placeholder="Enter address"
//                                 />
//                             </Form.Group>

//                             <Button variant="primary" type="submit" className="w-100" disabled={isUpdating}>
//                                 {isUpdating ? "Updating..." : "Update Employee"}
//                             </Button>
//                         </Form>
//                     )}
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default Edit;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa"; // Import edit icon
import "react-toastify/dist/ReactToastify.css";
import { useUpdateEmployeeMutation, useGetEmployeeByIdQuery } from "../../../store/features/employee/employeeApi";

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get employee ID from URL

    // RTK Query mutations & queries
    const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
    const { data: employeeData, isLoading: isFetching } = useGetEmployeeByIdQuery(id);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNo: "",
        address: "",
        password: "", // Optional new password field
    });

    const [isPasswordEditable, setIsPasswordEditable] = useState(false); // Password edit state

    // Prefill form when editing
    useEffect(() => {
        if (employeeData) {
            setFormData({
                fullName: employeeData.fullName || "",
                email: employeeData.email || "",
                mobileNo: employeeData.mobileNo || "",
                address: employeeData.address || "",
                password: employeeData.password || "",
                // password: "", // Do not prefill password for security
            });
        }
    }, [employeeData]);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle Form Submission (Update Employee)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { id, ...formData };

            // Remove password field if it's not updated
            if (!isPasswordEditable || !formData.password) {
                delete updatedData.password;
            }

            await updateEmployee(updatedData).unwrap();
            toast.success("Employee updated successfully!");
            setTimeout(() => {
                navigate("/dashboard/employee-list"); // Redirect after success
            }, 500);
        } catch (error) {
            toast.error(error.data?.message || "Failed to update employee.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <ToastContainer />
            <Card style={{ width: "40rem", padding: "2rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Edit Employee</h2>
                    {isFetching ? (
                        <p className="text-center">Loading employee data...</p>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            {/* Full Name */}
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

                            {/* Email */}
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Enter email"
                                    disabled // Email should not be edited
                                />
                            </Form.Group>

                            {/* Password (Disabled until user clicks edit) */}
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
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

                            {/* Mobile No */}
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

                            {/* Address */}
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

                            {/* Submit Button */}
                            <Button variant="primary" type="submit" className="w-100" disabled={isUpdating}>
                                {isUpdating ? "Updating..." : "Update Employee"}
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Edit;
