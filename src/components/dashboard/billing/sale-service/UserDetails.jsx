

// import React, { useState } from 'react';
// import { Table, Button, Form, Row, Col } from 'react-bootstrap';
// import Select from 'react-select';
// import { useGetProductQuery, useGetSubCategoryByCatIdQuery } from '../../../../store/features/product/productApi';
// import { useGetCategoryQuery } from '../../../../store/features/category/categoryApi';

// const ProductForm = () => {
//     const [customerName, setCustomerName] = useState('');
//     const [email, setEmail] = useState('');
//     const [mobile, setMobile] = useState('');
//     const [address, setAddress] = useState('');

//     const [category, setCategory] = useState('');
//     const [subCategory, setSubCategory] = useState('');
//     const [product, setProduct] = useState('');
//     const [productCode, setProductCode] = useState('');
//     const [batchNumber, setBatchNumber] = useState('');
//     const [expDate, setExpDate] = useState('');
//     const [quantity, setQuantity] = useState('1'); // default quantity
//     const [mrp, setMrp] = useState('');
//     const [costPrice, setCostPrice] = useState('');
//     const [price, setPrice] = useState('');
//     const [storePrice, setStorePrice] = useState('');
//     const [sgstPercent, setSgstPercent] = useState('');
//     const [cgstPercent, setCgstPercent] = useState('');
//     const [igstPercent, setIgstPercent] = useState('');
//     const [hsn, setHsn] = useState('');
//     const [isTaxable, setIsTaxable] = useState(false);
//     const [maxDiscount, setMaxDiscount] = useState('');
//     const [stock, setStock] = useState('');
//     const [isFreeShipping, setIsFreeShipping] = useState(false);
//     const [shippingCost, setShippingCost] = useState('');
//     const [items, setItems] = useState([]);

//     const { data: productData, isLoading: isProductLoading } = useGetProductQuery();
//     const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryQuery();
//     const { data: subCategoryData = [] } = useGetSubCategoryByCatIdQuery(category, {
//         skip: !category,
//     });

//     const categoryOptions = (categoryData || []).map(c => ({ value: c._id, label: c.name }));
//     const subCategoryOptions = subCategoryData.map(sc => ({ value: sc._id, label: sc.name }));
//     const products = productData || [];

//     const productOptions = products.map(p => ({
//         value: p.productCode,
//         label: `${p.name} (${p.productCode})`,
//         name: p.name,
//         costPrice: p.costPrice,
//         batchNumber: p.batchNumber,
//         mrp: p.mrp,
//         sgst: p.sgst,
//         cgst: p.cgst,
//         igst: p.igst,
//         hsn: p.barcode,
//         isTaxable: p.isTaxable,
//         maxDiscount: p.maxDiscount,
//         stock: p.stock,
//         category: typeof p.category === 'object' ? p.category._id : p.category,
//         subCategory: typeof p.subCategory === 'object' ? p.subCategory._id : p.subCategory,
//         isFreeShipping: p.shipping?.isFreeShipping || false,
//         shippingCost: p.shipping?.cost || 0
//     }));

//     const fillProductDetails = (p) => {
//         setProduct(p.name || '');
//         setCostPrice(p.costPrice || '');
//         setPrice(p.costPrice || '');
//         setBatchNumber(p.batchNumber || '');
//         setMrp(p.mrp || '');
//         setSgstPercent(p.sgst || '');
//         setCgstPercent(p.cgst || '');
//         setIgstPercent(p.igst || '');
//         setHsn(p.hsn || '');
//         setIsTaxable(p.isTaxable || false);
//         setMaxDiscount(p.maxDiscount || '');
//         setStock(p.stock || '');
//         setCategory(p.category || '');
//         setSubCategory(p.subCategory || '');
//         setIsFreeShipping(p.isFreeShipping || false);
//         setShippingCost(p.shippingCost?.toString() || '');
//         setQuantity('1'); // default to 1 when a product is selected
//     };

//     const handleProductCodeChange = (e) => {
//         const code = e.target.value;
//         setProductCode(code);
//         const found = productOptions.find(p => p.value === code);
//         if (found) fillProductDetails(found);
//     };

//     const handleProductSelect = (selected) => {
//         if (selected) {
//             setProductCode(selected.value);
//             fillProductDetails(selected);
//         } else {
//             clearForm();
//         }
//     };

//     const handleNumericInput = (setter) => (e) => {
//         const value = parseFloat(e.target.value);
//         setter(!isNaN(value) && value >= 0 ? value : 0);
//     };

//     const calculateAmounts = () => {
//         const qty = parseFloat(quantity || 0);
//         const rate = parseFloat(price || 0);
//         const discountPer = parseFloat(maxDiscount || 0);
//         const grossAmount = qty * rate;
//         const discountAmt = grossAmount * (discountPer / 100);
//         const taxable = grossAmount - discountAmt;

