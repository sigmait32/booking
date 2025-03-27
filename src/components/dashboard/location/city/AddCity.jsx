import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Spinner, Container, Card } from "react-bootstrap";
import { useAddCityMutation } from "../../../../store/features/location/city/cityApi";
import { useGetCountryQuery } from "../../../../store/features/location/country/countryApi";
import { useGetStateQuery } from "../../../../store/features/location/state/stateApi";

const AddCity = () => {
    const [name, setName] = useState("");
    const [countryId, setCountryId] = useState("");
    const [stateId, setStateId] = useState("");
    const navigate = useNavigate();
    const [addCity, { isLoading: isAdding }] = useAddCityMutation();
    const { data: countries, isLoading: isCountriesLoading } = useGetCountryQuery();
    const { data: states, isLoading: isStatesLoading } = useGetStateQuery(countryId);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!name.trim() || !countryId || !stateId) {
            toast.error("All fields are required");
            return;
        }

        // Prepare form data
        const formData = { name, stateId };

        try {
            // Trigger the add mutation
            await addCity(formData).unwrap();
            toast.success("City added successfully!");

            // Redirect to city list after 1 second
            setTimeout(() => {
                navigate("/dashboard/city-list");
            }, 1000);
        } catch (error) {
            toast.error("Failed to add city: " + error.message);
        }
    };

    return (
        <Container className="mt-4">
            <ToastContainer />
            <Card>
                <Card.Header>
                    <h5 className="mb-0">Add City</h5>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>City Name *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter city name"
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

                        <Form.Group className="mb-3">
                            <Form.Label>State *</Form.Label>
                            <Form.Select
                                value={stateId}
                                onChange={(e) => setStateId(e.target.value)}
                                disabled={isAdding || isStatesLoading || !countryId}
                            >
                                <option value="">Select a state</option>
                                {states?.map((state) => (
                                    <option key={state._id} value={state._id}>
                                        {state.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Button type="submit" variant="primary" disabled={isAdding}>
                            {isAdding ? <Spinner animation="border" size="sm" /> : "Submit"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddCity;