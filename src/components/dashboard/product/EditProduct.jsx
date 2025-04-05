

// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useGetCategoryQuery } from '../../../store/features/category/categoryApi';
// import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../store/features/product/productApi';
// import { useGetSubCategoryByCatIdQuery } from '../../../store/features/product/productApi';
// import BASE_URL from '../../../utils/imageConfig'; // Import BASE_URL

// const EditProduct = () => {
//     const { id } = useParams(); // Get the product ID from the URL
//     const navigate = useNavigate();

//     // State for form fields
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState(0);
//     const [category, setCategory] = useState('');
//     const [subCategory, setSubCategory] = useState('');
//     const [stock, setStock] = useState(0);
//     const [images, setImages] = useState([]); // Stores selected image files
//     const [prevImgs, setPrevImgs] = useState([]); // Stores image preview URLs
//     const [oldImgPath, setOldImgPath] = useState([]); // Stores image preview URLs

//     // API hooks
//     const { data: categoryList, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoryQuery();
//     const { data: subCategoryList, isLoading: isSubCategoryLoading, isError: isSubCategoryError } = useGetSubCategoryByCatIdQuery(category, {
//         skip: !category, // Skip the query if no category is selected
//     });
//     const { data: product, isLoading: isProductLoading, isError: isProductError, error: productError } = useGetProductByIdQuery(id);
//     const [updateProduct, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] = useUpdateProductMutation();

//     // Populate the form with existing data when the product is fetched
//     useEffect(() => {
//         if (product) {
//             setName(product.name);
//             setDescription(product.description);
//             setPrice(product.price);
//             setCategory(product?.category?._id);
//             setSubCategory(product?.subCategory?._id);
//             setStock(product.stock);
//             const imageUrls = product.images?.map((img) => `${BASE_URL}${img.url}`) || [];
//             setPrevImgs(imageUrls);
//             setOldImgPath(product.images?.map((img) => img.url) || []); // Assuming images have a `url` field
//         }
//     }, [product]);

//     // Reset subcategory when category changes
//     useEffect(() => {
//         setSubCategory('');
//     }, [category]);

//     console.log("oldImgPath is =====>", oldImgPath)
//     console.log(" images is =====>", images)
//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validation
//         if (!name) return toast.error('Product name is required');
//         if (!description) return toast.error('Product description is required');
//         if (!price || price <= 0) return toast.error('Product price is required and must be greater than 0');
//         if (!category) return toast.error('Product category is required');
//         if (!subCategory) return toast.error('Product subcategory is required');
//         if (!stock || stock < 0) return toast.error('Product stock is required and must be a non-negative number');

//         try {


//             const formData = new FormData();

//             formData.append('name', name);
//             formData.append('description', description);
//             formData.append('price', price);
//             formData.append('category', category);
//             formData.append('subCategory', subCategory);
//             formData.append('stock', stock);

//             oldImgPath.forEach((image) => {
//                 formData.append('oldImgPath', image); // 'images' must match the field name expected by the backend
//             });

//             // Append each image file to FormData
//             images.forEach((image) => {
//                 formData.append('images', image); // 'images' must match the field name expected by the backend
//             });

//             // Make API call to update the product
//             await updateProduct({ id, formData }).unwrap();
//             toast.success('Product updated successfully!');
//             setTimeout(() => {
//                 navigate('/dashboard/product-list'); // Redirect to the products page
//             }, 1000);
//         } catch (error) {
//             // Handle API errors
//             if (error.data && error.data.message) {
//                 toast.error(error.data.message);
//             } else {
//                 toast.error('An unexpected error occurred. Please try again.');
//             }
//             console.error(error);
//         }
//     };

//     // Handle image selection
//     const handleImageChange = (event) => {
//         const selectedFiles = event.target.files;
//         if (selectedFiles && selectedFiles.length > 0) {
//             const newImages = Array.from(selectedFiles);
//             setImages((prev) => [...prev, ...newImages]);

//             // Create preview URLs for the selected images
//             const newPreviews = newImages.map((file) => URL.createObjectURL(file));
//             setPrevImgs((prev) => [...prev, ...newPreviews]);
//         }
//     };

//     // Handle image removal
//     const handleRemoveImage = (index) => {
//         setImages((prev) => prev.filter((_, i) => i !== index));
//         setPrevImgs((prev) => prev.filter((_, i) => i !== index));
//         setOldImgPath((prev) => prev.filter((_, i) => i !== index))
//     };

