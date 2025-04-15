

// import React, { useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Card, Table, Button } from 'react-bootstrap';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// // import './style.css'



// const SaleInvoice = () => {
//     const { state } = useLocation();
//     const invoiceRef = useRef();

//     if (!state || !state.totals || !state.items || !state.customerDetails) {
//         return <p className="text-danger m-3">Invalid or missing invoice data</p>;
//     }

//     const {
//         customerDetails,
//         items,
//         totals,
//         additionalDiscount,
//         paidAmount,
//         balanceAmount,
//         paymentMode,
//         createdAt
//     } = state;

//     const handleDownloadPDF = async () => {
//         const input = invoiceRef.current;
//         const canvas = await html2canvas(input);
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save('invoice.pdf');
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h2>Invoice</h2>
//                 <div>
//                     <Button variant="outline-primary" className="me-2" onClick={handlePrint}>
//                         🖨️ Print Invoice
//                     </Button>
//                     <Button variant="outline-success" onClick={handleDownloadPDF}>
//                         📄 Download PDF
//                     </Button>
//                 </div>
//             </div>

//             <div ref={invoiceRef} className="p-3 bg-white">
//                 <Card className="p-3 mb-3">
//                     <h5>Customer Details</h5>
//                     <p><strong>Name:</strong> {customerDetails.name}</p>
//                     <p><strong>Mobile:</strong> {customerDetails.mobile}</p>
//                     <p><strong>Address:</strong> {customerDetails.address}</p>
//                     <p><strong>Date:</strong> {new Date(createdAt).toLocaleString()}</p>
//                 </Card>

//                 <Table bordered responsive striped hover>
//                     <thead className="table-dark">
//                         <tr>
//                             <th>#</th>
//                             <th>Product</th>
//                             <th>Qty</th>
//                             <th>Rate</th>
//                             <th>Gross</th>
//                             <th>Discount</th>
//                             <th>Tax</th>
//                             <th>Shipping</th>
//                             <th>Final</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {items.map((item, index) => {
//                             const tax = item.sgst + item.cgst + item.igst;
//                             return (
//                                 <tr key={index}>
//                                     <td>{index + 1}</td>
//                                     <td>{item.product}</td>
//                                     <td>{item.quantity}</td>
//                                     <td>₹{item.price.toFixed(2)}</td>
//                                     <td>₹{item.grossAmount.toFixed(2)}</td>
//                                     <td>₹{item.discountAmt.toFixed(2)}</td>
//                                     <td>₹{tax.toFixed(2)}</td>
//                                     <td>{item.isFreeShipping ? "Free" : `₹${item.shipping.toFixed(2)}`}</td>
//                                     <td>₹{item.amount.toFixed(2)}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </Table>

//                 <Card className="p-3 mt-4">
//                     <h5>Summary</h5>
//                     <p><strong>Gross Total:</strong> ₹{totals.gross.toFixed(2)}</p>
//                     <p><strong>Total Discount:</strong> ₹{totals.discount.toFixed(2)}</p>
//                     <p><strong>Tax (SGST + CGST + IGST):</strong> ₹{(totals.sgst + totals.cgst + totals.igst).toFixed(2)}</p>
//                     <p><strong>Shipping:</strong> ₹{totals.shipping.toFixed(2)}</p>
//                     <p><strong>Additional Discount:</strong> {additionalDiscount}%</p>
//                     <p><strong>Final Amount:</strong> ₹{totals.finalAmount.toFixed(2)}</p>
//                     <p><strong>Paid:</strong> ₹{paidAmount.toFixed(2)}</p>
//                     <p><strong>Balance:</strong> ₹{balanceAmount}</p>
//                     <p><strong>Payment Mode:</strong> {paymentMode}</p>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default SaleInvoice;



import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './invoice.css';

