


// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { useGetCategoryQuery } from '../../../store/features/category/categoryApi';
// import { useAddProductMutation } from '../../../store/features/product/productApi';
// import { useGetSubCategoryByCatIdQuery } from '../../../store/features/product/productApi';

// const AddProduct = () => {
//     // State for form fields
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState(0);
//     const [category, setCategory] = useState('');
//     const [subCategory, setSubCategory] = useState('');
//     const [stock, setStock] = useState(0);
//     const [images, setImages] = useState([]); // Stores selected image files
//     const [prevImgs, setPrevImgs] = useState([]); // Stores image preview URLs
//     const [productCode, setProductCode] = useState("");
//     const [batchNumber, setBatchNumber] = useState("");
//     const [manufacturingDate, setManufacturingDate] = useState("");
//     const [expiryDate, setExpiryDate] = useState("");
//     const [isTaxable, setIsTaxable] = useState(true);
//     const [maxDiscount, setMaxDiscount] = useState(0);
//     const [costPrice, setCostPrice] = useState(0);
//     const [mrp, setMrp] = useState(0);
//     const [cgst, setCgst] = useState(0);
//     const [sgst, setSgst] = useState(0);
//     const [igst, setIgst] = useState(0);
//     const [barcode, setBarCode] = useState("")

//     // API hooks
//     const { data: categoryList, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoryQuery();
//     const { data: subCategoryList, isLoading: isSubCategoryLoading, isError: isSubCategoryError } = useGetSubCategoryByCatIdQuery(category, {
//         skip: !category, // Skip the query if no category is selected
//     });
//     const [addProduct, { isLoading, isError, error }] = useAddProductMutation();

//     const navigate = useNavigate();

//     // Reset subcategory when category changes
//     useEffect(() => {
//         setSubCategory('');
//     }, [category]);

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
//         if (images.length === 0) return toast.error('At least one product image is required');

//         try {


//             const formDataObj = new FormData();

//             // Basic Information
//             formDataObj.append('name', name);
//             formDataObj.append('description', description);
//             formDataObj.append('productCode', productCode);

//             // Pricing Information
//             formDataObj.append('costPrice', costPrice);
//             formDataObj.append('price', price);
//             formDataObj.append('mrp', mrp);
//             formDataObj.append('maxDiscount', maxDiscount);

//             // Category Information
//             formDataObj.append('category', category);
//             formDataObj.append('subCategory', subCategory);

//             // Inventory Information
//             formDataObj.append('stock', stock);
//             formDataObj.append('batchNumber', batchNumber);
//             formDataObj.append('barcode', barcode);

//             // Dates Information
//             formDataObj.append('manufacturingDate', manufacturingDate);
//             formDataObj.append('expiryDate', expiryDate);

//             // Tax Information
//             formDataObj.append('isTaxable', isTaxable);
//             formDataObj.append('cgst', cgst);
//             formDataObj.append('sgst', sgst);
//             formDataObj.append('igst', igst);
//             // Append each image file to FormData
//             images.forEach((image, index) => {
//                 formDataObj.append('images', image); // 'images' must match the field name expected by the backend
//             });

//             // Make API call
//             await addProduct(formDataObj).unwrap();
//             toast.success('Product added successfully!');
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
//                                         <h6> Basic Information </h6>
//                                         <p className="text-secondary">Enter the Basic Information of the product</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-6">
//                                                     <label className="form-label fw-medium">Product Name *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="text"
//                                                         placeholder="Product Name"
//                                                         value={name}
//                                                         onChange={(e) => setName(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="col-6">
//                                                     <label className="form-label fw-medium">Product Code *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="text"
//                                                         placeholder="Product Name"
//                                                         value={productCode}
//                                                         onChange={(e) => setProductCode(e.target.value)}
//                                                     />
//                                                 </div>

//                                             </div>



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

//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Pricing Information</h6>
//                                         <p className="text-secondary">Enter product pricing details</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-md-4">
//                                                     <label className="form-label fw-medium">Cost Price *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="number"
//                                                         placeholder="Cost Price"
//                                                         value={costPrice}
//                                                         onChange={(e) => setCostPrice(e.target.value)}
//                                                         min="0"
//                                                         step="0.01"
//                                                     />
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <label className="form-label fw-medium">Selling Price *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="number"
//                                                         placeholder="Selling Price"
//                                                         value={price}
//                                                         onChange={(e) => setPrice(e.target.value)}
//                                                         min={costPrice}
//                                                         step="0.01"
//                                                     />
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <label className="form-label fw-medium">MRP *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="number"
//                                                         placeholder="Maximum Retail Price"
//                                                         value={mrp}
//                                                         onChange={(e) => setMrp(e.target.value)}
//                                                         min={price}
//                                                         step="0.01"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="row mb-3">
//                                                 <div className="col-md-6">
//                                                     <label className="form-label fw-medium">Max Discount (%)</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="number"
//                                                         placeholder="Max Discount"
//                                                         value={maxDiscount}
//                                                         onChange={(e) => setMaxDiscount(e.target.value)}
//                                                         min="0"
//                                                         max="100"
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
//                                                 <div className="col-6">
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

