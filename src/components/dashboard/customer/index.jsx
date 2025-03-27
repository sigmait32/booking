


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchCustomers, deleteCustomer, resetDeleteCustomer } from "../../../store/reducers/customerReducer";


// const Customer = () => {
//     const dispatch = useDispatch();
//     const { customers, loading, deleteStatus, error } = useSelector(state => state.customers);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const customersPerPage = 10;

//     useEffect(() => {
//         dispatch(fetchCustomers());
//     }, [dispatch]);


//     console.log("customer customers =>", customers)


//     useEffect(() => {
//         if (deleteStatus === 'succeeded') {
//             toast.success('Sub-category deleted successfully!');
//             dispatch(resetDeleteCustomer()); // Reset the deleteStatus to 'idle'
//         } else if (deleteStatus === 'failed') {
//             toast.error('Failed to delete sub-category!');
//             dispatch(resetDeleteCustomer()); // Reset the deleteStatus to 'idle'
//         }
//     }, [deleteStatus, dispatch]);

//     // useEffect(() => {
//     //     if (successMessage) {
//     //         toast.success(successMessage);
//     //         dispatch(resetDeleteCustomer());
//     //     }
//     //     if (error) {
//     //         toast.error(error);
//     //         dispatch(resetDeleteCustomer());
//     //     }
//     // }, [successMessage, error, dispatch]);

//     // Filter customers based on search input
//     const filteredCategories = customers.filter(item =>
//         item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination calculations
//     const totalPages = Math.ceil(filteredCategories.length / customersPerPage);
//     const currentItems = filteredCategories.slice((currentPage - 1) * customersPerPage, currentPage * customersPerPage);

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this category?")) {
//             dispatch(deleteCustomer(id));
//         }
//     };

//     return (
//         <>
//             <ToastContainer />
//             <div className="container-fluid">
//                 <div className="row row-cols-1 g-3 g-md-5">
//                     <div className="col">
//                         <div className="bg-white px-4 py-5 rounded-3">
//                             <div className="d-flex justify-content-between align-customers-center mb-4">
//                                 <Link to="/dashboard/add-customer" className="btn btn-primary">+ Add Customer</Link>

//                                 <input
//                                     className="form-control w-50"
//                                     type="text"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     placeholder="Search customers..."
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

//                                                 <th>Full Name</th>
//                                                 <th>Email</th>
//                                                 <th>Mobile No</th>
//                                                 <th> GST Number </th>
//                                                 <th> Address </th>
//                                                 <th colSpan={2}>Actions</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {currentItems.length > 0 ? (
//                                                 currentItems.map((category, i) => (
//                                                     <tr key={category._id}>
//                                                         <td>{(currentPage - 1) * customersPerPage + i + 1}</td>

//                                                         <td>{category.fullName}</td>
//                                                         <td>{category.email}</td>
//                                                         <td>{category.mobileNo}</td>
//                                                         <td>{category.gst_number}</td>
//                                                         <td>{category.address.substring(0, 20)} ... </td>
//                                                         <td>
//                                                             <Link to={`/dashboard/edit-customer/${category._id}`} className="btn btn-sm btn-primary">Edit</Link>
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
//                                                     <td colSpan="4" className="text-center">No customers found</td>
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

// export default Customer;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCustomers, deleteCustomer, resetDeleteStatus } from "../../../store/reducers/customerReducer";

const CustomerList = () => {
    const dispatch = useDispatch();
    const { customers = [], loading, deleteStatus, error } = useSelector(state => state.customers); // Fallback for customers

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    useEffect(() => {
        console.log('Fetching customers...');
        dispatch(fetchCustomers());
    }, [dispatch]);

    useEffect(() => {
        console.log('Items:', customers);
    }, [customers]);

    useEffect(() => {
        if (deleteStatus === 'succeeded') {
            toast.success('Customer deleted successfully!');
            dispatch(resetDeleteStatus());
        } else if (deleteStatus === 'failed') {
            toast.error(error || 'Failed to delete customer!');
            dispatch(resetDeleteStatus());
        }
    }, [deleteStatus, dispatch, error]);

    // Filter customers based on search input
    const filteredCustomers = customers.filter(item =>
        item.fullName && item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
    const currentItems = filteredCustomers.slice((currentPage - 1) * customersPerPage, currentPage * customersPerPage);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            dispatch(deleteCustomer(id));
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container-fluid">
                <div className="row row-cols-1 g-3 g-md-5">
                    <div className="col">
                        <div className="bg-white px-4 py-5 rounded-3">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Link to="/dashboard/add-customer" className="btn btn-primary">+ Add Customer</Link>

                                <input
                                    className="form-control w-50"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search customers..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="bg-white rounded-3 shadow-sm p-3">
                            {loading ? (
                                <div className="text-center">Loading...</div>
                            ) : (
                                <>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Full Name</th>
                                                <th>Email</th>
                                                <th>Mobile No</th>
                                                <th>GST Number</th>
                                                <th>Address</th>
                                                <th colSpan={2}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.length > 0 ? (
                                                currentItems.map((customer, i) => (
                                                    <tr key={customer._id}>
                                                        <td>{(currentPage - 1) * customersPerPage + i + 1}</td>
                                                        <td>{customer.fullName.substr(0, 9) || "N/A"} ...</td>
                                                        <td>{customer.email || "N/A"}</td>
                                                        <td>{customer.mobileNo || "N/A"}</td>
                                                        <td>{customer.gst_number || "N/A"}</td>
                                                        <td>{customer.address ? customer.address.substring(0, 20) + "..." : "N/A"}</td>
                                                        <td>
                                                            <Link to={`/dashboard/edit-customer/${customer._id}`} className="btn btn-sm btn-primary">Edit</Link>
                                                            <button
                                                                className="btn btn-sm btn-danger ms-2"
                                                                onClick={() => handleDelete(customer._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No customers found</td>
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
        </>
    );
};

export default CustomerList;