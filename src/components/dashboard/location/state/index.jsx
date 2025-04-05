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
import {
    Table, Button, Spinner, Container, Card, Form,
    Pagination, Modal, Badge, InputGroup
} from "react-bootstrap";
import {
    useGetStateQuery,
    useDeleteStateMutation,
    useUpdateStateMutation
} from "../../../../store/features/location/state/stateApi";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";

const StateList = () => {
    const { data: states, isLoading, isFetching, error, refetch } = useGetStateQuery();
    const [deleteState] = useDeleteStateMutation();
    const [updateState] = useUpdateStateMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [stateToDelete, setStateToDelete] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        if (refetch) refetch();
    }, [refetch]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading states...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mx-3 mt-3">
                <i className="fa fa-exclamation-circle me-2"></i>
                Error loading states: {error.message}
            </div>
        );
    }

    const filteredStates = states?.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.country?.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const totalPages = Math.ceil(filteredStates.length / itemsPerPage);
    const currentItems = filteredStates.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async (id) => {
        setShowDeleteModal(false);
        try {
            await deleteState(id).unwrap();
            toast.success("State deleted successfully!");
            refetch();
        } catch (error) {
            toast.error("Failed to delete state: " + error.message);
        }
    };

    const openDeleteModal = (id) => {
        setStateToDelete(id);
        setShowDeleteModal(true);
    };

    return (
        <Container fluid className="px-lg-4 py-3">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header Section */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                        <div className="mb-3 mb-md-0">
                            <h5 className="card-title mb-0 d-flex align-items-center">
                                <FaMapMarkerAlt className="me-2 text-primary" />
                                State Management
                            </h5>
                            <p className="text-muted small mb-0">
                                Manage your state listings ({filteredStates.length} total)
                            </p>
                        </div>
                        <div className="d-flex flex-column flex-md-row gap-3">
                            <Link
                                to="/dashboard/add-state"
                                className="btn btn-primary d-flex align-items-center"
                            >
                                <FiPlus className="me-2" /> Add State
                            </Link>
                            <div className="position-relative">
                                <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                                <Form.Control
                                    type="text"
                                    className="ps-5"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Search states or countries..."
                                />
                                {searchTerm && (
                                    <button
                                        className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-3 p-0"
                                        onClick={() => setSearchTerm("")}
                                    >
                                        <FiX className="text-muted" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Data Table Section */}
            <Card className="border-0 shadow-sm">
                <div className="table-responsive">
                    <Table hover className="mb-0">
                        <thead className="table-light">
                            <tr>
                                <th width="5%">#</th>
                                <th width="35%">State Name</th>
                                <th width="40%">Country</th>
                                <th width="20%" className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((state, i) => (
                                    <tr key={state._id}>
                                        <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                        <td>
                                            <strong>{state.name}</strong>
                                        </td>
                                        <td>
                                            {state.country?.name || <span className="text-muted">N/A</span>}
                                        </td>
                                        <td className="text-end">
                                            <div className="d-flex justify-content-end gap-2">
                                                <Link
                                                    to={`/dashboard/edit-state/${state._id}`}
                                                    className="btn btn-sm btn-outline-primary d-flex align-items-center"
                                                >
                                                    <FiEdit2 className="me-1" /> Edit
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                                    onClick={() => openDeleteModal(state._id)}
                                                >
                                                    <FiTrash2 className="me-1" /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5">
                                        {searchTerm ? (
                                            <div>
                                                <FiSearch size={24} className="text-muted mb-2" />
                                                <p>No states found matching your search</p>
                                                <button
                                                    className="btn btn-link text-primary"
                                                    onClick={() => setSearchTerm("")}
                                                >
                                                    Clear search
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <FaMapMarkerAlt size={24} className="text-muted mb-2" />
                                                <p>No states available</p>
                                                <Link to="/dashboard/add-state" className="btn btn-sm btn-primary mt-2">
                                                    Add First State
                                                </Link>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Card.Footer className="bg-white border-0">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <div className="text-muted small mb-2 mb-md-0">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                {Math.min(currentPage * itemsPerPage, filteredStates.length)} of{" "}
                                {filteredStates.length} entries
                            </div>
                            <Pagination className="mb-0">
                                <Pagination.First
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                />
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
                                <Pagination.Last
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                />
                            </Pagination>
                        </div>
                    </Card.Footer>
                )}

                {isFetching && !isLoading && (
                    <Card.Footer className="bg-light py-2">
                        <div className="d-flex align-items-center text-muted">
                            <Spinner animation="border" size="sm" className="me-2" />
                            <small>Updating data...</small>
                        </div>
                    </Card.Footer>
                )}
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-2">
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    Are you sure you want to delete this state? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button
                        variant="outline-secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(stateToDelete)}
                    >
                        Delete State
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default StateList;