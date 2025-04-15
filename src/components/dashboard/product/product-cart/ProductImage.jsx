// ProductImage.js
import React from "react";

const ProductImage = ({ imageUrl, alt, discount, isOutOfStock }) => (
    <div className="product-image-container">
        <img src={imageUrl} alt={alt} className="product-image" loading="lazy" />
        {discount ? <div className="discount-badge">{discount}% OFF</div> : null}
        {isOutOfStock ? <div className="out-of-stock-badge">Sold Out</div> : null}
    </div>
);

export default ProductImage;