//     if (isProductLoading) {
//         return <div>Loading product data...</div>;
//     }

//     if (isProductError) {
//         return <div>Error fetching product: {productError?.data?.message || 'Unknown error'}</div>;
//     }

//     return (
//         <div className="container">
//             <ToastContainer />
//             <h5 className="mb-4">Edit Product</h5>
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
//                                 <div className="col-md-8">
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
//                     {category && (
//                         <div className="col">
//                             <div className="py-4 border-top">
//                                 <div className="row align-items-center">
//                                     <div className="col-md-4">
//                                         <div>
//                                             <h6>Product Subcategory</h6>
//                                             <p className="text-secondary">Select the subcategory of the product</p>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-8">
//                                         <div className="card border-0 p-3 shadow-sm">
//                                             <div className="card-body">
//                                                 <div className="row mb-3">
//                                                     <div className="col-12">
//                                                         <label className="form-label fw-medium">Product Subcategory *</label>
//                                                         <select
//                                                             className="form-control"
//                                                             value={subCategory}
//                                                             onChange={(e) => setSubCategory(e.target.value)}
//                                                         >
//                                                             <option value="">Select Subcategory</option>
//                                                             {subCategoryList?.map((subCat) => (
//                                                                 <option key={subCat._id} value={subCat._id}>
//                                                                     {subCat.name}
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

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
//                                     <button className="btn btn-primary btn-lg fw-semibold" type="submit" disabled={isUpdating}>
//                                         {isUpdating ? 'Updating...' : 'Update'}
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

