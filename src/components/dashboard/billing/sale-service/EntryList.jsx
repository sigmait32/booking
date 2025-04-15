


// import { Table, Button, Form, Row, Col } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
// import { useCreateSaleEntryMutation } from '../../../../store/features/sale-service/saleEntryApi';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const EntryList = ({ items, handleDelete, customerDtl }) => {
//     const [totals, setTotals] = useState({
//         gross: 0,
//         discount: 0,
//         sgst: 0,
//         cgst: 0,
//         igst: 0,
//         shipping: 0,
//         finalAmount: 0,
//     });



//     const [paidAmount, setPaidAmount] = useState(0);
//     const [additionalDiscount, setAdditionalDiscount] = useState(0);
//     const [paymentMode, setPaymentMode] = useState('');
//     const [isSaved, setIsSaved] = useState(false);

//     const [createSaleEntry, { isLoading }] = useCreateSaleEntryMutation();

//     const balanceAmount = (Number(totals.finalAmount) - Number(paidAmount)).toFixed(2);

//     useEffect(() => {
//         const gross = items.reduce((acc, item) => acc + item.grossAmount, 0);
//         const discount = items.reduce((acc, item) => acc + item.discountAmt, 0);
//         const sgst = items.reduce((acc, item) => acc + item.sgst, 0);
//         const cgst = items.reduce((acc, item) => acc + item.cgst, 0);
//         const igst = items.reduce((acc, item) => acc + item.igst, 0);
//         const shipping = items.reduce((acc, item) => acc + (item.isFreeShipping ? 0 : item.shipping), 0);
//         const amountBeforeExtraDiscount = items.reduce((acc, item) => acc + item.amount, 0);

//         const extraDiscountAmt = (amountBeforeExtraDiscount * additionalDiscount) / 100;
//         const finalAmount = amountBeforeExtraDiscount - extraDiscountAmt;

//         setTotals({ gross, discount, sgst, cgst, igst, shipping, finalAmount });
//     }, [items, additionalDiscount]);

//     const handleSave = async () => {

//         if (items.length === 0) {
//             toast.warning("No products added.");
//             return;
//         }

//         if (!paymentMode) {
//             toast.warning("Please select a payment mode.");
//             return;
//         }

//         const payload = {
//             customerDetails: customerDtl,
//             items,
//             totals,
//             additionalDiscount,
//             paidAmount,
//             balanceAmount: Number(balanceAmount),
//             paymentMode,
//         };

//         setIsSaved(true);

//         try {
//             const res = await createSaleEntry(payload).unwrap();
//             toast.success('Sale entry created successfully!', { position: "top-center" });
//             console.log('Sale entry response:', res);
//         } catch (err) {
//             console.error('Error creating sale entry:', err);
//             toast.error('Failed to create sale entry.', { position: "top-center" });
//         }
//     };

//     const preventNegative = (e) => {
//         if (e.key === '-' || e.key === 'e') e.preventDefault();
//     };

//     return (
//         <>
//             <ToastContainer />
//             <hr />
//             <h5 className="mb-3">Product List</h5>

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

//             {/* Summary Section */}
//             <div className="mt-4 p-3 border rounded bg-light">
//                 <Row className="mb-2">
//                     <Col md={3}><strong>Gross Amount:</strong></Col>
//                     <Col md={3}>{totals.gross.toFixed(2)}</Col>
//                     <Col md={3}><strong>Discount:</strong></Col>
//                     <Col md={3}>{totals.discount.toFixed(2)}</Col>
//                 </Row>

//                 <Row className="mb-2">
//                     <Col md={3}><strong>Additional Disc. (%):</strong></Col>
//                     <Col md={3}>
//                         <Form.Control
//                             type="number"
//                             value={additionalDiscount}
//                             onChange={(e) => setAdditionalDiscount(Math.max(0, Number(e.target.value)))}
//                             onKeyDown={preventNegative}
//                         />
//                     </Col>
//                     <Col md={3}><strong>SGST:</strong></Col>
//                     <Col md={3}>{totals.sgst.toFixed(2)}</Col>
//                 </Row>

//                 <Row className="mb-2">
//                     <Col md={3}><strong>CGST:</strong></Col>
//                     <Col md={3}>{totals.cgst.toFixed(2)}</Col>
//                     <Col md={3}><strong>IGST:</strong></Col>
//                     <Col md={3}>{totals.igst.toFixed(2)}</Col>
//                 </Row>

