import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button, Spinner, Container, Card, Pagination } from "react-bootstrap";
import { useGetCityQuery, useDeleteCityMutation } from "../../../../store/features/location/city/cityApi";

const CityList = () => {
    const { data: cities, isLoading, error, refetch } = useGetCityQuery();
    const [deleteCity] = useDeleteCityMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (refetch) refetch()
    }, [refetch])

    // Handle loading and error states
    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-danger mt-5">
                Error loading cities: {error.message}
            </div>
        );
    }

    // Filter cities based on search input
    const filteredCities = cities?.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Pagination calculations
    const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
    const currentItems = filteredCities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Delete city handler
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this city?")) {
            try {
                await deleteCity(id).unwrap();
                toast.success("City deleted successfully!");
                refetch(); // Refetch the list of cities after deletion
            } catch (error) {
                toast.error("Failed to delete city: " + error.message);
            }
        }
    };

    return (
        <Container className="mt-4">
            <ToastContainer />
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">City List</h5>
                    <Link to="/dashboard/add-city" className="btn btn-primary">
                        + Add City
                    </Link>
                </Card.Header>
                <Card.Body>
                    <input
                        className="form-control mb-4"
                        type="text"
                        placeholder="Search cities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((city, i) => (
                                    <tr key={city._id}>
                                        <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                        <td>{city.name}</td>
                                        <td>{city.state?.name}</td>
                                        <td>{city.country?.name}</td>
                                        <td>
                                            <Link
                                                to={`/dashboard/edit-city/${city._id}`}
                                                className="btn btn-sm btn-primary me-2"
                                            >
                                                Edit
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(city._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No cities found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center">
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                />
                                {[...Array(totalPages)].map((_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index + 1 === currentPage}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                    }
                                    disabled={currentPage === totalPages}
                                />
                            </Pagination>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CityList;