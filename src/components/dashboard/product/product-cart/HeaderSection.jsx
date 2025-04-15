import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const HeaderSection = ({ searchTerm, setSearchTerm, cartItemCount }) => (
    <div className="store-header mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="mb-4 mb-md-0">
                <h1 className="store-title">Discover Our Collection</h1>
                <p className="store-subtitle">Premium products curated just for you</p>
            </div>
            <div className="search-cart-container">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                    />
                </div>
                {/* <Link to="/dashboard/cart" className="cart-btn"> */}
                <Link to="/dashboard/viewcart" className="cart-btn">
                    <FaShoppingCart className="cart-icon" />
                    <span className="cart-text">Cart</span>
                    {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                </Link>
            </div>
        </div>
    </div>
);

export default HeaderSection;
