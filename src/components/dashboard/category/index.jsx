

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchCategories, deleteCategory, clearMessage } from "../../../store/reducers/categoryReducer";
// import BASE_URL from "../../../utils/imageConfig";

// const Category = () => {
//     const dispatch = useDispatch();
//     const { categories, loading, successMessage, error } = useSelector(state => state.category);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     useEffect(() => {
//         dispatch(fetchCategories());
//     }, [dispatch]);

//     useEffect(() => {
//         if (successMessage) {
//             toast.success(successMessage);
//             dispatch(clearMessage());
//         }
//         if (error) {
//             toast.error(error);
//             dispatch(clearMessage());
//         }
//     }, [successMessage, error, dispatch]);

//     // Filter categories based on search input
//     const filteredCategories = categories.filter(category =>
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
//                                 <Link to="/dashboard/add-category" className="btn btn-primary">+ Add Category</Link>
//                                 <input
//                                     className="form-control w-50"
//                                     type="text"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     placeholder="Search categories..."
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
//                                                 <th>Image</th>
//                                                 <th>Name</th>
//                                                 <th>Actions</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {currentItems.length > 0 ? (
//                                                 currentItems.map((category, i) => (
//                                                     <tr key={category._id}>
//                                                         <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
//                                                         <td>
//                                                             <img
//                                                                 src={category.image ? `${BASE_URL}${category.image}` : "/default-img.png"}
//                                                                 style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
//                                                                 alt="Category"
//                                                             />
//                                                             {/* <img
//                                                                 src={category.image || "/default-img.jpg"}
//                                                                 onError={(e) => (e.target.src = "/default-category.png")}
//                                                                 alt={category.name}
//                                                                 style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
//                                                             /> */}
//                                                         </td>
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
//                                                     <td colSpan="4" className="text-center">No categories found</td>
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

// export default Category;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
// import { useGetBannersQuery, useDeleteBannerMutation } from "../../../store/features/category/categoryApi";
import { useGetCategoryQuery, useDeleteCategoryMutation } from "../../../store/features/category/categoryApi";
import BASE_URL from "../../../utils/imageConfig";

const Banner = () => {
    // Fetch category data
    const { data: categories, isLoading, error, refetch } = useGetCategoryQuery();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // console.log("category is ======>", categories)



    useEffect(() => {
        if (refetch) refetch()
    }, [refetch])

    // Filter categories based on search input
    const filteredCategory = categories?.filter((category) =>
        category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const currentItems = filteredCategory?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle category deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(id).unwrap();
                toast.success(`Banner with ID ${id} deleted successfully!`);
                refetch(); // Refetch categories after deletion
            } catch (error) {
                console.log("error is", error)
                toast.error("Failed to delete the category.");
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
                    <Link to={`/dashboard/edit-category/${row._id}`} className="btn btn-sm btn-primary">
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
                    Failed to load categories. Please try again later.
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
                                <Link to="/dashboard/add-category" className="btn btn-primary">
                                    + Add Category
                                </Link>
                                <input
                                    className="form-control w-50"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search categories..."
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
                                paginationTotalRows={filteredCategory?.length}
                                paginationPerPage={itemsPerPage}
                                paginationDefaultPage={currentPage}
                                onChangePage={setCurrentPage}
                                noDataComponent={<div className="text-center py-4">No categories found</div>}
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
