import React from "react";
import { Row, Col } from "react-bootstrap";

const LoadingSkeleton = () => (
    <Row className="g-4">
        {[...Array(4)].map((_, idx) => (
            <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                <div className="product-card-skeleton">
                    <div className="image-placeholder"></div>
                    <div className="content-placeholder">
                        <div className="title-placeholder"></div>
                        <div className="price-placeholder"></div>
                        <div className="button-placeholder"></div>
                    </div>
                </div>
            </Col>
        ))}
    </Row>
);

export default LoadingSkeleton;
