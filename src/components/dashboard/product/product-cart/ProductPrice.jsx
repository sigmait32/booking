// ProductPrice.js
import React from "react";

const ProductPrice = ({ price, discount }) => {
    const discountedPrice = Math.round(price * (1 - discount / 100));
    return (
        <div className="price-container">
            {discount ? (
                <>
                    <span className="current-price text-danger fw-bold me-2">
                        ₹{discountedPrice}
                    </span>
                    <span className="original-price text-muted text-decoration-line-through">
                        ₹{price}
                    </span>
                </>
            ) : (
                <span className="current-price">₹{price}</span>
            )}
        </div>
    );
};

export default ProductPrice;
