


import React, { useState } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useGetProductQuery, useGetSubCategoryByCatIdQuery } from '../../../../store/features/product/productApi';
import { useGetCategoryQuery } from '../../../../store/features/category/categoryApi';
import EntryList from './EntryList';
import { useCreateSaleEntryMutation } from '../../../../store/features/sale-service/saleEntryApi';
import CustomerForm from './CustomerForm';

const ProductForm = () => {
    const [customerId, setCustomerId] = useState("");
    const [fullName, setFullName] = useState('');
    const [gst_number, setGstNumber] = useState("")
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [product, setProduct] = useState('');
    const [productId, setProductId] = useState("")
    const [productCode, setProductCode] = useState('');
    const [batchNumber, setBatchNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [quantity, setQuantity] = useState('1'); // default quantity
    const [mrp, setMrp] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [price, setPrice] = useState('');
    const [storePrice, setStorePrice] = useState('');
    const [sgstPercent, setSgstPercent] = useState('');
    const [cgstPercent, setCgstPercent] = useState('');
    const [igstPercent, setIgstPercent] = useState('');
    const [hsn, setHsn] = useState('');
    const [isTaxable, setIsTaxable] = useState(false);
    const [maxDiscount, setMaxDiscount] = useState('');
    const [stock, setStock] = useState('');
    const [isFreeShipping, setIsFreeShipping] = useState(false);
    const [shippingCost, setShippingCost] = useState('');
    const [items, setItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [customerDtl, setCustomerDtl] = useState({});

    const { data: productData, isLoading: isProductLoading } = useGetProductQuery();
    const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryQuery();
    const { data: subCategoryData = [] } = useGetSubCategoryByCatIdQuery(category, {
        skip: !category,
    });

    const [createSaleEntry, { isLoading, isSuccess, isError, error }] = useCreateSaleEntryMutation();

    const categoryOptions = (categoryData || []).map(c => ({ value: c._id, label: c.name }));
    const subCategoryOptions = subCategoryData.map(sc => ({ value: sc._id, label: sc.name }));
    const products = productData || [];

    const productOptions = products.map(p => ({
        productId: p._id,
        value: p.productCode,
        label: `${p.name} (${p.productCode})`,
        name: p.name,
        costPrice: p.costPrice,
        batchNumber: p.batchNumber,
        mrp: p.mrp,
        sgst: p.sgst,
        cgst: p.cgst,
        igst: p.igst,
        hsn: p.barcode,
        isTaxable: p.isTaxable,
        maxDiscount: p.maxDiscount,
        stock: p.stock,
        category: typeof p.category === 'object' ? p.category._id : p.category,
        subCategory: typeof p.subCategory === 'object' ? p.subCategory._id : p.subCategory,
        isFreeShipping: p.shipping?.isFreeShipping || false,
        shippingCost: p.shipping?.cost || 0
    }));

    // console.log("products  is =========>", products)

    const fillProductDetails = (p) => {
        console.log("fill product is ======>", p)
        setProductId(p.productId);
        setProduct(p.name || '');
        setCostPrice(p.costPrice || '');
        setPrice(p.costPrice || '');
        setBatchNumber(p.batchNumber || '');
        setMrp(p.mrp || '');
        setSgstPercent(p.sgst || '');
        setCgstPercent(p.cgst || '');
        setIgstPercent(p.igst || '');
        setHsn(p.hsn || '');
        setIsTaxable(p.isTaxable || false);
        setMaxDiscount(p.maxDiscount || '');
        setStock(p.stock || '');
        setCategory(p.category || '');
        setSubCategory(p.subCategory || '');
        setIsFreeShipping(p.isFreeShipping || false);
        setShippingCost(p.shippingCost?.toString() || '');
        setQuantity('1'); // default to 1 when a product is selected
    };

    const handleProductCodeChange = (e) => {
        const code = e.target.value;
        setProductCode(code);
        const found = productOptions.find(p => p.value === code);
        if (found) fillProductDetails(found);
    };

    const handleProductSelect = (selected) => {
        console.log("selected value is ====>", selected)
        if (selected) {
            setProductCode(selected.value);
            fillProductDetails(selected);
        } else {
            clearForm();
        }
    };

    const handleNumericInput = (setter) => (e) => {
        const value = parseFloat(e.target.value);
        setter(!isNaN(value) && value >= 0 ? value : 0);
    };

    const calculateAmounts = () => {
        const qty = parseFloat(quantity || 0);
        const rate = parseFloat(price || 0);
        const discountPer = parseFloat(maxDiscount || 0);
        const grossAmount = qty * rate;
        const discountAmt = grossAmount * (discountPer / 100);
        const taxable = grossAmount - discountAmt;

        let sgst = 0, cgst = 0, igst = 0;
        if (isTaxable) {
            if (parseFloat(igstPercent) > 0) {
                igst = taxable * (parseFloat(igstPercent || 0) / 100);
            } else {
                sgst = taxable * (parseFloat(sgstPercent || 0) / 100);
                cgst = taxable * (parseFloat(cgstPercent || 0) / 100);
            }
        }

        const shipping = isFreeShipping ? 0 : parseFloat(shippingCost || 0);
        const amount = taxable + sgst + cgst + igst + shipping;

        return { grossAmount, discountAmt, sgst, cgst, igst, shipping, amount };
    };

    const handleAdd = () => {
        if (!product || quantity <= 0) return alert("Please fill product and valid quantity.");
        const calc = calculateAmounts();
        const newCustomerData = {
            customerId,
            fullName,
            email,
            mobileNo,
            address,
            gst_number,
        };

        setCustomerDtl(newCustomerData)

        const newItem = {
            productId, product, productCode, price, batchNumber, expDate, quantity,
            mrp, storePrice, discount: maxDiscount, sgstPercent, cgstPercent, igstPercent,
            hsn, isTaxable, maxDiscount, stock, isFreeShipping, shippingCost, category, subCategory,
            ...calc
        };
        setItems([...items, newItem]);
        clearForm();
        console.log("newItem ==========>", newItem)
    };

    console.log(" item is  before add ==========>", items)

    const clearForm = () => {
        setProductId("")
        setProduct('');
        setProductCode('');
        setPrice('');
        setBatchNumber('');
        setExpDate('');
        setQuantity('1'); // reset to default 1
        setMrp('');
        setStorePrice('');
        setSgstPercent('');
        setCgstPercent('');
        setIgstPercent('');
        setHsn('');
        setIsTaxable(false);
        setMaxDiscount('');
        setStock('');
        setIsFreeShipping(false);
        setShippingCost('');
        setCategory('');
        setSubCategory('');
    };

    const handleDelete = (idx) => {
        setItems(items.filter((_, i) => i !== idx));
    };


    return (
        <div className="container mt-4">


            <Form>
                <hr />

                <CustomerForm
                    fullName={fullName}
                    setFullName={setFullName}
                    email={email}
                    setEmail={setEmail}
                    mobileNo={mobileNo}
                    setMobileNo={setMobileNo}
                    gst_number={gst_number}
                    setGstNumber={setGstNumber}
                    address={address}
                    setAddress={setAddress}
                    customerId={customerId}
                    setCustomerId={setCustomerId}

                />
                <hr />
                <h5 className="mb-3">Product Entry Form</h5>
                <Row className="align-items-end g-3">
                    <Col md={2}>
                        <Form.Label>Product Code</Form.Label>
                        <Form.Control value={productCode} onChange={handleProductCodeChange} />
                    </Col>
                    <Col md={4}>
                        <Form.Label>Product</Form.Label>
                        <Select
                            options={productOptions}
                            isLoading={isProductLoading}
                            value={productOptions.find(opt => opt.value === productCode)}
                            onChange={handleProductSelect}
                            isClearable
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Label>Category</Form.Label>
                        <Select
                            options={categoryOptions}
                            isLoading={isCategoryLoading}
                            value={categoryOptions.find(opt => opt.value === category)}
                            onChange={(selected) => {
                                setCategory(selected ? selected.value : '');
                                setSubCategory('');
                            }}
                            isClearable
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Label>SubCategory</Form.Label>
                        <Select
                            options={subCategoryOptions}
                            value={subCategoryOptions.find(opt => opt.value === subCategory)}
                            onChange={(selected) => setSubCategory(selected ? selected.value : '')}
                            isClearable
                            isDisabled={!category}
                        />
                    </Col>
                </Row>

                <Row className="mt-2 g-3">
                    <Col md={2}><Form.Label>Batch No.</Form.Label><Form.Control value={batchNumber} onChange={e => setBatchNumber(e.target.value)} /></Col>
                    <Col md={2}><Form.Label>Exp. Date</Form.Label><Form.Control type="date" value={expDate} onChange={e => setExpDate(e.target.value)} /></Col>
                    <Col md={1}><Form.Label>Qty</Form.Label><Form.Control type="number" min="0" value={quantity} onChange={handleNumericInput(setQuantity)} /></Col>
                    <Col md={2}><Form.Label>Buying Cost</Form.Label><Form.Control type="number" min="0" value={costPrice} onChange={handleNumericInput(setCostPrice)} /></Col>
                    <Col md={2}><Form.Label>Sell Price</Form.Label><Form.Control type="number" min="0" value={price} onChange={handleNumericInput(setPrice)} /></Col>
                    <Col md={2}><Form.Label>MRP</Form.Label><Form.Control type="number" min="0" value={mrp} onChange={handleNumericInput(setMrp)} /></Col>
                    <Col md={1}><Form.Label>Disc %</Form.Label><Form.Control type="number" min="0" value={maxDiscount} onChange={handleNumericInput(setMaxDiscount)} /></Col>
                </Row>

                <Row className="mt-2 g-3 align-items-end">
                    <Col md={1}><Form.Label>HSN</Form.Label><Form.Control value={hsn} onChange={e => setHsn(e.target.value)} /></Col>
                    <Col md={1}><Form.Label>SGST%</Form.Label><Form.Control type="number" min="0" value={sgstPercent} onChange={handleNumericInput(setSgstPercent)} /></Col>
                    <Col md={1}><Form.Label>CGST%</Form.Label><Form.Control type="number" min="0" value={cgstPercent} onChange={handleNumericInput(setCgstPercent)} /></Col>
                    <Col md={1}><Form.Label>IGST%</Form.Label><Form.Control type="number" min="0" value={igstPercent} onChange={handleNumericInput(setIgstPercent)} /></Col>
                    <Col md={1}><Form.Label>Taxable</Form.Label><Form.Check type="checkbox" checked={isTaxable} onChange={e => setIsTaxable(e.target.checked)} /></Col>
                    <Col md={1}><Form.Label>Stock</Form.Label><Form.Control value={stock} readOnly /></Col>
                    <Col md={2}><Form.Label>Shipping Cost</Form.Label><Form.Control type="number" min="0" value={shippingCost} onChange={handleNumericInput(setShippingCost)} /></Col>
                    <Col md={1}><Form.Label>Free Ship</Form.Label><Form.Check type="checkbox" checked={isFreeShipping} onChange={e => setIsFreeShipping(e.target.checked)} /></Col>

                    <Col className="d-flex justify-content-start">
                        <Button onClick={handleAdd} variant="primary" size="lg" disabled={!customerId}>
                            Add
                        </Button>
                    </Col>


                </Row>
            </Form>

            <EntryList items={items} handleDelete={handleDelete} customerDtl={customerDtl} />


        </div>
    );
};

export default ProductForm;