// export default EditProduct;

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUpload, FiX, FiArrowLeft } from 'react-icons/fi';
// import { BsBarcodeScan } from 'react-icons/bs';
import { useGetCategoryQuery } from '../../../store/features/category/categoryApi';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../store/features/product/productApi';
import { useGetSubCategoryByCatIdQuery } from '../../../store/features/product/productApi';
import BASE_URL from '../../../utils/imageConfig';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Consolidated form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        mrp: 0,
        costPrice: 0,
        category: '',
        subCategory: '',
        stock: 0,
        productCode: '',
        batchNumber: '',
        manufacturingDate: '',
        expiryDate: '',
        isTaxable: true,
        maxDiscount: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        shippingCost: 0,       // ✅ Default value added
        freeShipping: false,   // ✅ Default value added
        barcode: '',
        images: [],
        prevImgs: [],
        oldImgPath: []

    });

    // API hooks
    const { data: categoryList } = useGetCategoryQuery();
    const { data: subCategoryList } = useGetSubCategoryByCatIdQuery(formData.category, {
        skip: !formData.category,
    });
    const { data: product } = useGetProductByIdQuery(id);
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    // Populate form with existing product data
    useEffect(() => {
        if (product) {
            const imageUrls = product.images?.map((img) => `${BASE_URL}${img.url}`) || [];
            setFormData({
                ...product,
                category: product?.category?._id,
                subCategory: product?.subCategory?._id,
                prevImgs: imageUrls,
                oldImgPath: product.images?.map((img) => img.url) || [],
                images: [],
                shippingCost: product?.shipping?.cost || 0,
                freeShipping: product?.shipping?.isFreeShipping || false,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Validation
    //     if (!formData.name) return toast.error('Product name is required');
    //     if (!formData.description) return toast.error('Description is required');
    //     if (!formData.price || formData.price <= 0) return toast.error('Valid price is required');
    //     if (!formData.category) return toast.error('Category is required');
    //     if (!formData.subCategory) return toast.error('Subcategory is required');
    //     if (formData.prevImgs.length === 0 && formData.images.length === 0) {
    //         return toast.error('At least one image is required');
    //     }

    //     try {
    //         const formDataObj = new FormData();

    //         // Append basic fields
    //         Object.keys(formData).forEach((key) => {
    //             if (!['images', 'prevImgs', 'oldImgPath'].includes(key)) {
    //                 formDataObj.append(key, formData[key]);
    //             }
    //         });

    //         // Append old image paths
    //         formData.oldImgPath.forEach((path) => {
    //             formDataObj.append('oldImgPath', path);
    //         });

    //         // Append new images
    //         formData.images.forEach((image) => {
    //             formDataObj.append('images', image);
    //         });

    //         // ✅ Correct key for mutation payload
    //         let response = await updateProduct({ id, formData: formDataObj }).unwrap();
    //         // console.log("response is ====>", response)

    //         toast.success('Product updated successfully!');
    //         setTimeout(() => navigate('/dashboard/product-list'), 1500);
    //     } catch (error) {
    //         console.log("update error is ======>", error);
    //         toast.error(error?.data?.error || '❌ Update failed. Please check all fields.', {
    //             position: "top-center",
    //         });
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Show only the first validation error
        if (!formData.name) return toast.error('Product name is required');
        if (!formData.description) return toast.error('Description is required');
        if (!formData.price || formData.price <= 0) return toast.error('Valid price is required');
        if (!formData.category) return toast.error('Category is required');
        if (!formData.subCategory) return toast.error('Subcategory is required');
        if (formData.prevImgs.length === 0 && formData.images.length === 0) {
            return toast.error('At least one image is required');
        }

        try {
            const formDataObj = new FormData();

            // Append basic fields
            Object.keys(formData).forEach((key) => {
                if (!['images', 'prevImgs', 'oldImgPath'].includes(key)) {
                    formDataObj.append(key, formData[key]);
                }
            });

            // Append old image paths
            formData.oldImgPath.forEach((path) => {
                formDataObj.append('oldImgPath', path);
            });

            // Append new images
            formData.images.forEach((image) => {
                formDataObj.append('images', image);
            });

            await updateProduct({ id, formData: formDataObj }).unwrap();

            toast.success('Product updated successfully!');
            setTimeout(() => navigate('/dashboard/product-list'), 1500);
        } catch (error) {
            console.log("update error is ======>", error);

            // ✅ Show only the first backend error (if it's an array)
            const errors = error?.data?.errors;
            if (Array.isArray(errors) && errors.length > 0) {
                toast.error(errors[0], {
                    position: "top-center",
                });
            } else {
                toast.error(error?.data?.error || '❌ Update failed. Please check all fields.', {
                    position: "top-center",
                });
            }
        }
    };


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = [...formData.images, ...files];
            const newPreviews = files.map(file => URL.createObjectURL(file));

            setFormData(prev => ({
                ...prev,
                images: newImages,
                prevImgs: [...prev.prevImgs, ...newPreviews]
            }));
        }
    };

    const handleRemoveImage = (index, isNew) => {
        if (isNew) {
            setFormData(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
                prevImgs: prev.prevImgs.filter((_, i) => i !== index)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                oldImgPath: prev.oldImgPath.filter((_, i) => i !== index),
                prevImgs: prev.prevImgs.filter((_, i) => i !== index)
            }));
        }
    };

    return (
        <div className="container-fluid px-4 py-3">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header with back button */}
            <div className="d-flex align-items-center mb-4">
                <button
                    className="btn btn-outline-secondary me-3"
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft className="me-1" /> Back
                </button>
                <h4 className="mb-0">Edit Product</h4>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Basic Information Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Basic Information</h5>
                        <small className="text-muted">Edit product name, code and description</small>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Product Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product name"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Product Code <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleChange}
                                    placeholder="Unique product code"
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
                                <textarea
                                    className="form-control"
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Detailed product description"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Information Card */}
                {/* <div className="card shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Pricing Information</h5>
                        <small className="text-muted">Update product pricing</small>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Cost Price <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text">₹</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="costPrice"
                                        value={formData.costPrice}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Selling Price <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text">₹</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min={formData.costPrice}
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">MRP <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text">₹</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="mrp"
                                        value={formData.mrp}
                                        onChange={handleChange}
                                        min={formData.price}
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Max Discount (%)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="maxDiscount"
                                    value={formData.maxDiscount}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Pricing Information</h5>
                        <small className="text-muted">Update product pricing</small>
                    </div>

                    <div className="card-body">
                        <div className="row g-3">
                            {/* Cost Price */}
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">
                                    Cost Price <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">₹</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="costPrice"
                                        value={formData.costPrice ?? ''}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Selling Price */}
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">
                                    Selling Price <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">₹</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price ?? ''}
                                        onChange={handleChange}
                                        min={formData.costPrice || 0}
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* MRP */}
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">
                                    MRP <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">₹</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="mrp"
                                        value={formData.mrp ?? ''}
                                        onChange={handleChange}
                                        min={formData.price || 0}
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Max Discount */}
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Max Discount (%)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="maxDiscount"
                                    value={formData.maxDiscount ?? ''}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                />
                            </div>

                            {/* Shipping Cost + Free Toggle */}
                            <div className="col-md-4">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <label htmlFor="shippingCost" className="form-label fw-semibold mb-0">
                                        {formData.freeShipping ? 'Free Shipping Enabled' : 'Shipping Cost'}
                                    </label>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="freeShippingToggle"
                                            checked={formData.freeShipping || false}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    freeShipping: e.target.checked,
                                                    shippingCost: e.target.checked ? 0 : prev.shippingCost,
                                                }))
                                            }
                                        />
                                        <label className="form-check-label small" htmlFor="freeShippingToggle">
                                            Free
                                        </label>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">₹</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="shippingCost"
                                        value={formData.shippingCost ?? ''}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        disabled={formData.freeShipping}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





                {/* Category Information Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Category Information</h5>
                        <small className="text-muted">Update product category</small>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Category <span className="text-danger">*</span></label>
                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {categoryList?.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Subcategory <span className="text-danger">*</span></label>
                                <select
                                    className="form-select"
                                    name="subCategory"
                                    value={formData.subCategory}
                                    onChange={handleChange}
                                    disabled={!formData.category}
                                >
                                    <option value="">Select Subcategory</option>
                                    {subCategoryList?.map(sub => (
                                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inventory Information Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Inventory Information</h5>
                        <small className="text-muted">Update stock and batch details</small>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Stock <span className="text-danger">*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Batch Number <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="batchNumber"
                                    value={formData.batchNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Barcode</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="barcode"
                                        value={formData.barcode}
                                        onChange={handleChange}
                                    />
                                    {/* <button className="btn btn-outline-secondary" type="button">
                                        <BsBarcodeScan />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dates Information Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Dates Information</h5>
                        <small className="text-muted">Update manufacturing and expiry dates</small>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Manufacturing Date <span className="text-danger">*</span></label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="manufacturingDate"
                                    value={formData.manufacturingDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Expiry Date <span className="text-danger">*</span></label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    min={formData.manufacturingDate}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tax Information Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Tax Information</h5>
                        <small className="text-muted">Update tax rates</small>
                    </div>
                    <div className="card-body">
                        <div className="mb-3 form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="isTaxable"
                                checked={formData.isTaxable}
                                onChange={handleChange}
                                id="taxableSwitch"
                            />
                            <label className="form-check-label fw-semibold" htmlFor="taxableSwitch">
                                Taxable Product
                            </label>
                        </div>

                        {formData.isTaxable && (
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">CGST (%) <span className="text-danger">*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="cgst"
                                        value={formData.cgst}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">SGST (%) <span className="text-danger">*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="sgst"
                                        value={formData.sgst}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">IGST (%)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="igst"
                                        value={formData.igst}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Images Card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Product Images</h5>
                        <small className="text-muted">Update product images (Min 1)</small>
                    </div>
                    <div className="card-body">
                        <div className="border rounded p-4 text-center mb-3" style={{ borderStyle: 'dashed' }}>
                            <FiUpload size={40} className="text-muted mb-2" />
                            <h5>Drag & drop images here</h5>
                            <p className="text-muted">or</p>
                            <label className="btn btn-primary">
                                Browse Files
                                <input
                                    type="file"
                                    className="d-none"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                            <p className="small text-muted mt-2">Supports JPG, PNG up to 2MB each</p>
                        </div>

                        <div className="d-flex flex-wrap gap-3">
                            {formData.prevImgs.map((img, index) => (
                                <div key={index} className="position-relative" style={{ width: '120px', height: '120px' }}>
                                    <img
                                        src={img}
                                        alt={`Preview ${index}`}
                                        className="img-thumbnail h-100 w-100 object-fit-cover"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                                        style={{ width: '24px', height: '24px', padding: '0' }}
                                        onClick={() => handleRemoveImage(
                                            index,
                                            index >= (formData.prevImgs.length - formData.images.length)
                                        )}
                                    >
                                        <FiX size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="d-flex justify-content-end gap-3 mb-4">
                    <button
                        type="button"
                        className="btn btn-outline-secondary px-4"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary px-4"
                        disabled={isUpdating}
                    >
                        {isUpdating ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Updating...
                            </>
                        ) : 'Update Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;