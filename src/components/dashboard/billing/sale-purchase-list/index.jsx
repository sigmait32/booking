
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import DataTable from "react-data-table-component";

// import BASE_URL from "../../../../utils/imageConfig";
// import {
//     useGetSaleEntriesQuery,
//     useDeleteSaleEntryMutation,
// } from "../../../../store/features/sale-service/saleEntryApi";
// // import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
// import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal'

// const ProductManagement = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showModal, setShowModal] = useState(false);

//     const [selectedId, setSelectedId] = useState(null);


//     const itemsPerPage = 10;

//     const {
//         data: products = [],
//         isLoading,
//         error,
//         refetch,
//     } = useGetSaleEntriesQuery();
//     const [deleteEntry] = useDeleteSaleEntryMutation();

//     useEffect(() => {
//         if (refetch) refetch();
//     }, [refetch]);

//     const filteredProducts = products?.filter(
//         (product) =>
//             product?.employeeId?.fullName
//                 .toLowerCase()
//                 .includes(searchTerm.toLowerCase()) ||
//             product?.employeeId?.email
//                 ?.toLowerCase()
//                 .includes(searchTerm.toLowerCase())
//     );

//     const currentItems = filteredProducts?.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );


//     console.log("sale entry is =======>", products)
//     // const handleDelete = async (id) => {
//     //     if (window.confirm("Are you sure you want to delete this product?")) {
//     //         try {
//     //             let response = await deleteEntry(id).unwrap();
//     //             console.log("response is =====>", response)
//     //             toast.success(response.message || "Product deleted successfully!", { position: "top-center" });
//     //             refetch();
//     //         } catch (error) {
//     //             toast.error("Failed to delete product.");
//     //         }
//     //     }
//     // };
//     const handleDeleteClick = (id) => {
//         setSelectedId(id);
//         setShowModal(true);
//     };

//     const handleConfirmDelete = async () => {
//         try {
//             const response = await deleteEntry(selectedId).unwrap();
//             toast.success(response.message || "Product deleted successfully!", { position: "top-center" });
//         } catch (err) {
//             toast.error("Failed to delete.");
//         } finally {
//             setShowModal(false);
//         }
//     };

//     const columns = [
//         {
//             name: "#",
//             selector: (row, index) =>
//                 (currentPage - 1) * itemsPerPage + index + 1,
//             sortable: true,
//             width: "70px",
//         },
//         {
//             name: "Product Image",
//             cell: (row) => (
//                 <img
//                     src={`${BASE_URL}${row?.items[0]?.product?.images?.[0]?.url || "/default-img.png"}`}
//                     alt={row?.items[0]?.product?.name}
//                     className="product-thumbnail"
//                     style={{
//                         width: "50px",
//                         height: "50px",
//                         objectFit: "cover",
//                     }}
//                 />
//             ),
//             width: "120px",
//         },
//         {
//             name: "Employee",
//             selector: (row) => row.employeeId.fullName,
//             sortable: true,
//             width: "120px",
//         },
//         {
//             name: "Customer",
//             selector: (row) => row.customerId.fullName,
//             sortable: true,
//             width: "120px",
//         },
//         {
//             name: "Price",
//             selector: (row) => `₹${row?.items[0]?.price?.toFixed(2)}`,
//             sortable: true,
//             width: "120px",
//         },
//         {
//             name: "Paid",
//             selector: (row) => `₹${row.paidAmount.toFixed(2)}`,
//             sortable: true,
//             width: "120px",
//         },
//         {
//             name: "Balance",
//             selector: (row) => `₹${row.balanceAmount.toFixed(2)}`,
//             sortable: true,
//             width: "120px",
//         },
//         {
//             name: "Payment Mode",
//             selector: (row) => row.paymentMode,
//             sortable: true,
//             width: "120px",
//         },
//         {
//             name: "Actions",
//             cell: (row) => (
//                 <div className="d-flex gap-2">
//                     {/* <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleDelete(row._id)}
//                         title="Delete product"
//                     >
//                         <i className="fa fa-trash"></i>
//                     </button> */}

