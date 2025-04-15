

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { addToCart, updateQuantity, removeFromCart } from "../../../../store/features/cart/cartSlice";
import BASE_URL from "../../../../utils/imageConfig";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import QuantityControl from "./QuantityControl";
import "./ProductCart.css";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [loadingProductId, setLoadingProductId] = useState(null);
    const cart = useSelector((state) => state.cart.items);
    const cartItem = cart.find((item) => item._id === product._id);

    const handleAddToCart = () => {
        if (product.stock <= 0) return;
        setLoadingProductId(product._id);

        setTimeout(() => {
            dispatch(addToCart({ ...product, quantity: 1 }));
            setLoadingProductId(null);
        }, 300);
    };

    const imageUrl = `${BASE_URL}${product.images?.[0]?.url || "/default-product.png"}`;
    const isOutOfStock = product.stock <= 0;

    return (
        <div className="product-card">
            <ProductImage
                imageUrl={imageUrl}
                alt={product.name}
                discount={product.maxDiscount}
                isOutOfStock={isOutOfStock}
            />

            <div className="product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">
                    {product.description?.substring(0, 60)}...
                </p>

                <ProductPrice price={product.price} discount={product.maxDiscount} />

                {cartItem ? (
                    <QuantityControl
                        quantity={cartItem.quantity}
                        onIncrease={() =>
                            dispatch(updateQuantity({ _id: product._id, quantity: cartItem.quantity + 1 }))
                        }
                        onDecrease={() =>
                            cartItem.quantity === 1
                                ? dispatch(removeFromCart(product._id))
                                : dispatch(updateQuantity({ _id: product._id, quantity: cartItem.quantity - 1 }))
                        }
                    />
                ) : (
                    <button
                        className={`add-to-cart-btn ${isOutOfStock ? "disabled" : ""}`}
                        onClick={handleAddToCart}
                        disabled={loadingProductId === product._id || isOutOfStock}
                    >
                        {loadingProductId === product._id ? (
                            <Spinner size="sm" animation="border" />
                        ) : isOutOfStock ? (
                            "Out of Stock"
                        ) : (
                            <>
                                <i className="fa fa-plus me-2" />
                                Add to Cart
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        images: PropTypes.array,
        maxDiscount: PropTypes.number,
    }).isRequired,
};

export default ProductCard;

