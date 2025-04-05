

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import { fetchCategories, deleteCategory, clearMessage } from "../../../../store/reducers/categoryReducer";
// import { useGetCountryQuery } from "../../../../store/features/location/country/countryApi";


// const CountryList = () => {
//     const dispatch = useDispatch();
//     // const { countries, loading, successMessage, error } = useSelector(state => state.category);

//     const { data: countries, isLoading, error } = useGetCountryQuery();

//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;



//     // Filter countries based on search input
//     const filteredCategories = countries.filter(category =>
//         category.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination calculations
//     const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
//     const currentItems = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this category?")) {
//             dispatch(deleteCategory(id));
//         }
//     };

//     return (
//         <>
//             <ToastContainer />
//             <div className="container-fluid">
//                 <div className="row row-cols-1 g-3 g-md-5">
//                     <div className="col">
//                         <div className="bg-white px-4 py-5 rounded-3">
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <Link to="/dashboard/add-category" className="btn btn-primary">+ Add Country</Link>
//                                 <input
//                                     className="form-control w-50"
//                                     type="text"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     placeholder="Search countries..."
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col">
//                         <div className="bg-white rounded-3 shadow-sm p-3">
//                             {loading ? (
//                                 <div className="text-center">Loading...</div>
//                             ) : (
//                                 <>
//                                     <table className="table">
//                                         <thead>
//                                             <tr>
//                                                 <th>#</th>

//                                                 <th>Name</th>
//                                                 <th>Actions</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {currentItems.length > 0 ? (
//                                                 currentItems.map((category, i) => (
//                                                     <tr key={category._id}>
//                                                         <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>

//                                                         <td>{category.name}</td>
//                                                         <td>
//                                                             <Link to={`/dashboard/edit-category/${category._id}`} className="btn btn-sm btn-primary">Edit</Link>
//                                                             <button
//                                                                 className="btn btn-sm btn-danger ms-2"
//                                                                 onClick={() => handleDelete(category._id)}
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="4" className="text-center">No countries found</td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>

//                                     {/* Pagination */}
//                                     {totalPages > 1 && (
//                                         <nav>
//                                             <ul className="pagination justify-content-center">
//                                                 {[...Array(totalPages)].map((_, index) => (
//                                                     <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
//                                                         <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
//                                                             {index + 1}
//                                                         </button>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </nav>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CountryList;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    useGetCountryQuery,
    useDeleteCountryMutation
} from "../../../../store/features/location/country/countryApi";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { FaGlobeAmericas } from "react-icons/fa";
import { Modal, Button, Spinner, Badge } from "react-bootstrap";

const CountryList = () => {
    const { data: countries, isLoading, error, refetch } = useGetCountryQuery();
    const [deleteCountry] = useDeleteCountryMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [countryToDelete, setCountryToDelete] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        if (refetch) refetch();
    }, [refetch]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading countries...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mx-3 mt-3">
                <i className="fa fa-exclamation-circle me-2"></i>
                Error loading countries: {error.message}
            </div>
        );
    }

    const filteredCountries = countries?.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
    const currentItems = filteredCountries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async (id) => {
        setShowDeleteModal(false);
        try {
            await deleteCountry(id).unwrap();
            toast.success("Country deleted successfully!");
            refetch();
        } catch (error) {
            toast.error("Failed to delete country: " + error.message);
        }
    };

    const openDeleteModal = (id) => {
        setCountryToDelete(id);
        setShowDeleteModal(true);
    };

    return (
        <div className="container-fluid py-4">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header Section */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                        <div className="mb-3 mb-md-0">
                            <h5 className="card-title mb-0 d-flex align-items-center">
                                <FaGlobeAmericas className="me-2 text-primary" />
                                Country Management
                            </h5>
                            <p className="text-muted small mb-0">
                                Manage your country listings ({filteredCountries.length} total)
                            </p>
                        </div>
                        <div className="d-flex flex-column flex-md-row gap-3">
                            <Link
                                to="/dashboard/add-country"
                                className="btn btn-primary d-flex align-items-center"
                            >
                                <FiPlus className="me-2" /> Add Country
                            </Link>
                            <div className="position-relative">
                                <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                                <input
                                    type="text"
                                    className="form-control ps-5"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Search countries..."
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
                </div>
            </div>

            {/* Data Table Section */}
            <div className="card border-0 shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th width="5%">#</th>
                                <th width="75%">Country Name</th>
                                <th width="20%" className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((country, i) => (
                                    <tr key={country._id}>
                                        <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                        <td>
                                            <strong>{country.name}</strong>
                                        </td>
                                        <td className="text-end">
                                            <div className="d-flex justify-content-end gap-2">
                                                <Link
                                                    to={`/dashboard/edit-country/${country._id}`}
                                                    className="btn btn-sm btn-outline-primary d-flex align-items-center"
                                                >
                                                    <FiEdit2 className="me-1" /> Edit
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                                    onClick={() => openDeleteModal(country._id)}
                                                >
                                                    <FiTrash2 className="me-1" /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-5">
                                        {searchTerm ? (
                                            <div>
                                                <FiSearch size={24} className="text-muted mb-2" />
                                                <p>No countries found matching your search</p>
                                                <button
                                                    className="btn btn-link text-primary"
                                                    onClick={() => setSearchTerm("")}
                                                >
                                                    Clear search
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <FaGlobeAmericas size={24} className="text-muted mb-2" />
                                                <p>No countries available</p>
                                                <Link to="/dashboard/add-country" className="btn btn-sm btn-primary mt-2">
                                                    Add First Country
                                                </Link>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="card-footer bg-white border-0">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <div className="text-muted small mb-2 mb-md-0">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                {Math.min(currentPage * itemsPerPage, filteredCountries.length)} of{" "}
                                {filteredCountries.length} entries
                            </div>
                            <nav>
                                <ul className="pagination pagination-sm mb-0">
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                        >
                                            First
                                        </button>
                                    </li>
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </li>
                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Last
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-2">
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    Are you sure you want to delete this country? This action cannot be undone.
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
                        onClick={() => handleDelete(countryToDelete)}
                    >
                        Delete Country
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CountryList;