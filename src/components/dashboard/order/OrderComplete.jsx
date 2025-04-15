

import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button, Alert, Badge, Stack, Spinner } from "react-bootstrap";
import { useGetCustomerOrderByIdQuery } from "../../../store/features/order/orderApi";
import Invoice from "../invoice/order-invoice";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaCheckCircle, FaPrint, FaDownload, FaShoppingBag, FaEnvelope, FaHome } from "react-icons/fa";

const OrderComplete = () => {
    const { id } = useParams();
    const invoiceRef = useRef(null);

    // console.log("order id is =======>", id)

    const { data: orders, isLoading, isError, error } = useGetCustomerOrderByIdQuery(id, {
        refetchOnMountOrArgChange: true,
        skip: !id
    });
    console.log("orders data is ===========>", orders)

    const order = Array.isArray(orders) && orders.length > 0 ? orders[0] : null;

    const handlePrint = useReactToPrint({
        documentTitle: `Invoice_${order?.orderId || "Order"}`,
        // content: () => invoiceRef.current,
        contentRef: invoiceRef,
    });

    const handleDownloadPDF = () => {
        const input = invoiceRef.current;
        html2canvas(input, {
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL("image/png", 1.0);
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: [210, 297] // A4 size
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add background rectangle
            pdf.setFillColor(248, 249, 250);
            pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
            pdf.save(`Invoice_${order?.orderId || "Order"}.pdf`);
        });
    };

    if (isLoading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading order details...</p>
            </Container>
        );
    }

    if (isError || !order) {
        return (
            <Container className="py-5">
                <Alert variant="danger" className="text-center">
                    <strong>Error loading order:</strong> {error?.data?.message || error?.message || "Order not found"}
                    <div className="mt-3">
                        <Button as={Link} to="/dashboard/orders" variant="outline-danger">
                            View Your Orders
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            {/* Order Confirmation Card */}
            <Card className="border-0 shadow-sm mx-auto mb-4 overflow-hidden" style={{ maxWidth: "800px" }}>
                <div className="bg-primary bg-opacity-10 p-4 text-center">
                    <FaCheckCircle className="text-success mb-3" style={{ fontSize: "4rem" }} />
                    <h1 className="display-5 fw-bold mb-3">Order Confirmed!</h1>
                    <p className="lead mb-0">Thank you for your purchase!</p>
                </div>

                <Card.Body className="p-4 p-md-5">
                    <div className="text-center p-4 mb-4 bg-light rounded-3 border border-success border-opacity-25">
                        <Badge bg="light" text="dark" className="mb-3 fs-6 fw-normal px-3 py-2 rounded-pill border border-secondary border-opacity-25">
                            ORDER NUMBER
                        </Badge>
                        <h2 className="h1 mb-3 fw-bold text-primary">{order?.orderId}</h2>
                        <p className="text-muted mb-0 fs-5">
                            <FaEnvelope className="me-2" />
                            A confirmation has been sent to {order?.customerId?.email || "your email"}
                        </p>
                    </div>

                    <Stack gap={3} className="mx-auto" style={{ maxWidth: "500px" }}>
                        <Button variant="primary" size="lg" onClick={handlePrint} className="py-3">
                            <FaPrint className="me-3 fs-5" /> Print Invoice
                        </Button>
                        <Button variant="outline-success" size="lg" onClick={handleDownloadPDF} className="py-3">
                            <FaDownload className="me-3 fs-5" /> Download PDF
                        </Button>
                        <Button as={Link} to="/dashboard/cart-products" variant="outline-primary" size="lg" className="py-3">
                            <FaShoppingBag className="me-3 fs-5" /> Continue Shopping
                        </Button>
                        <Button as={Link} to="/" variant="outline-secondary" size="lg" className="py-3">
                            <FaHome className="me-3 fs-5" /> Back to Home
                        </Button>
                    </Stack>
                </Card.Body>
            </Card>

            {/* Invoice Preview */}
            <Card className="border-0 shadow-sm mt-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <Card.Header className="bg-white border-bottom">
                    <h4 className="mb-0 fw-bold">Invoice Preview</h4>
                </Card.Header>
                <Card.Body className="p-0">
                    <Invoice order={order} ref={invoiceRef} />
                    <div className="text-center p-4 bg-light">
                        {/* <Button variant="primary" onClick={handlePrint} className="me-3 px-4 py-2">
                            <FaPrint className="me-2" /> Back to Home
                        </Button> */}
                        <Button as={Link} to="/" variant="outline-secondary" className="me-3 px-4 py-2">
                            <FaHome className="me-2" /> Back to Home
                        </Button>
                        <Button variant="primary" onClick={handlePrint} className="me-3 px-4 py-2">
                            <FaPrint className="me-2" /> Print Invoice
                        </Button>
                        <Button variant="success" onClick={handleDownloadPDF} className="px-4 py-2">
                            <FaDownload className="me-2" /> Download PDF
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderComplete;