const InvoicePage = () => {
    const location = useLocation();
    const invoiceRef = useRef();
    const invoiceData = location.state;

    const handlePrint = useReactToPrint({
        documentTitle: 'Title',
        contentRef: invoiceRef,
    });
    //     documentTitle: 'Title',
    //    contentRef: componentRef,

    const handleDownloadPDF = async () => {
        const input = invoiceRef.current;
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
    };

    if (!invoiceData) return <div>No invoice data found</div>;

    const { customerDetails, items, totals, additionalDiscount, paidAmount, balanceAmount, paymentMode } = invoiceData;

    console.log("customerDetails => ", customerDetails)

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 no-print">
                <h2 className="mb-0">Invoice</h2>
                <div>
                    <Button variant="outline-primary" className="me-2" onClick={handlePrint}>
                        🖨️ Print
                    </Button>
                    <Button variant="outline-success" onClick={handleDownloadPDF}>
                        📄 Download PDF
                    </Button>
                </div>
            </div>

            <div ref={invoiceRef} className="invoice-container bg-white p-4 border rounded">
                {/* Header */}
                <div className="d-flex justify-content-between mb-4">
                    <div>
                        <h3 className="fw-bold">Your Company Name</h3>
                        <p className="mb-0">123 Main Street, City, State</p>
                        <p className="mb-0">Phone: 999-999-9999</p>
                        <p>Email: contact@yourcompany.com</p>
                    </div>
                    <div className="text-end">
                        <h5 className="fw-bold">Invoice</h5>
                        <p>Invoice #: INV-{Math.floor(Math.random() * 10000)}</p>
                        <p>Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Customer Details */}
                <h5 className="border-bottom pb-2 mb-3">Billed To</h5>
                <Row>
                    <Col md={6}>
                        <p><strong>Name:</strong> {customerDetails?.fullName}</p>
                        <p><strong>Mobile:</strong> {customerDetails?.mobileNo}</p>
                        <p><strong>Email:</strong> {customerDetails?.email}</p>
                        <p><strong>Address:</strong> {customerDetails?.address}</p>
                        <p><strong>GST:</strong> {customerDetails?.gst_number}</p>
                    </Col>
                </Row>

                {/* Product Table */}
                <h5 className="mt-4 border-bottom pb-2 mb-3">Products</h5>
                <Table bordered responsive className="invoice-table">
                    <thead className="table-light">
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
                            <th>Shipping</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.product}</td>
                                <td>{item.code}</td>
                                <td>{item.batch}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.price.toFixed(2)}</td>
                                <td>₹{item.grossAmount.toFixed(2)}</td>
                                <td>₹{item.discountAmt.toFixed(2)}</td>
                                <td>₹{item.sgst.toFixed(2)}</td>
                                <td>₹{item.cgst.toFixed(2)}</td>
                                <td>₹{item.igst.toFixed(2)}</td>
                                <td>{item.isFreeShipping ? "Free" : `₹${item.shipping.toFixed(2)}`}</td>
                                <td>₹{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Summary */}
                <Row className="mt-4 justify-content-end">
                    <Col md={6}>
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <td>Gross Total</td>
                                    <td className="text-end">₹{totals.gross.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Discount</td>
                                    <td className="text-end">₹{totals.discount.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>SGST + CGST + IGST</td>
                                    <td className="text-end">₹{(totals.sgst + totals.cgst + totals.igst).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td className="text-end">₹{totals.shipping.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Additional Discount</td>
                                    <td className="text-end">{additionalDiscount}%</td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Final Amount</td>
                                    <td className="text-end">₹{totals.finalAmount.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Paid</td>
                                    <td className="text-end">₹{paidAmount.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Balance</td>
                                    <td className="text-end">₹{balanceAmount.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Payment Mode</td>
                                    <td className="text-end">{paymentMode}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Footer */}
                <div className="mt-5 text-center">
                    <p>Thank you for your purchase!</p>
                    <p><small>This is a computer-generated invoice. No signature required.</small></p>
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;
