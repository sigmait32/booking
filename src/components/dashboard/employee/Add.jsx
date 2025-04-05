

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAddEmployeeMutation } from "../../../store/features/employee/employeeApi";

const Add = () => {
    const navigate = useNavigate();
    const [addEmployee, { isLoading }] = useAddEmployeeMutation(); // RTK Query Mutation

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        mobileNo: "",
        address: "",
    });

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addEmployee(formData).unwrap();
            toast.success(response.message || "Employee added successfully!");
            setTimeout(() => {
                navigate("/dashboard/employee-list"); // Redirect after success    
            }, 500);

        } catch (error) {
            toast.error(error.data?.message || "Failed to add employee.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <ToastContainer />
            <Card style={{ width: "40rem", padding: "2rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Employee</h2>
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

                        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add Employee"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Add;

