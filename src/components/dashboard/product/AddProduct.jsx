// import React, { useState } from 'react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from 'react-router-dom';
// import { useGetCategoryQuery } from '../../../store/features/category/categoryApi';
// import { useAddProductMutation } from '../../../store/features/product/productApi';
// // import {useget} from '../../../store/features/'

// const AddProduct = () => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState(0);
//     const [category, setCategory] = useState('');
//     const [subCategory, setSubCategory] = useState('');
//     const [stock, setStock] = useState(0);
//     const [images, setImages] = useState([]);
//     const [prevImgs, setPrevImgs] = useState([]);

//        const { data: categoryList, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoryQuery();
//         const [addProduct, { isLoading, isError, error }] = useAddProductMutation();

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!name) return toast.error("Product name is required");
//         if (!description) return toast.error("Product description is required");
//         if (!price || price <= 0) return toast.error("Product price is required and must be greater than 0");
//         if (!category) return toast.error("Product category is required");
//         if (!subCategory) return toast.error("Product subcategory is required");
//         if (!stock || stock < 0) return toast.error("Product stock is required and must be a non-negative number");
//         if (images.length === 0) return toast.error("At least one product image is required");

//         try {
//             // Handle form submission here (e.g., API call to add the product)
//             console.log({ name, description, price, category, subCategory, stock, images });

//             const formData = new FormData();
//             formData.append('name', name);
//             formData.append('description', description);
//             formData.append('price', price);
//             formData.append('category', category);
//             formData.append('subCategory', subCategory);
//             formData.append('stock', stock);

//            await addProduct(formData).unwrap();
//                       toast.success('Category added successfully!');
          
//                     //   setTimeout(() => {
//                     //       navigate('/dashboard/category-list');
//                     //   }, 1000);

//             toast.success("Product added successfully!");
//             // navigate('/products'); // Redirect to the products page
//         } catch (error) {
//             toast.error("An unexpected error occurred. Please try again.");
//         }
//     };

//     const handleImageChange = (event) => {
//         const selectedFiles = event.target.files;
//         if (selectedFiles && selectedFiles.length > 0) {
//             const newImages = Array.from(selectedFiles);
//             setImages((prev) => [...prev, ...newImages]);

//             const newPreviews = newImages.map((file) => URL.createObjectURL(file));
//             setPrevImgs((prev) => [...prev, ...newPreviews]);
//         }
//     };

//     const handleRemoveImage = (index) => {
//         setImages((prev) => prev.filter((_, i) => i !== index));
//         setPrevImgs((prev) => prev.filter((_, i) => i !== index));
//     };

//     return (
//         <div className="container">
//             <ToastContainer />
//             <h5 className="mb-4">Add Product</h5>
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div className="row row-cols-1">
//                     {/* Product Name */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Product Name</h6>
//                                         <p className="text-secondary">Enter the name of the product</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Product Name *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="text"
//                                                         placeholder="Product Name"
//                                                         value={name}
//                                                         onChange={(e) => setName(e.target.value)}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Product Description */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Product Description</h6>
//                                         <p className="text-secondary">Enter the description of the product</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Product Description *</label>
//                                                     <textarea
//                                                         className="form-control"
//                                                         placeholder="Product Description"
//                                                         value={description}
//                                                         onChange={(e) => setDescription(e.target.value)}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Product Price */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Product Price</h6>
//                                         <p className="text-secondary">Enter the price of the product</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Product Price *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="number"
//                                                         placeholder="Product Price"
//                                                         value={price}
//                                                         onChange={(e) => setPrice(e.target.value)}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Product Category */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Product Category</h6>
//                                         <p className="text-secondary">Select the category of the product</p>
//                                     </div>
//                                 </div>
//                                 {/* <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Product Category *</label>
//                                                     <select
//                                                         className="form-control"
//                                                         value={category}
//                                                         onChange={(e) => setCategory(e.target.value)}
//                                                     >
//                                                         <option value="">Select Category</option>
                                                        
//                                                         <option value="category1">Category 1</option>
//                                                         <option value="category2">Category 2</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div> */}

