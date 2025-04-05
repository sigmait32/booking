
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
//     const [mrp, setMrp] = useState(0);
//     const [costPrice, setCostPrice] = useState(0);
//     const [category, setCategory] = useState('');
//     const [subCategory, setSubCategory] = useState('');
//     const [stock, setStock] = useState(0);
//     const [images, setImages] = useState([]);
//     const [prevImgs, setPrevImgs] = useState([]);
//     const [productCode, setProductCode] = useState("");
//     const [batchNumber, setBatchNumber] = useState("");
//     const [manufacturingDate, setManufacturingDate] = useState("");
//     const [expiryDate, setExpiryDate] = useState("");
//     const [unitType, setUnitType] = useState('');
//     const [packSize, setPackSize] = useState(1);
//     const [barcode, setBarcode] = useState('');
//     const [maxDiscount, setMaxDiscount] = useState(0);
//     const [isTaxable, setIsTaxable] = useState(true);
//     const [cgst, setCgst] = useState(0);
//     const [sgst, setSgst] = useState(0);
//     const [igst, setIgst] = useState(0);

//     // API hooks
//     const { data: categoryList, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoryQuery();
//     const { data: subCategoryList, isLoading: isSubCategoryLoading, isError: isSubCategoryError } = useGetSubCategoryByCatIdQuery(category, {
//         skip: !category,
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
//         if (mrp < price) return toast.error('MRP cannot be less than selling price');
//         if (price < costPrice) return toast.error('Selling price cannot be less than cost price');
//         if (!category) return toast.error('Product category is required');
//         if (!subCategory) return toast.error('Product subcategory is required');
//         if (!stock || stock < 0) return toast.error('Product stock is required and must be a non-negative number');
//         if (images.length === 0) return toast.error('At least one product image is required');
//         if (!productCode) return toast.error('Product code is required');
//         if (!batchNumber) return toast.error('Batch number is required');
//         if (!manufacturingDate) return toast.error('Manufacturing date is required');
//         if (!expiryDate) return toast.error('Expiry date is required');
//         if (new Date(expiryDate) <= new Date(manufacturingDate)) {
//             return toast.error('Expiry date must be after manufacturing date');
//         }
//         if (!unitType) return toast.error('Unit type is required');
//         if (isTaxable && (!cgst || !sgst)) return toast.error('Tax rates are required for taxable products');

//         try {
//             // Create FormData object
//             const formData = new FormData();
//             formData.append('name', name);
//             formData.append('description', description);
//             formData.append('price', price);
//             formData.append('mrp', mrp);
//             formData.append('costPrice', costPrice);
//             formData.append('category', category);
//             formData.append('subCategory', subCategory);
//             formData.append('stock', stock);
//             formData.append('productCode', productCode);
//             formData.append('batchNumber', batchNumber);
//             formData.append('manufacturingDate', manufacturingDate);
//             formData.append('expiryDate', expiryDate);
//             formData.append('unitType', unitType);
//             formData.append('packSize', packSize);
//             formData.append('barcode', barcode);
//             formData.append('maxDiscount', maxDiscount);
//             formData.append('isTaxable', isTaxable);
//             formData.append('cgst', cgst);
//             formData.append('sgst', sgst);
//             formData.append('igst', igst);

//             // Append each image file to FormData
//             images.forEach((image) => {
//                 formData.append('images', image);
//             });

//             // Make API call
//             await addProduct(formData).unwrap();
//             toast.success('Product added successfully!');
//             setTimeout(() => {
//                 navigate('/dashboard/product-list');
//             }, 1000);
//         } catch (error) {
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

//                     {/* Product Identification */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Product Identification</h6>
//                                         <p className="text-secondary">Enter product identification details</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-md-6">
//                                                     <label className="form-label fw-medium">Product Code *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="text"
//                                                         placeholder="Product Code"
//                                                         value={productCode}
//                                                         onChange={(e) => setProductCode(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <label className="form-label fw-medium">Barcode</label>
//                                                     <div className="input-group">
//                                                         <input
//                                                             className="form-control"
//                                                             type="text"
//                                                             placeholder="Barcode"
//                                                             value={barcode}
//                                                             onChange={(e) => setBarcode(e.target.value)}
//                                                         />
//                                                         <button className="btn btn-outline-secondary" type="button">
//                                                             <i className="bi bi-upc-scan"></i> Scan
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Batch Number *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="text"
//                                                         placeholder="Batch Number"
//                                                         value={batchNumber}
//                                                         onChange={(e) => setBatchNumber(e.target.value)}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Manufacturing Dates */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Manufacturing Dates</h6>
//                                         <p className="text-secondary">Enter manufacturing and expiry dates</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-md-6">
//                                                     <label className="form-label fw-medium">Manufacturing Date *</label>
//                                                     <input
//                                                         type="date"
//                                                         className="form-control"
//                                                         value={manufacturingDate}
//                                                         onChange={(e) => setManufacturingDate(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <label className="form-label fw-medium">Expiry Date *</label>
//                                                     <input
//                                                         type="date"
//                                                         className="form-control"
//                                                         value={expiryDate}
//                                                         onChange={(e) => setExpiryDate(e.target.value)}
//                                                         min={manufacturingDate}
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
//                                                         rows="4"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pricing Information */}
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

//                     {/* Category Selection */}
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

//                     {/* Subcategory Selection */}
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

//                     {/* Unit Information */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Unit Information</h6>
//                                         <p className="text-secondary">Enter product unit details</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-md-6">
//                                                     <label className="form-label fw-medium">Unit Type *</label>
//                                                     <select
//                                                         className="form-control"
//                                                         value={unitType}
//                                                         onChange={(e) => setUnitType(e.target.value)}
//                                                     >
//                                                         <option value="">Select Unit</option>
//                                                         <option value="tablet">Tablet</option>
//                                                         <option value="capsule">Capsule</option>
//                                                         <option value="bottle">Bottle</option>
//                                                         <option value="tube">Tube</option>
//                                                         <option value="ml">ml</option>
//                                                         <option value="mg">mg</option>
//                                                         <option value="box">Box</option>
//                                                         <option value="pack">Pack</option>
//                                                     </select>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <label className="form-label fw-medium">Pack Size *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="number"
//                                                         placeholder="Items per pack"
//                                                         value={packSize}
//                                                         onChange={(e) => setPackSize(e.target.value)}
//                                                         min="1"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Stock Information */}
//                     <div className="col">
//                         <div className="py-4 border-top">
//                             <div className="row align-items-center">
//                                 <div className="col-md-4">
//                                     <div>
//                                         <h6>Stock Information</h6>
//                                         <p className="text-secondary">Enter product stock details</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card border-0 p-3 shadow-sm">
//                                         <div className="card-body">
//                                             <div className="row mb-3">
//                                                 <div className="col-12">
//                                                     <label className="form-label fw-medium">Current Stock *</label>
//                                                     <input
//                                                         className="form-control"
//                                                         type="number"
//                                                         placeholder="Product Stock"
//                                                         value={stock}
//                                                         onChange={(e) => setStock(e.target.value)}
//                                                         min="0"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Tax Information */}
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
//                                                             accept="image/*"
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
//                                                                     className="rounded"
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
//                                     <button
//                                         className="btn btn-primary btn-lg fw-semibold"
//                                         type="submit"
//                                         disabled={isLoading}
//                                     >
//                                         {isLoading ? 'Submitting...' : 'Submit'}
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductForm = ({ productId }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [existingProduct, setExistingProduct] = useState(null);

    // Form validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Product name is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number()
            .required('Price is required')
            .positive('Price must be positive')
            .moreThan(0, 'Price must be greater than 0'),
        mrp: Yup.number()
            .required('MRP is required')
            .positive('MRP must be positive')
            .moreThan(Yup.ref('price'), 'MRP must be greater than selling price'),
        costPrice: Yup.number()
            .required('Cost price is required')
            .positive('Cost price must be positive')
            .lessThan(Yup.ref('price'), 'Cost price must be less than selling price'),
        category: Yup.string().required('Category is required'),
        subCategory: Yup.string().required('Subcategory is required'),
        stock: Yup.number()
            .required('Stock is required')
            .min(0, 'Stock cannot be negative')
            .integer('Stock must be a whole number'),
        productCode: Yup.string().required('Product code is required'),
        batchNumber: Yup.string().required('Batch number is required'),
        manufacturingDate: Yup.date().required('Manufacturing date is required'),
        expiryDate: Yup.date()
            .required('Expiry date is required')
            .min(Yup.ref('manufacturingDate'), 'Expiry must be after manufacturing'),
        unitType: Yup.string().required('Unit type is required'),
        packSize: Yup.number()
            .required('Pack size is required')
            .min(1, 'Pack size must be at least 1')
            .integer('Pack size must be a whole number'),
        maxDiscount: Yup.number()
            .min(0, 'Discount cannot be negative')
            .max(100, 'Discount cannot exceed 100%'),
        isTaxable: Yup.boolean(),
        cgst: Yup.number().when('isTaxable', {
            is: true,
            then: Yup.number()
                .required('CGST is required for taxable products')
                .min(0, 'CGST cannot be negative')
                .max(100, 'CGST cannot exceed 100%')
        }),
        sgst: Yup.number().when('isTaxable', {
            is: true,
            then: Yup.number()
                .required('SGST is required for taxable products')
                .min(0, 'SGST cannot be negative')
                .max(100, 'SGST cannot exceed 100%')
        }),
        igst: Yup.number()
            .min(0, 'IGST cannot be negative')
            .max(100, 'IGST cannot exceed 100%'),
        images: Yup.array()
            .min(1, 'At least one image is required')
            .required('Images are required')
    });

    // Formik initialization
    const formik = useFormik({
        initialValues: {
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
            unitType: '',
            packSize: 1,
            barcode: '',
            maxDiscount: 0,
            isTaxable: true,
            cgst: 0,
            sgst: 0,
            igst: 0,
            images: []
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const formData = new FormData();

                // Append all form values
                Object.keys(values).forEach(key => {
                    if (key !== 'images') {
                        formData.append(key, values[key]);
                    }
                });

                // Append images
                values.images.forEach((image, index) => {
                    formData.append('images', image);
                });

                if (productId) {
                    // Update existing product
                    await axios.put(`/api/products/${productId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    toast.success('Product updated successfully!');
                } else {
                    // Create new product
                    await axios.post('/api/products', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    toast.success('Product created successfully!');
                }

                setTimeout(() => navigate('/products'), 1500);
            } catch (error) {
                toast.error(error.response?.data?.message || 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
    });

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                toast.error('Failed to load categories');
            }
        };

        fetchCategories();
    }, []);

    // Fetch subcategories when category changes
    useEffect(() => {
        const fetchSubCategories = async () => {
            if (formik.values.category) {
                try {
                    const response = await axios.get(`/api/subcategories?category=${formik.values.category}`);
                    setSubCategories(response.data);
                    formik.setFieldValue('subCategory', ''); // Reset subcategory
                } catch (error) {
                    toast.error('Failed to load subcategories');
                }
            }
        };

        fetchSubCategories();
    }, [formik.values.category]);

    // Fetch product data if editing
    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`/api/products/${productId}`);
                    setExistingProduct(response.data);

                    // Set form values from existing product
                    Object.keys(response.data).forEach(key => {
                        if (key !== '_id' && key !== '__v' && key !== 'images') {
                            formik.setFieldValue(key, response.data[key]);
                        }
                    });

                    // Set image previews
                    setImagePreviews(response.data.images || []);
                } catch (error) {
                    toast.error('Failed to load product data');
                    navigate('/products');
                }
            };

            fetchProduct();
        }
    }, [productId]);

    // Handle image upload
    const handleImageChange = (event) => {
        const files = Array.from(event.currentTarget.files);
        if (files && files.length > 0) {
            // Create preview URLs
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);

            // Update formik values
            formik.setFieldValue('images', [...formik.values.images, ...files]);
        }
    };

    // Remove image
    const handleRemoveImage = (index) => {
        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);

        const newImages = [...formik.values.images];
        newImages.splice(index, 1);
        formik.setFieldValue('images', newImages);
    };

    return (
        <div className="container py-4">

            <div className="card mb-4">
                <div className="card-header bg-light">
                    <h5>Basic Information</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Product Name*</label>
                            <input
                                type="text"
                                className={`form-control `}

                            />

                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Product Code*</label>
                            <input
                                type="text"
                                className={`form-control`}

                            />

                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description*</label>
                        <textarea
                            className={`form-control`}
                            rows="4"
                        // {...formik.getFieldProps('description')}
                        ></textarea>

                    </div>
                </div>
            </div>

            <h2 className="mb-4">{productId ? 'Edit Product' : 'Add New Product'}</h2>

            <form onSubmit={formik.handleSubmit}>
                {/* Basic Information Section */}
                <div className="card mb-4">
                    <div className="card-header bg-light">
                        <h5>Basic Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Product Name*</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="invalid-feedback">{formik.errors.name}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Product Code*</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.productCode && formik.errors.productCode ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('productCode')}
                                />
                                {formik.touched.productCode && formik.errors.productCode && (
                                    <div className="invalid-feedback">{formik.errors.productCode}</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description*</label>
                            <textarea
                                className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                rows="4"
                                {...formik.getFieldProps('description')}
                            ></textarea>
                            {formik.touched.description && formik.errors.description && (
                                <div className="invalid-feedback">{formik.errors.description}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pricing Information Section */}
                <div className="card mb-4">
                    <div className="card-header bg-light">
                        <h5>Pricing Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Cost Price*</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${formik.touched.costPrice && formik.errors.costPrice ? 'is-invalid' : ''}`}
                                        {...formik.getFieldProps('costPrice')}
                                    />
                                </div>
                                {formik.touched.costPrice && formik.errors.costPrice && (
                                    <div className="invalid-feedback">{formik.errors.costPrice}</div>
                                )}
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Selling Price*</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${formik.touched.price && formik.errors.price ? 'is-invalid' : ''}`}
                                        {...formik.getFieldProps('price')}
                                    />
                                </div>
                                {formik.touched.price && formik.errors.price && (
                                    <div className="invalid-feedback">{formik.errors.price}</div>
                                )}
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">MRP*</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${formik.touched.mrp && formik.errors.mrp ? 'is-invalid' : ''}`}
                                        {...formik.getFieldProps('mrp')}
                                    />
                                </div>
                                {formik.touched.mrp && formik.errors.mrp && (
                                    <div className="invalid-feedback">{formik.errors.mrp}</div>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Maximum Discount (%)</label>
                                <input
                                    type="number"
                                    className={`form-control ${formik.touched.maxDiscount && formik.errors.maxDiscount ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('maxDiscount')}
                                />
                                {formik.touched.maxDiscount && formik.errors.maxDiscount && (
                                    <div className="invalid-feedback">{formik.errors.maxDiscount}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category & Subcategory Section */}
                <div className="card mb-4">
                    <div className="card-header bg-light">
                        <h5>Category Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Category*</label>
                                <select
                                    className={`form-select ${formik.touched.category && formik.errors.category ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('category')}
                                >
                                    <option value="">Select Category</option>
                                    {/* {categories?.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))} */}
                                </select>
                                {formik.touched.category && formik.errors.category && (
                                    <div className="invalid-feedback">{formik.errors.category}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Subcategory*</label>
                                <select
                                    className={`form-select ${formik.touched.subCategory && formik.errors.subCategory ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('subCategory')}
                                    disabled={!formik.values.category}
                                >
                                    <option value="">Select Subcategory</option>
                                    {subCategories.map(subCategory => (
                                        <option key={subCategory._id} value={subCategory._id}>
                                            {subCategory.name}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.subCategory && formik.errors.subCategory && (
                                    <div className="invalid-feedback">{formik.errors.subCategory}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inventory Information Section */}
                <div className="card mb-4">
                    <div className="card-header bg-light">
                        <h5>Inventory Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Current Stock*</label>
                                <input
                                    type="number"
                                    className={`form-control ${formik.touched.stock && formik.errors.stock ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('stock')}
                                />
                                {formik.touched.stock && formik.errors.stock && (
                                    <div className="invalid-feedback">{formik.errors.stock}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Batch Number*</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.batchNumber && formik.errors.batchNumber ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('batchNumber')}
                                />
                                {formik.touched.batchNumber && formik.errors.batchNumber && (
                                    <div className="invalid-feedback">{formik.errors.batchNumber}</div>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Barcode</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.barcode && formik.errors.barcode ? 'is-invalid' : ''}`}
                                        {...formik.getFieldProps('barcode')}
                                    />
                                    <button className="btn btn-outline-secondary" type="button">
                                        <i className="bi bi-upc-scan"></i> Scan
                                    </button>
                                </div>
                                {formik.touched.barcode && formik.errors.barcode && (
                                    <div className="invalid-feedback">{formik.errors.barcode}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dates Information Section */}
                <div className="card mb-4">
                    <div className="card-header bg-light">
                        <h5>Dates Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Manufacturing Date*</label>
                                <input
                                    type="date"
                                    className={`form-control ${formik.touched.manufacturingDate && formik.errors.manufacturingDate ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('manufacturingDate')}
                                />
                                {formik.touched.manufacturingDate && formik.errors.manufacturingDate && (
                                    <div className="invalid-feedback">{formik.errors.manufacturingDate}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Expiry Date*</label>
                                <input
                                    type="date"
                                    className={`form-control ${formik.touched.expiryDate && formik.errors.expiryDate ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('expiryDate')}
                                    min={formik.values.manufacturingDate}
                                />
                                {formik.touched.expiryDate && formik.errors.expiryDate && (
                                    <div className="invalid-feedback">{formik.errors.expiryDate}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unit Information Section */}
                {/* <div className="card mb-4">
                    <div className="card-header bg-light">
                        <h5>Unit Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Unit Type*</label>
                                <select
                                    className={`form-select ${formik.touched.unitType && formik.errors.unitType ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('unitType')}
                                >
                                    <option value="">Select Unit Type</option>
                                    <option value="tablet">Tablet</option>
                                    <option value="capsule">Capsule</option>
                                    <option value="bottle">Bottle</option>
                                    <option value="tube">Tube</option>
                                    <option value="ml">ml</option>
                                    <option value="mg">mg</option>
                                    <option value="box">Box</option>
                                    <option value="pack">Pack</option>
                                </select>
                                {formik.touched.unitType && formik.errors.unitType && (
                                    <div className="invalid-feedback">{formik.errors.unitType}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Pack Size*</label>
                                <input
                                    type="number"
                                    className={`form-control ${formik.touched.packSize && formik.errors.packSize ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('packSize')}
                                />
                                {formik.touched.packSize && formik.errors.packSize && (
                                    <div className="invalid-feedback">{formik.errors.packSize}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Tax Information Section */}
                <div className="card mb-4">
                    <div className="card-header bg-light">
                        <h5>Tax Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="mb-3 form-check form-switch">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isTaxable"
                                {...formik.getFieldProps('isTaxable')}
                                checked={formik.values.isTaxable}
                            />
                            <label className="form-check-label" htmlFor="isTaxable">
                                Taxable Product
                            </label>
                        </div>

                        {formik.values.isTaxable && (
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">CGST (%)*</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${formik.touched.cgst && formik.errors.cgst ? 'is-invalid' : ''}`}
                                        {...formik.getFieldProps('cgst')}
                                    />
                                    {formik.touched.cgst && formik.errors.cgst && (
                                        <div className="invalid-feedback">{formik.errors.cgst}</div>
                                    )}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">SGST (%)*</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${formik.touched.sgst && formik.errors.sgst ? 'is-invalid' : ''}`}
                                        {...formik.getFieldProps('sgst')}
                                    />
                                    {formik.touched.sgst && formik.errors.sgst && (
                                        <div className="invalid-feedback">{formik.errors.sgst}</div>
                                    )}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">IGST (%)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${formik.touched.igst && formik.errors.igst ? 'is-invalid' : ''}`}
                                        {...formik.getFieldProps('igst')}
                                    />
                                    {formik.touched.igst && formik.errors.igst && (
                                        <div className="invalid-feedback">{formik.errors.igst}</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Images Section */}
                <div className="card mb-4">
                    <div className="card-header bg-light">
                        <h5>Product Images</h5>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Upload Images*</label>
                            <input
                                type="file"
                                className="form-control"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {formik.touched.images && formik.errors.images && (
                                <div className="text-danger small mt-1">{formik.errors.images}</div>
                            )}
                        </div>

                        <div className="d-flex flex-wrap gap-3">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="position-relative" style={{ width: '120px', height: '120px' }}>
                                    <img
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        className="img-thumbnail h-100 w-100 object-fit-cover"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="d-flex justify-content-between mb-4">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/products')}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {productId ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            productId ? 'Update Product' : 'Create Product'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;



