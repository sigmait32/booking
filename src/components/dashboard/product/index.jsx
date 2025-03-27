
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import DataTable from "react-data-table-component";
// import { useGetProductQuery, useDeleteProductMutation } from "../../../store/features/product/productApi";
// import BASE_URL from "../../../utils/imageConfig";

// const Product = () => {
//     const { data: products, isLoading, error, refetch } = useGetProductQuery();
//     const [deleteProduct] = useDeleteProductMutation();

//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     useEffect(() => {
//         if (refetch) refetch()
//     }, [refetch])



//     // Filter products based on search input
//     const filteredProducts = products?.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination calculations
//     const currentItems = filteredProducts?.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this product?")) {
//             try {
//                 await deleteProduct(id).unwrap();
//                 toast.success(`Product with ID ${id} deleted successfully!`);
//                 refetch();
//             } catch (error) {
//                 toast.error("Failed to delete the product.");
//             }
//         }
//     };


//     // Columns for the DataTable
//     const columns = [
//         {
//             name: "#",
//             selector: (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
//             sortable: true,
//         },
//         {
//             name: "Image",
//             cell: (row) => (
//                 <img
//                     src={`${BASE_URL}${row?.images?.[0]?.url || "/default-img.png"}`}
//                     alt={row.name}
//                     style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
//                 />
//             ),
//         },
//         {
//             name: "Name",
//             selector: (row) => row.name,
//             sortable: true,
//         },
//         {
//             name: "Price",
//             selector: (row) => `$${row.price}`,
//             sortable: true,
//         },
//         {
//             name: "Category",
//             selector: (row) => row.category?.name || "N/A", // Access the `name` property of the category object
//             sortable: true,
//         },
//         {
//             name: "Subcategory",
//             selector: (row) => row.subCategory?.name || "N/A", // Access the `name` property of the subcategory object
//             sortable: true,
//         },
//         {
//             name: "Stock",
//             selector: (row) => row.stock,
//             sortable: true,
//         },
//         {
//             name: "Actions",
//             cell: (row) => (
//                 <div style={{ display: "flex", gap: "8px" }}>
//                     <Link to={`/dashboard/edit-product/${row._id}`} className="btn btn-sm btn-primary">
//                         Edit
//                     </Link>
//                     <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleDelete(row._id)}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ),
//             width: "150px", // Fixed width for the Actions column
//         },
//     ];

//     // Show loading spinner while data is being fetched
//     if (isLoading) {
//         return (
//             <div className="text-center py-5">
//                 <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     // Show error message if there's an error
//     if (error) {
//         return (
//             <div className="text-center py-5">
//                 <div className="alert alert-danger" role="alert">
//                     Failed to load products. Please try again later.
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <ToastContainer />
//             <div className="container-fluid">
//                 <div className="row row-cols-1 g-3 g-md-5">
//                     <div className="col">
//                         <div className="bg-white px-4 py-5 rounded-3">
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <Link to="/dashboard/add-product" className="btn btn-primary">
//                                     + Add Product
//                                 </Link>
//                                 <input
//                                     className="form-control w-50"
//                                     type="text"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     placeholder="Search products..."
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col">
//                         <div className="bg-white rounded-3 shadow-sm p-3">
//                             <DataTable
//                                 columns={columns}
//                                 data={currentItems}
//                                 pagination
//                                 paginationServer
//                                 paginationTotalRows={filteredProducts?.length}
//                                 paginationPerPage={itemsPerPage}
//                                 paginationDefaultPage={currentPage}
//                                 onChangePage={setCurrentPage}
//                                 noDataComponent={<div className="text-center py-4">No products found</div>}
//                                 customStyles={{
//                                     headCells: {
//                                         style: {
//                                             backgroundColor: "#f8f9fa",
//                                             fontWeight: "bold",
//                                         },
//                                     },
//                                     rows: {
//                                         style: {
//                                             "&:hover": {
//                                                 backgroundColor: "#f1f1f1",
//                                             },
//                                         },
//                                     },
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Product;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import {
    useGetProductQuery,
    useDeleteProductMutation
} from "../../../store/features/product/productApi";
import BASE_URL from "../../../utils/imageConfig";
import './ProductCart.css';