//                     <button
//                         className="btn btn-outline-danger btn-sm"
//                         onClick={() => handleDeleteClick(row._id)}
//                     >
//                         <i className="fa fa-trash"></i>
//                     </button>
//                     <ConfirmDeleteModal
//                         show={showModal}
//                         onHide={() => setShowModal(false)}
//                         onConfirm={handleConfirmDelete}
//                         title="Confirm Deletion"
//                         message="Are you sure you want to permanently delete this record?"
//                     />
//                 </div>
//             ),
//             width: "120px",
//         },
//     ];

//     if (isLoading) {
//         return (
//             <div
//                 className="d-flex justify-content-center align-items-center"
//                 style={{ height: "60vh" }}
//             >
//                 <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="alert alert-danger mx-3 mt-3">
//                 <i className="fa fa-exclamation-circle me-2"></i>
//                 Failed to load products. Please try again later.
//             </div>
//         );
//     }

//     return (
//         <div className="container-fluid py-3">
//             <ToastContainer position="top-right" autoClose={3000} />

//             {/* Header Section */}



//             <div className="card border-0 shadow-sm mb-4">
//                 <div className="card-body">
//                     <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
//                         {/* Left Section - Title & Description */}
//                         <div>
//                             <h5 className="card-title mb-1 d-flex align-items-center">
//                                 <i className="fa fa-users me-2 text-primary"></i>  Sale Entry Management
//                             </h5>
//                             <p className="text-muted small mb-0">
//                                 View, search and manage sale entries.
//                             </p>
//                         </div>

//                         {/* Right Section - Button & Search Box */}
//                         <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
//                             <Link to="/dashboard/sale-service-entry" className="btn btn-primary">
//                                 <i className="fa fa-plus me-2"></i> Add Sale Entry
//                             </Link>
//                             <div className="position-relative">
//                                 <i className="fa fa-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"></i>
//                                 <input
//                                     type="text"
//                                     className="form-control ps-4"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     placeholder="Search employees..."
//                                     style={{ minWidth: "250px" }} // Ensures proper width
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             {/* Data Table Section */}
//             <div className="card border-0 shadow-sm">
//                 <DataTable
//                     columns={columns}
//                     data={currentItems}
//                     pagination
//                     paginationServer
//                     paginationTotalRows={filteredProducts?.length}
//                     paginationPerPage={itemsPerPage}
//                     paginationDefaultPage={currentPage}
//                     onChangePage={setCurrentPage}
//                     noDataComponent={
//                         <div className="text-center py-5">
//                             <i className="fa fa-box-open fa-3x text-muted mb-3"></i>
//                             <h5>No products found</h5>
//                             <p className="text-muted">
//                                 {searchTerm
//                                     ? "Try a different search term"
//                                     : "Add your first product to get started"}
//                             </p>
//                         </div>
//                     }
//                     customStyles={{
//                         head: {
//                             style: {
//                                 backgroundColor: "#f8fafc",
//                                 fontWeight: "600",
//                                 textTransform: "uppercase",
//                                 fontSize: "0.75rem",
//                                 letterSpacing: "0.5px",
//                             },
//                         },
//                         headCells: {
//                             style: {
//                                 paddingLeft: "1rem",
//                                 paddingRight: "1rem",
//                             },
//                         },
//                         cells: {
//                             style: {
//                                 paddingLeft: "1rem",
//                                 paddingRight: "1rem",
//                             },
//                         },
//                         rows: {
//                             style: {
//                                 "&:not(:last-of-type)": {
//                                     borderBottom: "1px solid #f1f5f9",
//                                 },
//                                 "&:hover": {
//                                     backgroundColor: "#f8fafc",
//                                 },
//                             },
//                         },
//                     }}
//                     highlightOnHover
//                     pointerOnHover
//                 />
//             </div>
//         </div>
//     );
// };

// export default ProductManagement;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";

import BASE_URL from "../../../../utils/imageConfig";
import {
    useGetSaleEntriesQuery,
    useDeleteSaleEntryMutation,
} from "../../../../store/features/sale-service/saleEntryApi";
import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal';

const ProductManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const itemsPerPage = 10;

    const {
        data: products = [],
        isLoading,
        error,
        refetch,
    } = useGetSaleEntriesQuery();
    const [deleteEntry] = useDeleteSaleEntryMutation();

    useEffect(() => {
        if (refetch) refetch();
    }, [refetch]);

    const filteredProducts = products?.filter((product) => {
        const fullName = product?.employeeId?.fullName?.toLowerCase() || "";
        const email = product?.employeeId?.email?.toLowerCase() || "";
        return (
            fullName.includes(searchTerm.toLowerCase()) ||
            email.includes(searchTerm.toLowerCase())
        );
    });

    const currentItems = filteredProducts?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteEntry(selectedId).unwrap();
            toast.success(response.message || "Product deleted successfully!", {
                position: "top-center",
            });
            refetch();
        } catch (err) {
            toast.error("Failed to delete.");
        } finally {
            setShowModal(false);
        }
    };

    const columns = [
        {
            name: "#",
            selector: (row, index) =>
                (currentPage - 1) * itemsPerPage + index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: "Product Image",
            cell: (row) => (
                <img
                    src={`${BASE_URL}${row?.items[0]?.product?.images?.[0]?.url || "/default-img.png"}`}
                    alt={row?.items[0]?.product?.name}
                    className="product-thumbnail"
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                    }}
                />
            ),
            width: "120px",
        },
        {
            name: "Employee",
            selector: (row) => row?.employeeId?.fullName || "N/A",
            sortable: true,
            width: "120px",
        },
        {
            name: "Customer",
            selector: (row) => row?.customerId?.fullName || "N/A",
            sortable: true,
            width: "120px",
        },
        {
            name: "Price",
            selector: (row) => `₹${row?.items[0]?.price?.toFixed(2) || "0.00"}`,
            sortable: true,
            width: "120px",
        },
        {
            name: "Paid",
            selector: (row) => `₹${row?.paidAmount?.toFixed(2) || "0.00"}`,
            sortable: true,
            width: "120px",
        },
        {
            name: "Balance",
            selector: (row) => `₹${row?.balanceAmount?.toFixed(2) || "0.00"}`,
            sortable: true,
            width: "120px",
        },
        {
            name: "Payment Mode",
            selector: (row) => row?.paymentMode || "N/A",
            sortable: true,
            width: "120px",
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteClick(row._id)}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                    <ConfirmDeleteModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        onConfirm={handleConfirmDelete}
                        title="Confirm Deletion"
                        message="Are you sure you want to permanently delete this record?"
                    />
                </div>
            ),
            width: "120px",
        },
    ];

    if (isLoading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
            >
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

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                        <div>
                            <h5 className="card-title mb-1 d-flex align-items-center">
                                <i className="fa fa-users me-2 text-primary"></i> Sale Entry Management
                            </h5>
                            <p className="text-muted small mb-0">
                                View, search and manage sale entries.
                            </p>
                        </div>

                        <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
                            <Link to="/dashboard/sale-service-entry" className="btn btn-primary">
                                <i className="fa fa-plus me-2"></i> Add Sale Entry
                            </Link>
                            <div className="position-relative">
                                <i className="fa fa-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"></i>
                                <input
                                    type="text"
                                    className="form-control ps-4"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search employees..."
                                    style={{ minWidth: "250px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                                {searchTerm
                                    ? "Try a different search term"
                                    : "Add your first product to get started"}
                            </p>
                        </div>
                    }
                    customStyles={{
                        head: {
                            style: {
                                backgroundColor: "#f8fafc",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                fontSize: "0.75rem",
                                letterSpacing: "0.5px",
                            },
                        },
                        headCells: {
                            style: {
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                            },
                        },
                        cells: {
                            style: {
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                            },
                        },
                        rows: {
                            style: {
                                "&:not(:last-of-type)": {
                                    borderBottom: "1px solid #f1f5f9",
                                },
                                "&:hover": {
                                    backgroundColor: "#f8fafc",
                                },
                            },
                        },
                    }}
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </div>
    );
};

export default ProductManagement;