//                 <Row className="mb-2">
//                     <Col md={3}><strong>Loading & Unloading Charges:</strong></Col>
//                     <Col md={3}>{totals.shipping.toFixed(2)}</Col>
//                     <Col md={3}><strong>Final Amount:</strong></Col>
//                     <Col md={3}>{totals.finalAmount.toFixed(2)}</Col>
//                 </Row>

//                 <Row className="mb-2">
//                     <Col md={3}><strong>Paid Amount:</strong></Col>
//                     <Col md={3}>
//                         <Form.Control
//                             type="number"
//                             value={paidAmount}
//                             onChange={(e) => setPaidAmount(Math.max(0, Number(e.target.value)))}
//                             onKeyDown={preventNegative}
//                         />
//                     </Col>
//                     <Col md={3}><strong>Balance Amount:</strong></Col>
//                     <Col md={3}>{balanceAmount}</Col>
//                 </Row>

//                 <Row className="mb-3">
//                     <Col md={3}><strong>Payment Mode:</strong></Col>
//                     <Col md={3}>
//                         <Form.Select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
//                             <option value="">--Select--</option>
//                             <option value="Cash">Cash</option>
//                             <option value="Card">Card</option>
//                             <option value="UPI">UPI</option>
//                             <option value="Bank Transfer">Bank Transfer</option>
//                         </Form.Select>
//                     </Col>
//                 </Row>

//                 <Row className="mt-3 justify-content-between align-items-center">
//                     <Col md="auto">
//                         <Button variant="success" onClick={handleSave} disabled={isLoading}>
//                             {isLoading ? "Saving..." : "Save All Details"}
//                         </Button>
//                     </Col>
//                     {isSaved && (
//                         <Col md="auto">
//                             <Button variant="primary">
//                                 Generate Invoice
//                             </Button>
//                         </Col>
//                     )}
//                 </Row>
//             </div>
//         </>
//     );
// };

// export default EntryList;