//                                                 {category && (

//                                                     <div className="col-6">
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
//                                                 )}


//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>



//                     {/* Batch Number code */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6> Inventory Information * </h6>
//                                         <p className="text-secondary">Enter the Inventory Information</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-md-6 mb-3">
//                                                     <label className="form-label fw-medium">Product Stock *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="number"
//                                                         placeholder="Product Stock"
//                                                         value={stock}
//                                                         onChange={(e) => setStock(e.target.value)}
//                                                     />
//                                                 </div>

//                                                 <div className="col-md-6 mb-3">
//                                                     <label className="form-label fw-medium"> Batch Number * </label>

//                                                     <input className="form-control" type="text" placeholder="Batch Number" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} />
//                                                 </div>
//                                             </div>
//                                             <div className="row mb-3">
//                                                 <div className="col-md-12 mb-3">
//                                                     <label className="form-label">Barcode</label>
//                                                     <div className="input-group">
//                                                         <input
//                                                             type="text"
//                                                             className={`form-control `}
//                                                             value={barcode}
//                                                             onChange={(e) => setBarCode(e.target.value)}

//                                                         />
//                                                         <button className="btn btn-outline-secondary" type="button">
//                                                             <i className="bi bi-upc-scan"></i> Scan
//                                                         </button>
//                                                     </div>

//                                                 </div>
//                                             </div>
//                                         </div>


//                                     </div>
//                                 </div>
//                             </div>


//                         </div>
//                     </div>

//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6> Dates Information </h6>
//                                         <p className="text-secondary">Enter the Manufacturing and Expiry Date  of the product</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-6">
//                                                     <label className="form-label fw-medium"> Manufacturing Date * </label>
//                                                     <input type="date" className="form-control" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} />
//                                                 </div>

//                                                 <div className="col-6">
//                                                     <label className="form-label fw-medium"> Expiry Date * </label>
//                                                     <input className="form-control" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>


//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Tax Information</h6>
//                                         <p className="text-secondary">Enter applicable tax rates</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3 align-items-center">
//                                                 <div className="col-md-12 mb-2">
//                                                     <div className="form-check form-switch">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             checked={isTaxable}
//                                                             onChange={(e) => setIsTaxable(e.target.checked)}
//                                                         />
//                                                         <label className="form-check-label">Taxable Product</label>
//                                                     </div>
//                                                 </div>