// <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Product Category *</label>
//                                                     <select
//                                                         className="form-control"
//                                                         value={category}
//                                                         onChange={(e) => {
//                                                             setCategory(e.target.value);
//                                                             setCategoryError(''); // Clear error on change
//                                                         }}
//                                                         required
//                                                     >
//                                                         <option value="">Select Category</option>
//                                                         {categoryList?.map((cat) => (
//                                                             <option key={cat._id} value={cat._id}>
//                                                                 {cat.name}
//                                                             </option>
//                                                         ))}
//                                                     </select>
                                                    
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Product Subcategory */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Product Subcategory</h6>
//                                         <p className="text-secondary">Select the subcategory of the product</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Product Subcategory *</label>
//                                                     <select
//                                                         className="form-control"
//                                                         value={subCategory}
//                                                         onChange={(e) => setSubCategory(e.target.value)}
//                                                     >
//                                                         <option value="">Select Subcategory</option>
//                                                         {/* Populate with subcategories from your database */}
//                                                         <option value="subcategory1">Subcategory 1</option>
//                                                         <option value="subcategory2">Subcategory 2</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Product Stock */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Product Stock</h6>
//                                         <p className="text-secondary">Enter the stock quantity of the product</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Product Stock *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="number"
//                                                         placeholder="Product Stock"
//                                                         value={stock}
//                                                         onChange={(e) => setStock(e.target.value)}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Product Images */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Product Images</h6>
//                                         <p className="text-secondary">Upload images of the product</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="file-uploader">
//                                                 <label className="w-100">
//                                                     <div
//                                                         className="border border-2 text-center p-3"
//                                                         style={{
//                                                             '--bs-border-style': 'dashed',
//                                                             cursor: 'pointer',
//                                                         }}
//                                                     >
//                                                         <svg
//                                                             className="text-body-tertiary m-3"
//                                                             xmlns="http://www.w3.org/2000/svg"
//                                                             width="41px"
//                                                             height="30px"
//                                                             viewBox="0 0 40.909 30"
//                                                         >
//                                                             <g transform="translate(0 -73.091)">
//                                                                 <path
//                                                                     data-name="Path 2125"
//                                                                     d="M39.129,89.827A8.064,8.064,0,0,0,34.58,86.94,5.446,5.446,0,0,0,30,78.546a5.207,5.207,0,0,0-3.537,1.321,10.921,10.921,0,0,0-10.1-6.776,10.511,10.511,0,0,0-7.713,3.2A10.508,10.508,0,0,0,5.454,84q0,.277.043.916A9.528,9.528,0,0,0,0,93.546a9.193,9.193,0,0,0,2.8,6.743,9.191,9.191,0,0,0,6.744,2.8H32.728a8.172,8.172,0,0,0,6.4-13.264Zm-12.06-.575a.656.656,0,0,1-.479.2H21.818v7.5a.691.691,0,0,1-.681.681H17.045a.691.691,0,0,1-.682-.681v-7.5H11.59a.655.655,0,0,1-.681-.681.8.8,0,0,1,.213-.512L18.6,80.783a.722.722,0,0,1,.98,0l7.5,7.5a.663.663,0,0,1,.191.49A.656.656,0,0,1,27.07,89.252Z"
//                                                                     fill="currentColor"
//                                                                 />
//                                                             </g>
//                                                         </svg>
//                                                         <p style={{ fontSize: '14px' }}>
//                                                             <span className="text-color-1 fw-medium">Upload images</span> or drag and drop <br /> PNG, JPG
//                                                         </p>
//                                                         <input
//                                                             className="form-control"
//                                                             type="file"
//                                                             name="file"
//                                                             hidden
//                                                             multiple
//                                                             onChange={handleImageChange}
//                                                         />
//                                                     </div>
//                                                     <br />
//                                                 </label>

//                                                 {prevImgs.length > 0 && (
//                                                     <div className="d-flex flex-wrap gap-2">
//                                                         {prevImgs.map((img, index) => (
//                                                             <div key={index} className="position-relative">
//                                                                 <img
//                                                                     src={img}
//                                                                     alt="Preview"
//                                                                     style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                                                                 />
//                                                                 <button
//                                                                     type="button"
//                                                                     onClick={() => handleRemoveImage(index)}
//                                                                     className="btn btn-outline-danger position-absolute top-0 end-0"
//                                                                     style={{
//                                                                         padding: '.25rem .5rem',
//                                                                         fontSize: '.75rem',
//                                                                     }}
//                                                                 >
//                                                                     &times;
//                                                                 </button>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Form Submission Buttons */}
//                     <div className="col sticky-bottom">
//                         <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
//                             <div className="row">
//                                 <div className="col-auto">
//                                     <button
//                                         className="btn btn-outline-primary btn-lg fw-semibold"
//                                         type="button"
//                                         onClick={() => navigate(-1)}
//                                     >
//                                         Back
//                                     </button>
//                                 </div>
//                                 <div className="col-auto ms-auto">
//                                     <button className="btn btn-primary btn-lg fw-semibold" type="submit">
//                                         Submit
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddProduct;

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useGetCategoryQuery } from '../../../store/features/category/categoryApi';
import { useAddProductMutation } from '../../../store/features/product/productApi';
import { useGetSubCategoryByCatIdQuery } from '../../../store/features/product/productApi';