const ProductManagement = () => {
    // State Management
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // API Hooks
    const {
        data: products = [],
        isLoading,
        error,
        refetch
    } = useGetProductQuery();
    const [deleteProduct] = useDeleteProductMutation();

    // Side Effects
    useEffect(() => {
        if (refetch) refetch();
    }, [refetch]);

    // Data Processing
    const filteredProducts = products?.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentItems = filteredProducts?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handlers
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id).unwrap();
                toast.success("Product deleted successfully!");
                refetch();
            } catch (error) {
                toast.error("Failed to delete product.");
            }
        }
    };

    // Table Configuration
    const columns = [
        {
            name: "#",
            selector: (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
            sortable: true,
            width: "70px"
        },
        {
            name: "Product",
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <img
                        src={`${BASE_URL}${row?.images?.[0]?.url || "/default-img.png"}`}
                        alt={row.name}
                        className="product-thumbnail"
                    />
                    <div className="ms-3">
                        <div className="fw-semibold">{row.name}</div>
                        <div className="text-muted small product-description">
                            {row.description || "No description available"}
                        </div>
                    </div>
                </div>
            ),
            minWidth: "250px"
        },
        {
            name: "Price",
            selector: (row) => `$${row.price.toFixed(2)}`,
            sortable: true,
            width: "120px"
        },
        {
            name: "Stock",
            cell: (row) => (
                <span className={`badge ${row.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {row.stock > 0 ? `${row.stock} in stock` : 'Out of stock'}
                </span>
            ),
            sortable: true,
            width: "120px"
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link
                        to={`/dashboard/edit-product/${row._id}`}
                        className="btn btn-sm btn-outline-primary"
                        title="Edit product"
                    >
                        <i className="fa fa-edit"></i>
                    </Link>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(row._id)}
                        title="Delete product"
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                    <Link
                        to={`/product/${row._id}`}
                        className="btn btn-sm btn-outline-secondary"
                        title="View details"
                    >
                        <i className="fa fa-eye"></i>
                    </Link>
                </div>
            ),
            width: "180px"
        },
    ];

    // Loading and Error States
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mx-3 mt-3">
                <i className="fa fa-exclamation-circle me-2"></i>
                Failed to load products. Please try again later.
            </div>
        );
    }

    return (
        <div className="container-fluid py-3">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header Section */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                        <div className="mb-3 mb-md-0">
                            <h5 className="card-title mb-0">
                                <i className="fa fa-cubes me-2 text-primary"></i>
                                Product Management
                            </h5>
                            <p className="text-muted small mb-0">
                                Manage your product inventory and listings
                            </p>
                        </div>
                        <div className="d-flex flex-column flex-md-row gap-3">
                            <Link
                                to="/dashboard/add-product"
                                className="btn btn-primary"
                            >
                                <i className="fa fa-plus me-2"></i> Add Product
                            </Link>
                            <div className="search-box">
                                <i className="fa fa-search search-icon"></i>
                                <input
                                    type="text"
                                    className="form-control ps-4"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table Section */}
            <div className="card border-0 shadow-sm">
                <DataTable
                    columns={columns}
                    data={currentItems}
                    pagination
                    paginationServer
                    paginationTotalRows={filteredProducts?.length}
                    paginationPerPage={itemsPerPage}
                    paginationDefaultPage={currentPage}
                    onChangePage={setCurrentPage}
                    noDataComponent={
                        <div className="text-center py-5">
                            <i className="fa fa-box-open fa-3x text-muted mb-3"></i>
                            <h5>No products found</h5>
                            <p className="text-muted">
                                {searchTerm ?
                                    "Try a different search term" :
                                    "Add your first product to get started"}
                            </p>
                        </div>
                    }
                    customStyles={{
                        head: {
                            style: {
                                backgroundColor: '#f8fafc',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.5px'
                            }
                        },
                        headCells: {
                            style: {
                                paddingLeft: '1rem',
                                paddingRight: '1rem',
                            }
                        },
                        cells: {
                            style: {
                                paddingLeft: '1rem',
                                paddingRight: '1rem',
                            }
                        },
                        rows: {
                            style: {
                                '&:not(:last-of-type)': {
                                    borderBottom: '1px solid #f1f5f9'
                                },
                                '&:hover': {
                                    backgroundColor: '#f8fafc'
                                }
                            }
                        }
                    }}
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </div>
    );
};

export default ProductManagement;