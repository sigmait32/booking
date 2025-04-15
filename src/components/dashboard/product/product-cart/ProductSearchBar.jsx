// props: searchTerm, setSearchTerm, cartCount
const ProductSearchBar = ({ searchTerm, setSearchTerm, cartCount }) => (
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
        <Link to="/dashboard/cart" className="cart-btn">
            <FaShoppingCart className="cart-icon" />
            <span className="cart-text">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
    </div>
);
