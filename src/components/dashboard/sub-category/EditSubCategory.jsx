
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { updateSubCategory, fetchSubCategories, resetUpdateStatus } from '../../../store/reducers/subCategoryReducer';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // 

// const Page = () => {
//     const { id } = useParams(); // Get the `id` from the URL
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { items, updateStatus, error } = useSelector(state => state.subCategories);
//     const [name, setName] = useState('');

//     console.log("item is ========>", items)

//     // Fetch sub-categories if not already loaded
//     useEffect(() => {
//         if (items.length === 0) {
//             dispatch(fetchSubCategories());
//         }
//     }, [dispatch, items.length]);

//     // Pre-fill the form with the sub-category data
//     useEffect(() => {
//         if (items.length > 0) {
//             const subCategory = items.find(item => item._id === id);
//             if (subCategory) {
//                 setName(subCategory.name);
//             }
//         }
//     }, [items, id]);

//     // Show toast messages based on updateStatus
//     useEffect(() => {
//         if (updateStatus === 'succeeded') {
//             toast.success('Sub-category updated successfully!');
//             dispatch(resetUpdateStatus()); // Reset the updateStatus to 'idle'
//             setTimeout(() => {
//                 navigate('/dashboard/sub-category-list');
//             }, 1000)
//             // Navigate back to the list page
//         } else if (updateStatus === 'failed') {
//             toast.error('Failed to update sub-category!');
//             dispatch(resetUpdateStatus()); // Reset the updateStatus to 'idle'
//         }
//     }, [updateStatus, dispatch, navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate input fields
//         if (!name) return toast.error('Sub-category name is required');

//         try {
//             await dispatch(updateSubCategory({ id, name })).unwrap();
//         } catch (error) {
//             console.error('Failed to update sub-category:', error);
//         }
//     };

//     return (
//         <>
//             <div className="container">
//                 <ToastContainer />
//                 <h5 className="mb-4">Edit Sub Category</h5>
//                 <form onSubmit={handleSubmit}>
//                     <div className="row row-cols-1">
//                         <div className="col">
//                             <div className="py-4 border-top">
//                                 <div className="row align-items-center">
//                                     <div className="col-md-4">
//                                         <div>
//                                             <h6>Description</h6>
//                                             <p className="text-secondary">
//                                                 Edit your sub-category description and necessary information from here
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-8">
//                                         <div className="card border-0 p-3 shadow-sm">
//                                             <div className="card-body">
//                                                 <div className="row mb-3">
//                                                     <div className="col-12">
//                                                         <label className="form-label fw-medium">Category Name *</label>
//                                                         <input
//                                                             className="form-control"
//                                                             type="text"
//                                                             placeholder="Name"
//                                                             value={name}
//                                                             onChange={(e) => setName(e.target.value)}
//                                                             required
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col sticky-bottom">
//                             <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
//                                 <div className="row">
//                                     <div className="col-auto">
//                                         <button
//                                             type="button"
//                                             className="btn btn-outline-primary btn-lg fw-semibold"
//                                             onClick={() => navigate(-1)} // Go back to the previous page
//                                         >
//                                             Back
//                                         </button>
//                                     </div>
//                                     <div className="col-auto ms-auto">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary btn-lg fw-semibold"
//                                             disabled={updateStatus === 'loading'}
//                                         >
//                                             {updateStatus === 'loading' ? 'Updating...' : 'Submit'}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default Page;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateSubCategory, fetchSubCategories, resetUpdateStatus } from '../../../store/reducers/subCategoryReducer';
import { useGetCategoryQuery } from '../../../store/features/category/categoryApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSubCategory = () => {
    const { id } = useParams(); // Get the `id` from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, updateStatus, error } = useSelector(state => state.subCategories);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState(''); // State for category validation error

    // Fetch categories
    const { data: categoryList, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoryQuery();

    // Fetch sub-categories if not already loaded
    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchSubCategories());
        }
    }, [dispatch, items.length]);

    // Pre-fill the form with the sub-category data
    useEffect(() => {
        if (items.length > 0) {
            const subCategory = items.find(item => item._id === id);
            if (subCategory) {
                setName(subCategory.name);
                setCategory(subCategory.category); // Pre-select the current category
            }
        }
    }, [items, id]);

    // Show toast messages based on updateStatus
    useEffect(() => {
        if (updateStatus === 'succeeded') {
            toast.success('Sub-category updated successfully!');
            dispatch(resetUpdateStatus()); // Reset the updateStatus to 'idle'
            setTimeout(() => {
                navigate('/dashboard/sub-category-list');
            }, 1000); // Navigate back to the list page
        } else if (updateStatus === 'failed') {
            toast.error(error || 'Failed to update sub-category!');
            dispatch(resetUpdateStatus()); // Reset the updateStatus to 'idle'
        }
    }, [updateStatus, dispatch, navigate, error]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!name || !category) {
            setCategoryError('Please select a category');
            return toast.error('Name and category are required');
        }

        // Create the formData object
        const formData = {
            name,
            category,
        };

        console.log("Update sub-category payload =====>", { id, formData });

        try {
            // Pass `id` and `formData` to the action
            await dispatch(updateSubCategory({ id, formData })).unwrap();
        } catch (error) {
            console.error('Failed to update sub-category:', error);
            toast.error(error || 'Failed to update sub-category!');
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <h5 className="mb-4">Edit Sub Category</h5>
            <form onSubmit={handleSubmit}>
                <div className="row row-cols-1">
                    {/* Category Selection */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Category</h6>
                                        <p className="text-secondary">
                                            Select the parent category for the sub-category
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <label className="form-label fw-medium">Product Category *</label>
                                                    <select
                                                        className={`form-control ${categoryError ? 'is-invalid' : ''}`}
                                                        value={category}
                                                        onChange={(e) => {
                                                            setCategory(e.target.value);
                                                            setCategoryError(''); // Clear error on change
                                                        }}
                                                        required
                                                    >
                                                        <option value="">Select Category</option>
                                                        {categoryList?.map((cat) => (
                                                            <option key={cat._id} value={cat._id}>
                                                                {cat.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {categoryError && (
                                                        <div className="invalid-feedback">{categoryError}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sub-Category Name */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Sub Category</h6>
                                        <p className="text-secondary">
                                            Edit the name of the sub-category
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <label className="form-label fw-medium">Sub Category Name *</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col sticky-bottom">
                        <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
                            <div className="row">
                                <div className="col-auto">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-lg fw-semibold"
                                        onClick={() => navigate(-1)} // Go back to the previous page
                                    >
                                        Back
                                    </button>
                                </div>
                                <div className="col-auto ms-auto">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg fw-semibold"
                                        disabled={updateStatus === 'loading'}
                                    >
                                        {updateStatus === 'loading' ? 'Updating...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditSubCategory;