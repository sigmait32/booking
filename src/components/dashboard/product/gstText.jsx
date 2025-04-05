


// import React, { useState } from "react";

// const ProductForm = () => {
//     const [productCode, setProductCode] = useState("");
//     const [batchNumber, setBatchNumber] = useState("");
//     const [productName, setProductName] = useState("");
//     const [sku, setSku] = useState("");
//     const [mrp, setMrp] = useState(0);
//     const [wholesalePrice, setWholesalePrice] = useState(0);
//     const [discount, setDiscount] = useState(0);
//     const [gstType, setGstType] = useState("cgst_sgst"); // Default to CGST + SGST
//     const [cgst, setCgst] = useState(9);
//     const [sgst, setSgst] = useState(9);
//     const [igst, setIgst] = useState(18);
//     const [stockQuantity, setStockQuantity] = useState(0);
//     const [manufacturingDate, setManufacturingDate] = useState("");
//     const [expiryDate, setExpiryDate] = useState("");

//     // 🔹 Auto-calculate GST based on selection
//     const taxAmount =
//         gstType === "cgst_sgst"
//             ? (mrp * (cgst + sgst)) / 100
//             : (mrp * igst) / 100;

//     // 🔹 Auto-calculate Final Price After Tax & Discount
//     const finalPrice = (mrp - (mrp * discount) / 100 + taxAmount).toFixed(2);

//     // 🔹 Handle Form Submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = {
//             productCode,
//             batchNumber,
//             productName,
//             sku,
//             mrp,
//             wholesalePrice,
//             discount,
//             gstType,
//             cgst: gstType === "cgst_sgst" ? cgst : 0,
//             sgst: gstType === "cgst_sgst" ? sgst : 0,
//             igst: gstType === "igst" ? igst : 0,
//             stockQuantity,
//             manufacturingDate,
//             expiryDate,
//             finalPrice,
//         };
//         console.log("Product Data:", formData);
//         alert("Product saved successfully!");
//     };

//     return (
//         <div className="container mt-4">
//             <h4 className="mb-3">Product & Tax Details</h4>
//             <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
//                 <div className="row mb-3">
//                     <div className="col-md-6">
//                         <label className="form-label">Product Code *</label>
//                         <input className="form-control" type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} required />
//                     </div>
//                     <div className="col-md-6">
//                         <label className="form-label">Batch Number *</label>
//                         <input className="form-control" type="text" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} required />
//                     </div>
//                 </div>

//                 <div className="row mb-3">
//                     <div className="col-md-6">
//                         <label className="form-label">Product Name *</label>
//                         <input className="form-control" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
//                     </div>
//                     <div className="col-md-6">
//                         <label className="form-label">SKU (Stock Keeping Unit) *</label>
//                         <input className="form-control" type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />
//                     </div>
//                 </div>

//                 <div className="row mb-3">
//                     <div className="col-md-6">
//                         <label className="form-label">MRP (₹) *</label>
//                         <input className="form-control" type="number" value={mrp} onChange={(e) => setMrp(parseFloat(e.target.value))} required />
//                     </div>
//                     <div className="col-md-6">
//                         <label className="form-label">Wholesale Price (₹)</label>
//                         <input className="form-control" type="number" value={wholesalePrice} onChange={(e) => setWholesalePrice(parseFloat(e.target.value))} />
//                     </div>
//                 </div>

//                 <div className="row mb-3">
//                     <div className="col-md-6">
//                         <label className="form-label">Discount (%)</label>
//                         <input className="form-control" type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value))} />
//                     </div>
//                     <div className="col-md-6">
//                         <label className="form-label">Stock Quantity</label>
//                         <input className="form-control" type="number" value={stockQuantity} onChange={(e) => setStockQuantity(parseInt(e.target.value))} />
//                     </div>
//                 </div>

//                 {/* GST Selection */}
//                 <div className="row mb-3">
//                     <div className="col-md-6">
//                         <label className="form-label">GST Type *</label>
//                         <select className="form-control" value={gstType} onChange={(e) => setGstType(e.target.value)}>
//                             <option value="cgst_sgst">CGST + SGST</option>
//                             <option value="igst">IGST</option>
//                         </select>
//                     </div>

//                     {gstType === "cgst_sgst" ? (
//                         <>
//                             <div className="col-md-3">
//                                 <label className="form-label">CGST (%)</label>
//                                 <input className="form-control" type="number" value={cgst} onChange={(e) => setCgst(parseFloat(e.target.value))} />
//                             </div>
//                             <div className="col-md-3">
//                                 <label className="form-label">SGST (%)</label>
//                                 <input className="form-control" type="number" value={sgst} onChange={(e) => setSgst(parseFloat(e.target.value))} />
//                             </div>
//                         </>
//                     ) : (
//                         <div className="col-md-6">
//                             <label className="form-label">IGST (%)</label>
//                             <input className="form-control" type="number" value={igst} onChange={(e) => setIgst(parseFloat(e.target.value))} />
//                         </div>
//                     )}
//                 </div>

//                 {/* Expiry & Manufacturing Date */}
//                 <div className="row mb-3">
//                     <div className="col-md-6">
//                         <label className="form-label">Manufacturing Date</label>
//                         <input className="form-control" type="date" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} />
//                     </div>
//                     <div className="col-md-6">
//                         <label className="form-label">Expiry Date *</label>
//                         <input className="form-control" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
//                     </div>
//                 </div>

//                 {/* Final Price */}
//                 <div className="row mb-3">
//                     <div className="col-12">
//                         <label className="form-label">Final Price After Tax & Discount (₹)</label>
//                         <input className="form-control" type="text" readOnly value={finalPrice} />
//                     </div>
//                 </div>

//                 <button type="submit" className="btn btn-primary">Save Product</button>
//             </form>
//         </div>
//     );
// };

// export default ProductForm;




import React, { useState } from "react";

const ProductForm = () => {
    const [productCode, setProductCode] = useState("");
    const [batchNumber, setBatchNumber] = useState("");
    const [productName, setProductName] = useState("");
    const [sku, setSku] = useState("");
    const [mrp, setMrp] = useState(0);
    const [wholesalePrice, setWholesalePrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [gstType, setGstType] = useState("cgst_sgst"); // Default to CGST + SGST
    const [cgst, setCgst] = useState(9);
    const [sgst, setSgst] = useState(9);
    const [igst, setIgst] = useState(18);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [manufacturingDate, setManufacturingDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    // 🔹 Auto-calculate GST based on selection
    const taxAmount =
        gstType === "cgst_sgst"
            ? (mrp * (cgst + sgst)) / 100
            : (mrp * igst) / 100;

    // 🔹 Auto-calculate Final Price After Tax & Discount
    const finalPrice = (mrp - (mrp * discount) / 100 + taxAmount).toFixed(2);

    // 🔹 Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            productCode,
            batchNumber,
            productName,
            sku,
            mrp,
            wholesalePrice,
            discount,
            gstType,
            cgst: gstType === "cgst_sgst" ? cgst : 0,
            sgst: gstType === "cgst_sgst" ? sgst : 0,
            igst: gstType === "igst" ? igst : 0,
            stockQuantity,
            manufacturingDate,
            expiryDate,
            finalPrice,
        };
        console.log("Product Data:", formData);
        alert("Product saved successfully!");
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-3">Product & Tax Details</h4>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Product Code *</label>
                        <input className="form-control" type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Batch Number *</label>
                        <input className="form-control" type="text" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} required />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Product Name *</label>
                        <input className="form-control" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">SKU (Stock Keeping Unit) *</label>
                        <input className="form-control" type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">MRP (₹) *</label>
                        <input className="form-control" type="number" value={mrp} onChange={(e) => setMrp(parseFloat(e.target.value))} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Wholesale Price (₹)</label>
                        <input className="form-control" type="number" value={wholesalePrice} onChange={(e) => setWholesalePrice(parseFloat(e.target.value))} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Discount (%)</label>
                        <input className="form-control" type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value))} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Stock Quantity</label>
                        <input className="form-control" type="number" value={stockQuantity} onChange={(e) => setStockQuantity(parseInt(e.target.value))} />
                    </div>
                </div>

                {/* GST Selection */}
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">GST Type *</label>
                        <select className="form-control" value={gstType} onChange={(e) => setGstType(e.target.value)}>
                            <option value="cgst_sgst">CGST + SGST</option>
                            <option value="igst">IGST</option>
                        </select>
                    </div>

                    {gstType === "cgst_sgst" ? (
                        <>
                            <div className="col-md-3">
                                <label className="form-label">CGST (%)</label>
                                <input className="form-control" type="number" value={cgst} onChange={(e) => setCgst(parseFloat(e.target.value))} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">SGST (%)</label>
                                <input className="form-control" type="number" value={sgst} onChange={(e) => setSgst(parseFloat(e.target.value))} />
                            </div>
                        </>
                    ) : (
                        <div className="col-md-6">
                            <label className="form-label">IGST (%)</label>
                            <input className="form-control" type="number" value={igst} onChange={(e) => setIgst(parseFloat(e.target.value))} />
                        </div>
                    )}
                </div>

                {/* Expiry & Manufacturing Date */}
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Manufacturing Date</label>
                        <input className="form-control" type="date" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Expiry Date *</label>
                        <input className="form-control" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                    </div>
                </div>

                {/* Final Price */}
                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label">Final Price After Tax & Discount (₹)</label>
                        <input className="form-control" type="text" readOnly value={finalPrice} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Save Product</button>
            </form>
        </div>
    );
};

export default ProductForm;


