// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Table, Button, Spinner, Container } from "react-bootstrap";
// import { useGetStateQuery, useDeleteStateMutation } from "../../../../store/features/location/state/stateApi";

// const StateList = () => {
//     const { data: states, isLoading, error, refetch } = useGetStateQuery();
//     const [deleteState] = useDeleteStateMutation();

//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     // Handle loading and error states
//     if (isLoading) {
//         return <div className="text-center">Loading...</div>;
//     }

//     if (error) {
//         return <div className="text-center text-danger">Error loading states: {error.message}</div>;
//     }

//     // Filter states based on search input
//     const filteredStates = states?.filter(state =>
//         state.name.toLowerCase().includes(searchTerm.toLowerCase())
//     ) || [];

//     // Pagination calculations
//     const totalPages = Math.ceil(filteredStates.length / itemsPerPage);
//     const currentItems = filteredStates.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     // Delete state handler
//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this state?")) {
//             try {
//                 await deleteState(id).unwrap();
//                 toast.success("State deleted successfully!");
//                 refetch(); // Refetch the list of states after deletion
//             } catch (error) {
//                 toast.error("Failed to delete state: " + error.message);
//             }
//         }
//     };

//     return (
//         <Container>
//             <ToastContainer />
//             <h5 className="mb-4">State List</h5>
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <Link to="/dashboard/add-state" className="btn btn-primary">
//                     + Add State
//                 </Link>
//                 <input
//                     className="form-control w-50"
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search states..."
//                 />
//             </div>

//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Country</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.map((state, i) => (
//                         <tr key={state._id}>
//                             <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
//                             <td>{state.name}</td>
//                             <td>{state.country?.name}</td>
//                             <td>
//                                 <Link
//                                     to={`/dashboard/edit-state/${state._id}`}
//                                     className="btn btn-sm btn-primary"
//                                 >
//                                     Edit
//                                 </Link>
//                                 <Button
//                                     variant="danger"
//                                     size="sm"
//                                     className="ms-2"
//                                     onClick={() => handleDelete(state._id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Pagination */}
//             {totalPages > 1 && (
//                 <nav>
//                     <ul className="pagination justify-content-center">
//                         {[...Array(totalPages)].map((_, index) => (
//                             <li
//                                 key={index}
//                                 className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
//                             >
//                                 <button
//                                     className="page-link"
//                                     onClick={() => setCurrentPage(index + 1)}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             )}
//         </Container>
//     );
// };

// export default StateList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button, Spinner, Container, Card, Form, Pagination } from "react-bootstrap";
import { useGetStateQuery, useDeleteStateMutation, useUpdateStateMutation } from "../../../../store/features/location/state/stateApi";

const StateList = () => {
    const { data: states, isLoading, error, refetch } = useGetStateQuery();
    const [deleteState] = useDeleteStateMutation();
    const [updateState] = useUpdateStateMutation();

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
                Error loading states: {error.message}
            </div>
        );
    }

    // Filter states based on search input
    const filteredStates = states?.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Pagination calculations
    const totalPages = Math.ceil(filteredStates.length / itemsPerPage);
    const currentItems = filteredStates.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Delete state handler
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this state?")) {
            try {
                await deleteState(id).unwrap();
                toast.success("State deleted successfully!");
                refetch(); // Refetch the list of states after deletion
            } catch (error) {
                toast.error("Failed to delete state: " + error.message);
            }
        }
    };

    return (
        <Container className="mt-4">
            <ToastContainer />
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">State List</h5>
                    <Link to="/dashboard/add-state" className="btn btn-primary">
                        + Add State
                    </Link>
                </Card.Header>
                <Card.Body>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Search states..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form.Group>

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((state, i) => (
                                    <tr key={state._id}>
                                        <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                        <td>{state.name}</td>
                                        <td>{state.country?.name}</td>
                                        <td>
                                            <Link
                                                to={`/dashboard/edit-state/${state._id}`}
                                                className="btn btn-sm btn-primary me-2"
                                            >
                                                Edit
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(state._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No states found
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

export default StateList;