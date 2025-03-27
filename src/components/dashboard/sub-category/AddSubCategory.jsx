

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addSubCategory, resetAddStatus } from '../../../store/reducers/subCategoryReducer';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container } from 'react-bootstrap';
// import { toast } from 'react-toastify';


// const AddSubCategory = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { addStatus, error } = useSelector(state => state.subCategories);
//     const [name, setName] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await dispatch(addSubCategory(name)).unwrap();
//         } catch (error) {
//             console.error('Failed to add sub-category:', error);
//         }
//     };


//     console.log("show toast", addStatus)
//     // Show toast messages based on addStatus
//     useEffect(() => {
//         if (addStatus === 'succeeded') {
//             toast.success('Sub-category added successfully!');
//             dispatch(resetAddStatus()); // Reset the addStatus to 'idle'
//             navigate('/dashboard/sub-category-list'); // Navigate back to the list page
//         } else if (addStatus === 'failed') {
//             toast.error('Failed to add sub-category!');
//             dispatch(resetAddStatus()); // Reset the addStatus to 'idle'
//         }
//     }, [addStatus, dispatch, navigate]);

//     return (
//         <Container>
//             <h2>Add Sub-Category</h2>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Enter sub-category name"
//                         required
//                     />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" disabled={addStatus === 'loading'}>
//                     {addStatus === 'loading' ? 'Adding...' : 'Add'}
//                 </Button>
//             </Form>
//         </Container>
//     );
// };

// export default AddSubCategory;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategory, resetAddStatus } from '../../../store/reducers/subCategoryReducer';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetCategoryQuery } from '../../../store/features/category/categoryApi';

const AddSubCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addStatus, error } = useSelector(state => state.subCategories);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState(''); // State for category validation error

    // Fetch categories
    const { data: categoryList, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoryQuery();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate category selection
        if (!category) {
            setCategoryError('Please select a category');
            return;
        }

        // Create the formData object
        const formData = {
            name,
            category,
        };

        console.log("Frontend form data ======>", formData);

        try {
            // Pass formData directly to the action
            await dispatch(addSubCategory(formData)).unwrap();

        } catch (error) {
            console.error('Failed to add sub-category:', error);
            toast.error(error || 'Failed to add sub-category!');
        }
    };

    // Show toast messages based on addStatus
    useEffect(() => {
        if (addStatus === 'succeeded') {
            toast.success('Sub-category added successfully!');
            dispatch(resetAddStatus()); // Reset the addStatus to 'idle'
            setTimeout(() => {
                navigate('/dashboard/sub-category-list');
            }, 1000); // Navigate back to the list page
        } else if (addStatus === 'failed') {
            toast.error(error || 'Failed to add sub-category!');
            dispatch(resetAddStatus()); // Reset the addStatus to 'idle'
        }
    }, [addStatus, dispatch, navigate, error]);

    return (
        <div className="container">
            <ToastContainer />
            <h5 className="mb-4">Add Sub Category</h5>
            <form onSubmit={handleSubmit} >
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
                                            Enter the name of the sub-category
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
                                    <a className="btn btn-outline-primary btn-lg fw-semibold" href="#">
                                        Back
                                    </a>
                                </div>
                                <div className="col-auto ms-auto">
                                    <button className="btn btn-primary btn-lg fw-semibold" type="submit">
                                        Submit
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

export default AddSubCategory;