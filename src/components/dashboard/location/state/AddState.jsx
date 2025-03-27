import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { useAddStateMutation } from "../../../../store/features/location/state/stateApi";
import { useGetCountryQuery } from "../../../../store/features/location/country/countryApi";

const AddState = () => {
    const [name, setName] = useState("");
    const [countryId, setCountryId] = useState("");
    const navigate = useNavigate();
    const [addState, { isLoading: isAdding }] = useAddStateMutation();
    const { data: countries, isLoading: isCountriesLoading } = useGetCountryQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!name.trim() || !countryId) {
            toast.error("State name and country are required");
            return;
        }

        // Prepare form data
        const formData = { name, countryId };

        try {
            // Trigger the add mutation
            await addState(formData).unwrap();
            toast.success("State added successfully!");

            // Redirect to state list after 1 second
            setTimeout(() => {
                navigate("/dashboard/state-list");
            }, 1000);
        } catch (error) {
            console.error("Error adding state:", error);
            toast.error(error?.data?.error || "An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Container>
            <ToastContainer />
            <h5 className="mb-4">Add State</h5>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>State Name *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter state name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isAdding}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Country *</Form.Label>
                    <Form.Select
                        value={countryId}
                        onChange={(e) => setCountryId(e.target.value)}
                        disabled={isAdding || isCountriesLoading}
                    >
                        <option value="">Select a country</option>
                        {countries?.map((country) => (
                            <option key={country._id} value={country._id}>
                                {country.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" disabled={isAdding}>
                    {isAdding ? <Spinner animation="border" size="sm" /> : "Submit"}
                </Button>
            </Form>
        </Container>
    );
};

export default AddState;