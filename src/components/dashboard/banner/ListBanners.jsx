// import React, { useState, useEffect } from 'react';
// import { useGetBannersQuery, useDeleteBannerMutation } from '../../../store/features/banner/bannerApi';
// import { Link } from 'react-router-dom';
// import { Table, Button, Form, Container } from 'react-bootstrap';
// import BASE_URL from '../../../utils/imageConfig';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ListBanners = () => {
//     const { data: banners, isLoading, error, refetch } = useGetBannersQuery();
//     const [deleteBanner] = useDeleteBannerMutation();
//     const [search, setSearch] = useState('');

//     useEffect(() => {
//         if (refetch) refetch()
//     }, [refetch])

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this banner?')) {
//             try {
//                 await deleteBanner(id).unwrap();
//                 toast.success('Banner deleted successfully!');
//             } catch (err) {
//                 toast.error('Failed to delete banner.');
//             }
//         }
//     };

//     if (isLoading) return <p className="text-center">Loading...</p>;
//     if (error) return <p className="text-danger text-center">Error fetching banners</p>;

//     return (
//         <Container className="mt-4">
//             <ToastContainer position="top-right" autoClose={3000} />
//             <h2 className="text-center mb-4">Banner List</h2>
//             <div className="d-flex justify-content-between mb-3">
//                 <Form.Control
//                     type="text"
//                     placeholder="Search banners..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="w-25"
//                 />
//                 <Link to="/dashboard/add-banner">
//                     <Button variant="primary">Add New Banner</Button>
//                 </Link>
//             </div>
//             <Table striped bordered hover responsive>
//                 <thead className="thead-dark">
//                     <tr>
//                         <th>#</th>
//                         <th>Title</th>
//                         <th>Description</th>
//                         <th>Image</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {banners?.filter(banner =>
//                         banner.title.toLowerCase().includes(search.toLowerCase())
//                     ).map((banner, index) => (
//                         <tr key={banner._id}>
//                             <td>{index + 1}</td>
//                             <td>{banner.title}</td>
//                             <td>{banner.description}</td>
//                             <td>
//                                 <img
//                                     src={banner.image ? `${BASE_URL}${banner.image}` : "/default-img.png"}
//                                     style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
//                                     alt="Banner"
//                                 />
//                             </td>
//                             <td>
//                                 <Link to={`/dashboard/edit-banner/${banner._id}`}>
//                                     <Button variant="warning" size="sm" className="me-2">Edit</Button>
//                                 </Link>
//                                 <Button variant="danger" size="sm" onClick={() => handleDelete(banner._id)}>Delete</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default ListBanners;

// // import React, { useState } from 'react';
// // import { useGetBannersQuery, useDeleteBannerMutation } from '../../../store/features/banner/bannerApi';
// // import { Link } from 'react-router-dom';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import BASE_URL from '../../../utils/imageConfig';

// // const ListBanners = () => {
// //     const { data: banners, isLoading, error } = useGetBannersQuery();
// //     const [deleteBanner] = useDeleteBannerMutation();
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const itemsPerPage = 10; // Number of banners per page

// //     console.log("Banner data is:", banners);

// //     // Ensure banners is always an array and filter safely
// //     const filteredBanners = banners?.filter(banner =>
// //         banner.name && banner.name.toLowerCase().includes(searchTerm.toLowerCase())
// //     ) || [];

// //     // Pagination calculations
// //     const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
// //     const currentItems = filteredBanners.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// //     const handleDelete = async (id) => {
// //         if (window.confirm('Are you sure you want to delete this banner?')) {
// //             try {
// //                 await deleteBanner(id).unwrap();
// //                 toast.success('Banner deleted successfully!');
// //             } catch (err) {
// //                 toast.error('Failed to delete banner.');
// //             }
// //         }
// //     };

// //     if (isLoading) return <p className="text-center">Loading...</p>;
// //     if (error) return <p className="text-danger text-center">Error fetching banners</p>;