// EntryList.jsx
import { Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCreateSaleEntryMutation } from '../../../../store/features/sale-service/saleEntryApi';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const EntryList = ({ items, handleDelete, customerDtl }) => {

    const { userInfo } = useSelector(state => state.auth)

    // console.log("customer id is =========>", userInfo)
    const navigate = useNavigate();

    const [totals, setTotals] = useState({
        gross: 0,
        discount: 0,
        sgst: 0,
        cgst: 0,
        igst: 0,
        shipping: 0,
        finalAmount: 0,
    });

    const [paidAmount, setPaidAmount] = useState(0);
    const [additionalDiscount, setAdditionalDiscount] = useState(0);
    const [paymentMode, setPaymentMode] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [savedInvoiceData, setSavedInvoiceData] = useState(null);

    const [createSaleEntry, { isLoading }] = useCreateSaleEntryMutation();
    const balanceAmount = (Number(totals.finalAmount) - Number(paidAmount)).toFixed(2);

    useEffect(() => {
        const gross = items.reduce((acc, item) => acc + item.grossAmount, 0);
        const discount = items.reduce((acc, item) => acc + item.discountAmt, 0);
        const sgst = items.reduce((acc, item) => acc + item.sgst, 0);
        const cgst = items.reduce((acc, item) => acc + item.cgst, 0);
        const igst = items.reduce((acc, item) => acc + item.igst, 0);
        const shipping = items.reduce((acc, item) => acc + (item.isFreeShipping ? 0 : item.shipping), 0);
        const amountBeforeExtraDiscount = items.reduce((acc, item) => acc + item.amount, 0);
        const extraDiscountAmt = (amountBeforeExtraDiscount * additionalDiscount) / 100;
        const finalAmount = amountBeforeExtraDiscount - extraDiscountAmt;

        setTotals({ gross, discount, sgst, cgst, igst, shipping, finalAmount });
    }, [items, additionalDiscount]);


    console.log("customerDtl =?", customerDtl)


    const handleSave = async () => {
        if (items.length === 0) {
            toast.warning("No products added.");
            return;
        }

        if (!paymentMode) {
            toast.warning("Please select a payment mode.");
            return;
        }


        const payload = {
            employeeId: userInfo?.id || null,
            customerDetails: customerDtl,
            items,
            totals,
            additionalDiscount,
            paidAmount,
            balanceAmount: Number(balanceAmount),
            paymentMode,
        };

        try {
            const res = await createSaleEntry(payload).unwrap();
            toast.success('Sale entry created successfully!', { position: "top-center" });

            // Merge payload with _id and createdAt
            setSavedInvoiceData({ ...payload, _id: res._id, createdAt: res.createdAt });
            setIsSaved(true);
        } catch (err) {
            console.error('Error creating sale entry:', err);
            toast.error('Failed to create sale entry.', { position: "top-center" });
        }
    };

    const handleGenerateInvoice = () => {
        if (savedInvoiceData) {
            navigate('/dashboard/sale-invoice', { state: savedInvoiceData });
        }
    };

    const preventNegative = (e) => {
        if (e.key === '-' || e.key === 'e') e.preventDefault();
    };

    return (
        <>
            <ToastContainer />
            <Table bordered responsive striped hover className="mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Code</th>
                        <th>Batch</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Gross</th>
                        <th>Disc</th>
                        <th>SGST</th>
                        <th>CGST</th>
                        <th>IGST</th>
                        <th>Tax</th>
                        <th>Shipping</th>
                        <th>Final</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        const totalTax = item.sgst + item.cgst + item.igst;
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.product}</td>
                                <td>{item.productCode}</td>
                                <td>{item.
                                    batchNumber
                                }</td>
                                <td>{item.quantity}</td>
                                <td>{item.price.toFixed(2)}</td>
                                <td>{item.grossAmount.toFixed(2)}</td>
                                <td>{item.discountAmt.toFixed(2)}</td>
                                <td>{item.sgst.toFixed(2)}</td>
                                <td>{item.cgst.toFixed(2)}</td>
                                <td>{item.igst.toFixed(2)}</td>
                                <td>{totalTax.toFixed(2)}</td>
                                <td>{item.isFreeShipping ? "Free" : item.shipping.toFixed(2)}</td>
                                <td>{item.amount.toFixed(2)}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                                        ❌
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <Card className="p-3 bg-light mt-4">
                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Additional Discount (%)</Form.Label>
                            <Form.Control
                                type="number"
                                value={additionalDiscount}
                                onChange={(e) => setAdditionalDiscount(Number(e.target.value))}
                                onKeyDown={preventNegative}
                                min="0"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Paid Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={paidAmount}
                                onChange={(e) => setPaidAmount(Number(e.target.value))}
                                onKeyDown={preventNegative}
                                min="0"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Payment Mode</Form.Label>
                            <Form.Select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Cash">Cash</option>
                                <option value="Card">Card</option>
                                <option value="UPI">UPI</option>
                                <option value="Credit">Credit</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <h5>Summary</h5>
                        <Table bordered size="sm">
                            <tbody>
                                <tr><td>Gross Total</td><td>₹{totals.gross.toFixed(2)}</td></tr>
                                <tr><td>Discount</td><td>₹{totals.discount.toFixed(2)}</td></tr>
                                <tr>
                                    <td>SGST + CGST + IGST</td>
                                    <td>₹{(totals.sgst + totals.cgst + totals.igst).toFixed(2)}</td>
                                </tr>
                                <tr><td>Shipping</td><td>₹{totals.shipping.toFixed(2)}</td></tr>
                                <tr><td>Final Amount</td><td>₹{totals.finalAmount.toFixed(2)}</td></tr>
                                <tr><td>Paid</td><td>₹{paidAmount.toFixed(2)}</td></tr>
                                <tr><td>Balance</td><td>₹{balanceAmount}</td></tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-between align-items-center">
                    <Col md="auto">
                        {/* <Button variant="success" onClick={handleSave} disabled={isLoading} disable={customerDtl.customerId}>
                            {isLoading ? "Saving..." : "Save All Details"}
                        </Button> */}
                        <Button
                            variant="success"
                            onClick={handleSave}
                            disabled={isLoading || !customerDtl.customerId}
                        >
                            {isLoading ? "Saving..." : "Save All Details"}
                        </Button>
                    </Col>
                    {isSaved && (
                        <Col md="auto">
                            <Button variant="primary" onClick={handleGenerateInvoice}>
                                Generate Invoice
                            </Button>
                        </Col>
                    )}
                </Row>
            </Card >
        </>
    );
};

export default EntryList;
