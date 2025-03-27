


import React, { useEffect, useState } from 'react';


import { Link, useNavigate } from 'react-router-dom';
import { Spinner, Alert, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import BASE_URL from "../../../utils/imageConfig";
import { useGetLogoQuery, useDeleteLogoMutation } from '../../../store/features/logo/logoApi';
// import {useGetLogi}


const LogoList = () => {

    const { data: logos, isLoading, error, refetch } = useGetLogoQuery();
    const [deleteLogo] = useDeleteLogoMutation();


    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (refetch) refetch()
    }, [refetch])


    const filteredCategories = logos?.filter(logo =>
        logo?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredCategories?.length / itemsPerPage);
    const currentItems = filteredCategories?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    // Handle banner deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await deleteLogo(id).unwrap();
                toast.success(`Banner with ID ${id} deleted successfully!`);
                refetch(); // Refetch logos after deletion
            } catch (error) {
                toast.error("Failed to delete the banner.");
            }
        }
    };

    // Columns for the DataTable
    const columns = [
        {
            name: "#",
            selector: (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
            sortable: true,
        },
        {
            name: "Image",
            cell: (row) => (
                <img
                    // src={`${BASE_URL}${row?.image || "/default-img.png"}`}
                    src={row.image ? `${BASE_URL}${row.image}` : "/default-img.png"}
                    alt={row.name}
                    style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
                />
            ),
        },

        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Link to={`/dashboard/edit-logo/${row._id}`} className="btn btn-sm btn-primary">
                        Edit
                    </Link>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(row._id)}
                    >
                        Delete
                    </button>
                </div>
            ),
            width: "150px", // Fixed width for the Actions column
        },
    ];

    // Show loading spinner while data is being fetched
    if (isLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Show error message if there's an error
    if (error) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger" role="alert">
                    Failed to load logos. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row row-cols-1 g-3 g-md-5">
                <div className="col">
                    <div className="bg-white px-4 py-5 rounded-3">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <Link to="/dashboard/add-logo" className="btn btn-primary">+ Add Logo</Link>
                            <input
                                className="form-control w-50"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search logos..."
                            />
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="bg-white rounded-3 shadow-sm p-3">
                        {isLoading ? (
                            <div className="text-center">Loading...</div>
                        ) : (
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.length > 0 ? (
                                            currentItems.map((logo, i) => (
                                                <tr key={logo._id}>
                                                    <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                                    <td>
                                                        <img
                                                            src={logo.image ? `${BASE_URL}${logo.image}` : "/default-img.png"}
                                                            style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
                                                            alt="Category"
                                                        />
                                                        {/* <img
                                                        src={logo.image || "/default-img.jpg"}
                                                        onError={(e) => (e.target.src = "/default-logo.png")}
                                                        alt={logo.name}
                                                        style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
                                                    /> */}
                                                    </td>
                                                    <td>{logo.name}</td>
                                                    <td>
                                                        <Link to={`/dashboard/edit-logo/${logo._id}`} className="btn btn-sm btn-primary">Edit</Link>
                                                        {/* <button
                                                            className="btn btn-sm btn-danger ms-2"
                                                            onClick={() => handleDelete(logo._id)}
                                                        >
                                                            Delete
                                                        </button> */}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">No logos found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <nav>
                                        <ul className="pagination justify-content-center">
                                            {[...Array(totalPages)].map((_, index) => (
                                                <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
                                                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoList;
