import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { useUpdateStateMutation, useGetStateByIdQuery } from "../../../../store/features/location/state/stateApi";
import { useGetCountryQuery } from "../../../../store/features/location/country/countryApi";

const EditState = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [countryId, setCountryId] = useState("");
    const { data: state, isLoading: isStateLoading, refetch } = useGetStateByIdQuery(id);
    const { data: countries, isLoading: isCountriesLoading } = useGetCountryQuery();
    const [updateState, { isLoading: isUpdating }] = useUpdateStateMutation();

    // Set form data when state is fetched
    useEffect(() => {
        if (state) {
            setName(state.name);
            setCountryId(state.countryId);
        }
    }, [state]);

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
            // Trigger the update mutation
            await updateState({ id, formData }).unwrap();
            toast.success("State updated successfully!");

            // Redirect to state list after 1 second
            setTimeout(() => {
                navigate("/dashboard/state-list");
            }, 1000);
        } catch (error) {
            console.error("Error updating state:", error);
            toast.error(error?.data?.error || "An unexpected error occurred. Please try again.");
        }
    };

    if (isStateLoading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <Container>
            <ToastContainer />
            <h5 className="mb-4">Edit State</h5>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>State Name *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter state name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isUpdating}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Country *</Form.Label>
                    <Form.Select
                        value={countryId}
                        onChange={(e) => setCountryId(e.target.value)}
                        disabled={isUpdating || isCountriesLoading}
                    >
                        <option value="">Select a country</option>
                        {countries?.map((country) => (
                            <option key={country._id} value={country._id}>
                                {country.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" disabled={isUpdating}>
                    {isUpdating ? <Spinner animation="border" size="sm" /> : "Update"}
                </Button>
            </Form>
        </Container>
    );
};

export default EditState;