//         let sgst = 0, cgst = 0, igst = 0;
//         if (isTaxable) {
//             if (parseFloat(igstPercent) > 0) {
//                 igst = taxable * (parseFloat(igstPercent || 0) / 100);
//             } else {
//                 sgst = taxable * (parseFloat(sgstPercent || 0) / 100);
//                 cgst = taxable * (parseFloat(cgstPercent || 0) / 100);
//             }
//         }

//         const shipping = isFreeShipping ? 0 : parseFloat(shippingCost || 0);
//         const amount = taxable + sgst + cgst + igst + shipping;

//         return { grossAmount, discountAmt, sgst, cgst, igst, shipping, amount };
//     };

//     const handleAdd = () => {
//         if (!product || quantity <= 0) return alert("Please fill product and valid quantity.");
//         const calc = calculateAmounts();
//         const newItem = {
//             product, productCode, price, batchNumber, expDate, quantity,
//             mrp, storePrice, discount: maxDiscount, sgstPercent, cgstPercent, igstPercent,
//             hsn, isTaxable, maxDiscount, stock, isFreeShipping, shippingCost, category, subCategory,
//             ...calc
//         };
//         setItems([...items, newItem]);
//         clearForm();
//     };

//     const clearForm = () => {
//         setProduct('');
//         setProductCode('');
//         setPrice('');
//         setBatchNumber('');
//         setExpDate('');
//         setQuantity('1'); // reset to default 1
//         setMrp('');
//         setStorePrice('');
//         setSgstPercent('');
//         setCgstPercent('');
//         setIgstPercent('');
//         setHsn('');
//         setIsTaxable(false);
//         setMaxDiscount('');
//         setStock('');
//         setIsFreeShipping(false);
//         setShippingCost('');
//         setCategory('');
//         setSubCategory('');
//     };

//     const handleDelete = (idx) => {
//         setItems(items.filter((_, i) => i !== idx));
//     };

//     const customerOptions = [
//         { value: 'john-doe', label: 'John Doe' },
//         { value: 'jane-smith', label: 'Jane Smith' },
//         { value: 'alex-jones', label: 'Alex Jones' },
//     ];


//     return (
//         <div className="container mt-4">


//             <Form>
//                 <hr />
//                 <h5 className="mb-3">Customer Detail </h5>
//                 <Row className="mb-3">
//                     {/* <Col md={3}>
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control type="text" name="name" placeholder="Enter name" />
//                         </Form.Group>
//                     </Col> */}

//                     {/* <Col md={3}>
//                         <Form.Group controlId="formCustomer">
//                             <Form.Label>Customer Name</Form.Label>
//                             <Select
//                                 options={customerOptions}
//                                 placeholder="Select customer"
//                                 isClearable
//                             />
//                         </Form.Group>
//                     </Col> */}
//                     <Col md={3}>
//                         <Form.Group controlId="formEmail">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control type="email" name="email" placeholder="Enter email" />
//                         </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                         <Form.Group controlId="formMobile">
//                             <Form.Label>Mobile</Form.Label>
//                             <Form.Control type="text" name="mobile" placeholder="Enter mobile number" />
//                         </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                         <Form.Group controlId="formAddress">
//                             <Form.Label>Address</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 name="address"
//                                 placeholder="Enter address"
//                                 rows={3}
//                                 style={{ height: '45px', resize: 'none' }} // make it look like input height
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>


//                 <hr />
//                 <h5 className="mb-3">Product Entry Form</h5>
//                 <Row className="align-items-end g-3">
//                     <Col md={2}>
//                         <Form.Label>Product Code</Form.Label>
//                         <Form.Control value={productCode} onChange={handleProductCodeChange} />
//                     </Col>
//                     <Col md={4}>
//                         <Form.Label>Product</Form.Label>
//                         <Select
//                             options={productOptions}
//                             isLoading={isProductLoading}
//                             value={productOptions.find(opt => opt.value === productCode)}
//                             onChange={handleProductSelect}
//                             isClearable
//                         />
//                     </Col>
//                     <Col md={3}>
//                         <Form.Label>Category</Form.Label>
//                         <Select
//                             options={categoryOptions}
//                             isLoading={isCategoryLoading}
//                             value={categoryOptions.find(opt => opt.value === category)}
//                             onChange={(selected) => {
//                                 setCategory(selected ? selected.value : '');
//                                 setSubCategory('');
//                             }}
//                             isClearable
//                         />
//                     </Col>
//                     <Col md={3}>
//                         <Form.Label>SubCategory</Form.Label>
//                         <Select
//                             options={subCategoryOptions}
//                             value={subCategoryOptions.find(opt => opt.value === subCategory)}
//                             onChange={(selected) => setSubCategory(selected ? selected.value : '')}
//                             isClearable
//                             isDisabled={!category}
//                         />
//                     </Col>
//                 </Row>

//                 <Row className="mt-2 g-3">
//                     <Col md={2}><Form.Label>Batch No.</Form.Label><Form.Control value={batchNumber} onChange={e => setBatchNumber(e.target.value)} /></Col>
//                     <Col md={2}><Form.Label>Exp. Date</Form.Label><Form.Control type="date" value={expDate} onChange={e => setExpDate(e.target.value)} /></Col>
//                     <Col md={1}><Form.Label>Qty</Form.Label><Form.Control type="number" min="0" value={quantity} onChange={handleNumericInput(setQuantity)} /></Col>
//                     <Col md={2}><Form.Label>Buying Cost</Form.Label><Form.Control type="number" min="0" value={costPrice} onChange={handleNumericInput(setCostPrice)} /></Col>
//                     <Col md={2}><Form.Label>Sell Price</Form.Label><Form.Control type="number" min="0" value={price} onChange={handleNumericInput(setPrice)} /></Col>
//                     <Col md={2}><Form.Label>MRP</Form.Label><Form.Control type="number" min="0" value={mrp} onChange={handleNumericInput(setMrp)} /></Col>
//                     <Col md={1}><Form.Label>Disc %</Form.Label><Form.Control type="number" min="0" value={maxDiscount} onChange={handleNumericInput(setMaxDiscount)} /></Col>
//                 </Row>

//                 <Row className="mt-2 g-3 align-items-end">
//                     <Col md={1}><Form.Label>HSN</Form.Label><Form.Control value={hsn} onChange={e => setHsn(e.target.value)} /></Col>
//                     <Col md={1}><Form.Label>SGST%</Form.Label><Form.Control type="number" min="0" value={sgstPercent} onChange={handleNumericInput(setSgstPercent)} /></Col>
//                     <Col md={1}><Form.Label>CGST%</Form.Label><Form.Control type="number" min="0" value={cgstPercent} onChange={handleNumericInput(setCgstPercent)} /></Col>
//                     <Col md={1}><Form.Label>IGST%</Form.Label><Form.Control type="number" min="0" value={igstPercent} onChange={handleNumericInput(setIgstPercent)} /></Col>
//                     <Col md={1}><Form.Label>Taxable</Form.Label><Form.Check type="checkbox" checked={isTaxable} onChange={e => setIsTaxable(e.target.checked)} /></Col>
//                     <Col md={1}><Form.Label>Stock</Form.Label><Form.Control value={stock} readOnly /></Col>
//                     <Col md={2}><Form.Label>Shipping Cost</Form.Label><Form.Control type="number" min="0" value={shippingCost} onChange={handleNumericInput(setShippingCost)} /></Col>
//                     <Col md={1}><Form.Label>Free Ship</Form.Label><Form.Check type="checkbox" checked={isFreeShipping} onChange={e => setIsFreeShipping(e.target.checked)} /></Col>
//                     <Col md={2} className="text-end">
//                         <Button onClick={handleAdd} variant="primary">Add</Button>
//                     </Col>
//                 </Row>
//             </Form>

//             <div className="table-responsive mt-4">
//                 <Table striped bordered hover size="sm">
//                     <thead className="table-light">
//                         <tr>
//                             <th>#</th>
//                             <th>Product</th>
//                             <th>Code</th>
//                             <th>Qty</th>
//                             <th>Rate</th>
//                             <th>Gross</th>
//                             <th>Disc %</th>
//                             <th>Disc Amt</th>
//                             <th>SGST</th>
//                             <th>CGST</th>
//                             <th>IGST</th>
//                             <th>Shipping</th>
//                             <th>HSN</th>
//                             <th>Total</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {items.map((item, idx) => (
//                             <tr key={idx}>
//                                 <td>{idx + 1}</td>
//                                 <td>{item.product}</td>
//                                 <td>{item.productCode}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>{item.price}</td>
//                                 <td>{item.grossAmount.toFixed(2)}</td>
//                                 <td>{item.discount}</td>
//                                 <td>{item.discountAmt.toFixed(2)}</td>
//                                 <td>{item.sgst.toFixed(2)}</td>
//                                 <td>{item.cgst.toFixed(2)}</td>
//                                 <td>{item.igst.toFixed(2)}</td>
//                                 <td>{item.isFreeShipping ? 'Free' : item.shipping.toFixed(2)}</td>
//                                 <td>{item.hsn}</td>
//                                 <td>{item.amount.toFixed(2)}</td>
//                                 <td>
//                                     <Button variant="danger" size="sm" onClick={() => handleDelete(idx)}>
//                                         <i className="fa fa-trash"></i>
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </div>
//         </div>
//     );
// };

// export default ProductForm;


import React, { useEffect } from "react";
import UserForm from "./UserDetails";
import { fetchCustomers } from "../../../../store/reducers/customerReducer";
import { useSelector, useDispatch } from "react-redux";

const UserDetails = () => {


    const dispatch = useDispatch();
    const { customers = [], loading, deleteStatus, error } = useSelector(state => state.customers);




    useEffect(() => {
        console.log('Fetching customers...');
        dispatch(fetchCustomers());
    }, [dispatch]);


    console.log("customer is =======>", customers)

    return (
        <>
            <h1> this is user form</h1>
            <UserForm users={customers} />
        </>
    )
}

export default UserDetails;