// //     return (
// //         <div className="container-fluid">
// //             <div className="row row-cols-1 g-3 g-md-5">
// //                 <div className="col">
// //                     <div className="bg-white px-4 py-5 rounded-3">
// //                         <div className="d-flex justify-content-between align-items-center mb-4">
// //                             <Link to="/dashboard/add-banner" className="btn btn-primary">+ Add Banner</Link>
// //                             <input
// //                                 className="form-control w-50"
// //                                 type="text"
// //                                 value={searchTerm}
// //                                 onChange={(e) => setSearchTerm(e.target.value)}
// //                                 placeholder="Search banners..."
// //                             />
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className="col">
// //                     <div className="bg-white rounded-3 shadow-sm p-3">
// //                         {isLoading ? (
// //                             <div className="text-center">Loading...</div>
// //                         ) : (
// //                             <>
// //                                 <table className="table">
// //                                     <thead>
// //                                         <tr>
// //                                             <th>#</th>
// //                                             <th>Image</th>
// //                                             <th>Name</th>
// //                                             <th>Actions</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {currentItems.length > 0 ? (
// //                                             currentItems.map((banner, i) => (
// //                                                 <tr key={banner._id}>
// //                                                     <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
// //                                                     <td>
// //                                                         <img
// //                                                             src={banner.image ? `${BASE_URL}${banner.image}` : "/default-img.png"}
// //                                                             style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
// //                                                             alt="Banner"
// //                                                         />
// //                                                     </td>
// //                                                     <td>{banner.name || "No Name"}</td>
// //                                                     <td>
// //                                                         <Link to={`/dashboard/edit-banner/${banner._id}`} className="btn btn-sm btn-primary">
// //                                                             Edit
// //                                                         </Link>
// //                                                         <button
// //                                                             className="btn btn-sm btn-danger ms-2"
// //                                                             onClick={() => handleDelete(banner._id)}
// //                                                         >
// //                                                             Delete
// //                                                         </button>
// //                                                     </td>
// //                                                 </tr>
// //                                             ))
// //                                         ) : (
// //                                             <tr>
// //                                                 <td colSpan="4" className="text-center">No banners found</td>
// //                                             </tr>
// //                                         )}
// //                                     </tbody>
// //                                 </table>

// //                                 {/* Pagination */}
// //                                 {totalPages > 1 && (
// //                                     <nav>
// //                                         <ul className="pagination justify-content-center">
// //                                             {[...Array(totalPages)].map((_, index) => (
// //                                                 <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
// //                                                     <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
// //                                                         {index + 1}
// //                                                     </button>
// //                                                 </li>
// //                                             ))}
// //                                         </ul>
// //                                     </nav>
// //                                 )}
// //                             </>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>
// //             <ToastContainer />
// //         </div>
// //     );
// // };

// // export default ListBanners;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { useGetBannersQuery, useDeleteBannerMutation } from "../../../store/features/banner/bannerApi";
import BASE_URL from "../../../utils/imageConfig";

const Banner = () => {
    // Fetch banner data
    const { data: banners, isLoading, error, refetch } = useGetBannersQuery();
    const [deleteBanner] = useDeleteBannerMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // console.log("banner is =======>", banners)

    useEffect(() => {
        if (refetch) refetch()
    }, [refetch])

    // Filter banners based on search input
    const filteredBanners = banners?.filter((banner) =>
        banner?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const currentItems = filteredBanners?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle banner deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await deleteBanner(id).unwrap();
                toast.success(`Banner with ID ${id} deleted successfully!`);
                refetch(); // Refetch banners after deletion
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
                    src={`${BASE_URL}${row?.image || "/default-img.png"}`}
                    alt={row.name}
                    style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
                />
            ),
        },

        {
            name: "Name",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Link to={`/dashboard/edit-banner/${row._id}`} className="btn btn-sm btn-primary">
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
                    Failed to load banners. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid">
                <div className="row row-cols-1 g-3 g-md-5">
                    <div className="col">
                        <div className="bg-white px-4 py-5 rounded-3">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Link to="/dashboard/add-banner" className="btn btn-primary">
                                    + Add Banner
                                </Link>
                                <input
                                    className="form-control w-50"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search banners..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="bg-white rounded-3 shadow-sm p-3">
                            <DataTable
                                columns={columns}
                                data={currentItems}
                                pagination
                                paginationServer
                                paginationTotalRows={filteredBanners?.length}
                                paginationPerPage={itemsPerPage}
                                paginationDefaultPage={currentPage}
                                onChangePage={setCurrentPage}
                                noDataComponent={<div className="text-center py-4">No banners found</div>}
                                customStyles={{
                                    headCells: {
                                        style: {
                                            backgroundColor: "#f8f9fa",
                                            fontWeight: "bold",
                                        },
                                    },
                                    rows: {
                                        style: {
                                            "&:hover": {
                                                backgroundColor: "#f1f1f1",
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;