//                                                 {isTaxable && (
//                                                     <>
//                                                         <div className="col-md-4">
//                                                             <label className="form-label fw-medium">CGST (%) *</label>
//                                                             <input
//                                                                 className="form-control"
//                                                                 type="number"
//                                                                 placeholder="CGST"
//                                                                 value={cgst}
//                                                                 onChange={(e) => setCgst(e.target.value)}
//                                                                 min="0"
//                                                                 max="100"
//                                                                 step="0.01"
//                                                             />
//                                                         </div>
//                                                         <div className="col-md-4">
//                                                             <label className="form-label fw-medium">SGST (%) *</label>
//                                                             <input
//                                                                 className="form-control"
//                                                                 type="number"
//                                                                 placeholder="SGST"
//                                                                 value={sgst}
//                                                                 onChange={(e) => setSgst(e.target.value)}
//                                                                 min="0"
//                                                                 max="100"
//                                                                 step="0.01"
//                                                             />
//                                                         </div>
//                                                         <div className="col-md-4">
//                                                             <label className="form-label fw-medium">IGST (%)</label>
//                                                             <input
//                                                                 className="form-control"
//                                                                 type="number"
//                                                                 placeholder="IGST"
//                                                                 value={igst}
//                                                                 onChange={(e) => setIgst(e.target.value)}
//                                                                 min="0"
//                                                                 max="100"
//                                                                 step="0.01"
//                                                             />
//                                                         </div>
//                                                     </>
//                                                 )}
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
    const [images, setImages] = useState([]);
    const [prevImgs, setPrevImgs] = useState([]);
    const [productCode, setProductCode] = useState("");
    const [batchNumber, setBatchNumber] = useState("");
    const [manufacturingDate, setManufacturingDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [isTaxable, setIsTaxable] = useState(true);
    const [maxDiscount, setMaxDiscount] = useState(0);
    const [costPrice, setCostPrice] = useState(0);
    const [mrp, setMrp] = useState(0);
    const [cgst, setCgst] = useState(0);
    const [sgst, setSgst] = useState(0);
    const [igst, setIgst] = useState(0);
    const [barcode, setBarCode] = useState("");


    const [shippingCost, setShippingCost] = useState(0);
    const [freeShipping, setFreeShipping] = useState(false); // <-- add this line


    // API hooks
    const { data: categoryList } = useGetCategoryQuery();
    const { data: subCategoryList } = useGetSubCategoryByCatIdQuery(category, {
        skip: !category,
    });
    const [addProduct, { isLoading }] = useAddProductMutation();

    const navigate = useNavigate();

    // Reset subcategory when category changes
    useEffect(() => {
        setSubCategory('');
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name) return toast.error('Product name is required');
        if (!description) return toast.error('Product description is required');
        if (!price || price <= 0) return toast.error('Valid price is required');
        if (!category) return toast.error('Product category is required');
        if (!subCategory) return toast.error('Product subcategory is required');
        if (!stock || stock < 0) return toast.error('Valid stock quantity is required');
        if (images.length === 0) return toast.error('At least one product image is required');

        try {
            const formData = new FormData();

            // Basic Information
            formData.append('name', name);
            formData.append('description', description);
            formData.append('productCode', productCode);

            // Pricing Information
            formData.append('costPrice', costPrice);
            formData.append('price', price);
            formData.append('mrp', mrp);
            formData.append('maxDiscount', maxDiscount);

            // Category Information
            formData.append('category', category);
            formData.append('subCategory', subCategory);

            // Inventory Information
            formData.append('stock', stock);
            formData.append('batchNumber', batchNumber);
            formData.append('barcode', barcode);

            // Dates Information
            formData.append('manufacturingDate', manufacturingDate);
            formData.append('expiryDate', expiryDate);

            // Tax Information
            formData.append('isTaxable', isTaxable);
            formData.append('cgst', cgst);
            formData.append('sgst', sgst);
            formData.append('igst', igst);

            // Shipping Information

            formData.append('shippingCost', shippingCost);
            formData.append('freeShipping', freeShipping);


            // Images
            images.forEach((image) => {
                formData.append('images', image);
            });

            await addProduct(formData).unwrap();
            toast.success('Product added successfully!');
            setTimeout(() => navigate('/dashboard/product-list'), 1000);
        } catch (error) {
            toast.error(error.data?.message || 'An error occurred');
        }
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const newImages = [...images, ...files];
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImages(newImages);
            setPrevImgs(prev => [...prev, ...newPreviews]);
        }
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPrevImgs(prev => prev.filter((_, i) => i !== index));
    };


    return (
        <div className="container">
            <ToastContainer />
            <h5 className="mb-4">Add Product</h5>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row row-cols-1">
                    {/* Basic Information */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Basic Information</h6>
                                        <p className="text-secondary">Enter product details</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Product Name *</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Product Code *</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={productCode}
                                                        onChange={(e) => setProductCode(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <label className="form-label fw-medium">Description *</label>
                                                    <textarea
                                                        className="form-control"
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

                    {/* Pricing Information */}
                    {/* <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Pricing</h6>
                                        <p className="text-secondary">Set product pricing</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label fw-medium">Cost Price *</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        value={costPrice}
                                                        onChange={(e) => setCostPrice(e.target.value)}
                                                        min="0"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label fw-medium">Selling Price *</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        min={costPrice}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label fw-medium">MRP *</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        value={mrp}
                                                        onChange={(e) => setMrp(e.target.value)}
                                                        min={price}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Max Discount (%)</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        value={maxDiscount}
                                                        onChange={(e) => setMaxDiscount(e.target.value)}
                                                        min="0"
                                                        max="100"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Shipping cost </label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        value={shippingCost}
                                                        onChange={(e) => setShippingCost(e.target.value)}
                                                        min="0"
                                                        max="100"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6 className="mb-1">Pricing</h6>
                                        <p className="text-secondary mb-0">Set product pricing details</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label htmlFor="costPrice" className="form-label fw-medium">Cost Price *</label>
                                                    <input
                                                        id="costPrice"
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="e.g. 500"
                                                        value={costPrice}
                                                        onChange={(e) => setCostPrice(e.target.value)}
                                                        min="0"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="price" className="form-label fw-medium">Selling Price *</label>
                                                    <input
                                                        id="price"
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="e.g. 600"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        min={costPrice}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="mrp" className="form-label fw-medium">MRP *</label>
                                                    <input
                                                        id="mrp"
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="e.g. 650"
                                                        value={mrp}
                                                        onChange={(e) => setMrp(e.target.value)}
                                                        min={price}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="maxDiscount" className="form-label fw-medium">Max Discount (%)</label>
                                                    <input
                                                        id="maxDiscount"
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="e.g. 10"
                                                        value={maxDiscount}
                                                        onChange={(e) => setMaxDiscount(e.target.value)}
                                                        min="0"
                                                        max="100"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <label htmlFor="shippingCost" className="form-label fw-medium mb-0">
                                                            {freeShipping ? 'Free Shipping Enabled' : 'Shipping Cost'}
                                                        </label>
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="freeShippingToggle"
                                                                checked={freeShipping}
                                                                onChange={(e) => {
                                                                    setFreeShipping(e.target.checked);
                                                                    if (e.target.checked) setShippingCost(0);
                                                                }}
                                                            />
                                                            <label className="form-check-label small" htmlFor="freeShippingToggle">
                                                                Free
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <input
                                                        id="shippingCost"
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="e.g. 30"
                                                        value={shippingCost}
                                                        onChange={(e) => setShippingCost(e.target.value)}
                                                        min="0"
                                                        max="100"
                                                        disabled={freeShipping}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Category Information */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Category</h6>
                                        <p className="text-secondary">Select product category</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Category *</label>
                                                    <select
                                                        className="form-control"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                    >
                                                        <option value="">Select Category</option>
                                                        {categoryList?.map(cat => (
                                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Subcategory *</label>
                                                    <select
                                                        className="form-control"
                                                        value={subCategory}
                                                        onChange={(e) => setSubCategory(e.target.value)}
                                                        disabled={!category}
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Information */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Inventory</h6>
                                        <p className="text-secondary">Set stock details</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Current Stock Qty   *</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        value={stock}
                                                        onChange={(e) => setStock(e.target.value)}
                                                        min="0"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Batch Number *</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={batchNumber}
                                                        onChange={(e) => setBatchNumber(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-12">
                                                    <label className="form-label fw-medium">Barcode</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={barcode}
                                                            onChange={(e) => setBarCode(e.target.value)}
                                                        />
                                                        <button className="btn btn-outline-secondary" type="button">
                                                            <i className="bi bi-upc-scan"></i> Scan
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dates Information */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Dates</h6>
                                        <p className="text-secondary">Set product dates</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Manufacturing Date *</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={manufacturingDate}
                                                        onChange={(e) => setManufacturingDate(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-medium">Expiry Date *</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={expiryDate}
                                                        onChange={(e) => setExpiryDate(e.target.value)}
                                                        min={manufacturingDate}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tax Information */}
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Tax Information</h6>
                                        <p className="text-secondary">Set tax details</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="form-check form-switch mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={isTaxable}
                                                    onChange={(e) => setIsTaxable(e.target.checked)}
                                                />
                                                <label className="form-check-label">Taxable Product</label>
                                            </div>
                                            {isTaxable && (
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="form-label fw-medium">CGST (%)</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={cgst}
                                                            onChange={(e) => setCgst(e.target.value)}
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label fw-medium">SGST (%)</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={sgst}
                                                            onChange={(e) => setSgst(e.target.value)}
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label fw-medium">IGST (%)</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={igst}
                                                            onChange={(e) => setIgst(e.target.value)}
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </div>
                                                </div>
                                            )}
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
                                        <p className="text-secondary">Upload product images</p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="file-uploader">
                                                <label className="w-100">
                                                    <div className="border border-2 text-center p-3" style={{ '--bs-border-style': 'dashed', cursor: 'pointer' }}>
                                                        <svg className="text-body-tertiary m-3" xmlns="http://www.w3.org/2000/svg" width="41px" height="30px" viewBox="0 0 40.909 30">
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
                                                            type="file"
                                                            className="form-control"
                                                            hidden
                                                            multiple
                                                            onChange={handleImageChange}
                                                        />
                                                    </div>
                                                </label>
                                                {prevImgs.length > 0 && (
                                                    <div className="d-flex flex-wrap gap-2 mt-3">
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
                                                                    style={{ padding: '.25rem .5rem', fontSize: '.75rem' }}
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

                    {/* Form Actions */}
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
                                    <button className="btn btn-primary btn-lg fw-semibold" type="submit" disabled={isLoading}>
                                        {isLoading ? 'Submitting...' : 'Submit'}
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