const AddProduct = () => {
    // State for form fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]); // Stores selected image files
    const [prevImgs, setPrevImgs] = useState([]); // Stores image preview URLs

    // API hooks
    const { data: categoryList, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoryQuery();
    const { data: subCategoryList, isLoading: isSubCategoryLoading, isError: isSubCategoryError } = useGetSubCategoryByCatIdQuery(category, {
        skip: !category, // Skip the query if no category is selected
    });
    const [addProduct, { isLoading, isError, error }] = useAddProductMutation();

    const navigate = useNavigate();

    // Reset subcategory when category changes
    useEffect(() => {
        setSubCategory('');
    }, [category]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name) return toast.error('Product name is required');
        if (!description) return toast.error('Product description is required');
        if (!price || price <= 0) return toast.error('Product price is required and must be greater than 0');
        if (!category) return toast.error('Product category is required');
        if (!subCategory) return toast.error('Product subcategory is required');
        if (!stock || stock < 0) return toast.error('Product stock is required and must be a non-negative number');
        if (images.length === 0) return toast.error('At least one product image is required');

        try {
            // Create FormData object
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('stock', stock);

            // Append each image file to FormData
            images.forEach((image, index) => {
                formData.append('images', image); // 'images' must match the field name expected by the backend
            });

            // Make API call
            await addProduct(formData).unwrap();
            toast.success('Product added successfully!');
            setTimeout(() => {
                navigate('/dashboard/product-list'); // Redirect to the products page
            }, 1000);
        } catch (error) {
            // Handle API errors
            if (error.data && error.data.message) {
                toast.error(error.data.message);
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
            console.error(error);
        }
    };

    // Handle image selection
    const handleImageChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const newImages = Array.from(selectedFiles);
            setImages((prev) => [...prev, ...newImages]);

            // Create preview URLs for the selected images
            const newPreviews = newImages.map((file) => URL.createObjectURL(file));
            setPrevImgs((prev) => [...prev, ...newPreviews]);
        }
    };

    // Handle image removal
    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPrevImgs((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <ToastContainer />
            <h5 className="mb-4">Add Product</h5>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row row-cols-1">
                    {/* Product Name */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Product Name</h6>
                                        <p className="text-secondary">Enter the name of the product</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <label className="form-label fw-medium">Product Name *</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Product Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Product Description</h6>
                                        <p className="text-secondary">Enter the description of the product</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <label className="form-label fw-medium">Product Description *</label>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Product Description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Price */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Product Price</h6>
                                        <p className="text-secondary">Enter the price of the product</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <label className="form-label fw-medium">Product Price *</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="Product Price"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Category */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Product Category</h6>
                                        <p className="text-secondary">Select the category of the product</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <label className="form-label fw-medium">Product Category *</label>
                                                    <select
                                                        className="form-control"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                    >
                                                        <option value="">Select Category</option>
                                                        {categoryList?.map((cat) => (
                                                            <option key={cat._id} value={cat._id}>
                                                                {cat.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Subcategory */}
                    {category && (
                        <div className="col">
                            <div className="py-4 border-top">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <div>
                                            <h6>Product Subcategory</h6>
                                            <p className="text-secondary">Select the subcategory of the product</p>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card border-0 p-3 shadow-sm">
                                            <div className="card-body">
                                                <div className="row mb-3">
                                                    <div className="col-12">
                                                        <label className="form-label fw-medium">Product Subcategory *</label>
                                                        <select
                                                            className="form-control"
                                                            value={subCategory}
                                                            onChange={(e) => setSubCategory(e.target.value)}
                                                        >
                                                            <option value="">Select Subcategory</option>
                                                            {subCategoryList?.map((subCat) => (
                                                                <option key={subCat._id} value={subCat._id}>
                                                                    {subCat.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Stock */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Product Stock</h6>
                                        <p className="text-secondary">Enter the stock quantity of the product</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <label className="form-label fw-medium">Product Stock *</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="Product Stock"
                                                        value={stock}
                                                        onChange={(e) => setStock(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Images */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Product Images</h6>
                                        <p className="text-secondary">Upload images of the product</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="file-uploader">
                                                <label className="w-100">
                                                    <div
                                                        className="border border-2 text-center p-3"
                                                        style={{
                                                            '--bs-border-style': 'dashed',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <svg
                                                            className="text-body-tertiary m-3"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="41px"
                                                            height="30px"
                                                            viewBox="0 0 40.909 30"
                                                        >
                                                            <g transform="translate(0 -73.091)">
                                                                <path
                                                                    data-name="Path 2125"
                                                                    d="M39.129,89.827A8.064,8.064,0,0,0,34.58,86.94,5.446,5.446,0,0,0,30,78.546a5.207,5.207,0,0,0-3.537,1.321,10.921,10.921,0,0,0-10.1-6.776,10.511,10.511,0,0,0-7.713,3.2A10.508,10.508,0,0,0,5.454,84q0,.277.043.916A9.528,9.528,0,0,0,0,93.546a9.193,9.193,0,0,0,2.8,6.743,9.191,9.191,0,0,0,6.744,2.8H32.728a8.172,8.172,0,0,0,6.4-13.264Zm-12.06-.575a.656.656,0,0,1-.479.2H21.818v7.5a.691.691,0,0,1-.681.681H17.045a.691.691,0,0,1-.682-.681v-7.5H11.59a.655.655,0,0,1-.681-.681.8.8,0,0,1,.213-.512L18.6,80.783a.722.722,0,0,1,.98,0l7.5,7.5a.663.663,0,0,1,.191.49A.656.656,0,0,1,27.07,89.252Z"
                                                                    fill="currentColor"
                                                                />
                                                            </g>
                                                        </svg>
                                                        <p style={{ fontSize: '14px' }}>
                                                            <span className="text-color-1 fw-medium">Upload images</span> or drag and drop <br /> PNG, JPG
                                                        </p>
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            name="file"
                                                            hidden
                                                            multiple
                                                            onChange={handleImageChange}
                                                        />
                                                    </div>
                                                    <br />
                                                </label>

                                                {prevImgs.length > 0 && (
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {prevImgs.map((img, index) => (
                                                            <div key={index} className="position-relative">
                                                                <img
                                                                    src={img}
                                                                    alt="Preview"
                                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveImage(index)}
                                                                    className="btn btn-outline-danger position-absolute top-0 end-0"
                                                                    style={{
                                                                        padding: '.25rem .5rem',
                                                                        fontSize: '.75rem',
                                                                    }}
                                                                >
                                                                    &times;
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Submission Buttons */}
                    <div className="col sticky-bottom">
                        <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
                            <div className="row">
                                <div className="col-auto">
                                    <button
                                        className="btn btn-outline-primary btn-lg fw-semibold"
                                        type="button"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </button>
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

export default AddProduct;