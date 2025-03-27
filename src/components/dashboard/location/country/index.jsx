

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
import { useGetCountryQuery, useDeleteCountryMutation } from "../../../../store/features/location/country/countryApi";

const CountryList = () => {
    const { data: countries, isLoading, error, refetch } = useGetCountryQuery();
    const [deleteCountry] = useDeleteCountryMutation(); // Delete mutation hook

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Handle loading and error states

    useEffect(() => {
        if (refetch) refetch()
    }, [refetch])

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">Error loading countries: {error.message}</div>;
    }

    // Ensure countries is an array before filtering
    const filteredCountries = countries?.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Pagination calculations
    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
    const currentItems = filteredCountries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Delete country handler
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this country?")) {
            try {
                // Trigger the delete mutation
                await deleteCountry(id).unwrap();
                toast.success("Country deleted successfully!");
                refetch(); // Refetch the list of countries after deletion
            } catch (error) {
                toast.error("Failed to delete country: " + error.message);
            }
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
                                <Link to="/dashboard/add-country" className="btn btn-primary">
                                    + Add Country
                                </Link>
                                <input
                                    className="form-control w-50"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search countries..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="bg-white rounded-3 shadow-sm p-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((country, i) => (
                                            <tr key={country._id}>
                                                <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                                <td>{country.name}</td>
                                                <td>
                                                    <Link
                                                        to={`/dashboard/edit-country/${country._id}`}
                                                        className="btn btn-sm btn-primary"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="btn btn-sm btn-danger ms-2"
                                                        onClick={() => handleDelete(country._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                No countries found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <nav>
                                    <ul className="pagination justify-content-center">
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
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CountryList;