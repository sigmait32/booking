import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Container,
    Card,
    Button,
    Alert,
    Badge,
    Stack
} from 'react-bootstrap';

const OrderComplete = () => {
    const { orderId } = useParams();

    return (
        <Container className="py-5">
            <Card className="border-0 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                <Card.Body className="p-4 p-md-5">
                    {/* Header Section */}
                    <div className="text-center mb-4">
                        <i className="fa fa-check-circle fa-5x text-success mb-4" style={{ opacity: 0.9 }}></i>
                        <h1 className="h2 mb-3">Order Confirmed!</h1>
                        <Alert variant="success" className="d-inline-block mb-0">
                            Thank you for your purchase!
                        </Alert>
                    </div>

                    {/* Order Details */}
                    <div className="text-center p-4 mb-4 bg-light rounded-3">
                        <Badge bg="secondary" className="mb-3 fs-6 fw-normal">
                            ORDER NUMBER
                        </Badge>
                        <h2 className="h3 mb-3">{orderId}</h2>
                        <p className="text-muted mb-0 fs-5">
                            You'll receive a confirmation email shortly
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <Stack gap={3} className="mx-auto" style={{ maxWidth: '400px' }}>
                        <Button
                            as={Link}
                            to="/dashboard/cart-products"
                            variant="outline-primary"
                            size="lg"
                            className="d-flex align-items-center justify-content-center"
                        >
                            <i className="fa fa-shopping-bag me-3 fs-5"></i>
                            Continue Shopping
                        </Button>
                        {/* <Button
                            as={Link}
                            to="/orders"
                            variant="primary"
                            size="lg"
                            className="d-flex align-items-center justify-content-center"
                        >
                            <i className="fa fa-list-alt me-3 fs-5"></i>
                            View Your Orders
                        </Button> */}
                    </Stack>

                    {/* Footer */}
                    <div className="text-center mt-5 pt-3 border-top">
                        <p className="text-muted mb-0">
                            Need help? <Link to="/contact" className="text-decoration-none">Contact our support team</Link>
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderComplete;