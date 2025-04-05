


// import React, { useState, useEffect } from "react";
// import {
//     Container,
//     Row,
//     Col,
//     Card,
//     Button,
//     Spinner,
//     Badge,
//     InputGroup,
//     FormControl,
//     Pagination,
//     Placeholder
// } from "react-bootstrap";
// import { useGetProductQuery } from "../../../store/features/product/productApi";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, updateQuantity, removeFromCart } from "../../../store/features/cart/cartSlice";
// import { Link } from "react-router-dom";
// import BASE_URL from "../../../utils/imageConfig";
// import "./ProductCart.css";

// const ProductList = () => {
//     const [page, setPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loadingProductId, setLoadingProductId] = useState(null);
//     const itemsPerPage = 8;

//     const { data: products = [], isLoading, isFetching } = useGetProductQuery();
//     const dispatch = useDispatch();
//     const cart = useSelector((state) => state.cart.items);

//     // Filter products based on search input
//     const filteredProducts = products?.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination logic
//     const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
//     const paginatedProducts = filteredProducts?.slice(
//         (page - 1) * itemsPerPage,
//         page * itemsPerPage
//     );

//     // Reset to first page when search term changes
//     useEffect(() => {
//         setPage(1);
//     }, [searchTerm]);

//     const getCartItem = (productId) => cart.find((item) => item._id === productId);

//     const handleAddToCart = (product) => {
//         setLoadingProductId(product._id);
//         setTimeout(() => {
//             dispatch(addToCart(product));
//             setLoadingProductId(null);
//         }, 300);
//     };

//     const handlePageChange = (newPage) => {
//         setPage(newPage);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     return (
//         <Container className="py-4 product-listing-container">
//             {/* Header Section */}
//             <div className="store-header mb-5">
//                 <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
//                     <div className="mb-4 mb-md-0">
//                         <h1 className="store-title">Discover Our Collection</h1>
//                         <p className="store-subtitle">Premium products curated just for you</p>
//                     </div>
//                     <div className="search-cart-container">
//                         <div className="search-box">
//                             <i className="fa fa-search search-icon"></i>
//                             <input
//                                 type="text"
//                                 className="search-input"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search products..."
//                             />
//                         </div>
//                         <Link to="/dashboard/cart" className="cart-btn">
//                             <i className="fa fa-shopping-cart"></i>
//                             <span className="cart-text">Cart</span>
//                             {cart.length > 0 && (
//                                 <span className="cart-badge">{cart.length}</span>
//                             )}
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* Loading State */}
//             {(isLoading || isFetching) && (
//                 <Row className="g-4">
//                     {[...Array(4)].map((_, idx) => (
//                         <Col key={idx} xs={12} sm={6} md={4} lg={3}>
//                             <div className="product-card-skeleton">
//                                 <div className="image-placeholder"></div>
//                                 <div className="content-placeholder">
//                                     <div className="title-placeholder"></div>
//                                     <div className="price-placeholder"></div>
//                                     <div className="button-placeholder"></div>
//                                 </div>
//                             </div>
//                         </Col>
//                     ))}
//                 </Row>
//             )}

//             {/* Empty State */}
//             {!isLoading && filteredProducts?.length === 0 && (
//                 <div className="empty-state text-center py-5">
//                     <div className="empty-state-icon">
//                         <i className="fa fa-box-open"></i>
//                     </div>
//                     <h3 className="empty-state-title">No Products Found</h3>
//                     <p className="empty-state-text">
//                         {searchTerm
//                             ? "We couldn't find any products matching your search."
//                             : "Our collection is currently empty. Please check back later."}
//                     </p>
//                     {searchTerm && (
//                         <Button
//                             variant="outline-primary"
//                             onClick={() => setSearchTerm("")}
//                         >
//                             Clear Search
//                         </Button>
//                     )}
//                 </div>
//             )}

//             {/* Product Grid */}
//             {!isLoading && filteredProducts?.length > 0 && (
//                 <>
//                     <Row className="g-4">
//                         {paginatedProducts?.map((product) => {
//                             const cartItem = getCartItem(product._id);

//                             return (
//                                 <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
//                                     <div className="product-card">
//                                         <div className="product-image-container">
//                                             <img
//                                                 src={`${BASE_URL}${product.images?.[0]?.url || "/default-product.png"}`}
//                                                 alt={product.name}
//                                                 className="product-image"
//                                             />
//                                             {product.discount && (
//                                                 <div className="discount-badge">
//                                                     {product.discount}% OFF
//                                                 </div>
//                                             )}
//                                             {product.stock <= 0 && (
//                                                 <div className="out-of-stock-badge">
//                                                     Sold Out
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="product-details">
//                                             <h3 className="product-title">{product.name}</h3>
//                                             <p className="product-description">
//                                                 {product.description?.substring(0, 60)}...
//                                             </p>
//                                             <div className="price-container">
//                                                 <span className="current-price">₹{product.price}</span>
//                                                 {product.originalPrice && (
//                                                     <span className="original-price">
//                                                         ₹{product.originalPrice}
//                                                     </span>
//                                                 )}
//                                             </div>

//                                             {cartItem ? (
//                                                 <div className="quantity-control">
//                                                     <button
//                                                         className="quantity-btn minus"
//                                                         onClick={() =>
//                                                             cartItem.quantity === 1
//                                                                 ? dispatch(removeFromCart(product._id))
//                                                                 : dispatch(updateQuantity({ _id: product._id, quantity: cartItem.quantity - 1 }))
//                                                         }
//                                                     >
//                                                         {cartItem.quantity === 1 ? (
//                                                             <i className="fa fa-trash"></i>
//                                                         ) : (
//                                                             <i className="fa fa-minus"></i>
//                                                         )}
//                                                     </button>
//                                                     <span className="quantity-value">
//                                                         {cartItem.quantity}
//                                                     </span>
//                                                     <button
//                                                         className="quantity-btn plus"
//                                                         onClick={() => dispatch(updateQuantity({ _id: product._id, quantity: cartItem.quantity + 1 }))}
//                                                     >
//                                                         <i className="fa fa-plus"></i>

//                                                     </button>
//                                                 </div>
//                                             ) : (
//                                                 <button
//                                                     className={`add-to-cart-btn ${product.stock <= 0 ? 'disabled' : ''}`}
//                                                     onClick={() => product.stock > 0 && handleAddToCart(product)}
//                                                     disabled={loadingProductId === product._id || product.stock <= 0}
//                                                 >
//                                                     {loadingProductId === product._id ? (
//                                                         <Spinner size="sm" animation="border" />
//                                                     ) : product.stock > 0 ? (
//                                                         <>
//                                                             <i className="fa fa-plus me-2"></i> Add to Cart
//                                                         </>
//                                                     ) : (
//                                                         "Out of Stock"
//                                                     )}
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </Col>
//                             );
//                         })}
//                     </Row>

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                         <div className="pagination-container">
//                             <Pagination>
//                                 <Pagination.Prev
//                                     onClick={() => handlePageChange(Math.max(1, page - 1))}
//                                     disabled={page === 1}
//                                 />
//                                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                                     let pageNum;
//                                     if (totalPages <= 5) {
//                                         pageNum = i + 1;
//                                     } else if (page <= 3) {
//                                         pageNum = i + 1;
//                                     } else if (page >= totalPages - 2) {
//                                         pageNum = totalPages - 4 + i;
//                                     } else {
//                                         pageNum = page - 2 + i;
//                                     }

//                                     return (
//                                         <Pagination.Item
//                                             key={pageNum}
//                                             active={pageNum === page}
//                                             onClick={() => handlePageChange(pageNum)}
//                                         >
//                                             {pageNum}
//                                         </Pagination.Item>
//                                     );
//                                 })}
//                                 <Pagination.Next
//                                     onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
//                                     disabled={page === totalPages}
//                                 />
//                             </Pagination>
//                         </div>
//                     )}
//                 </>
//             )}
//         </Container>
//     );
// };

// export default ProductList;


import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Spinner,
    InputGroup,
    FormControl,
    Pagination,
    Alert
} from "react-bootstrap";
import { useGetProductQuery } from "../../../store/features/product/productApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../../../store/features/cart/cartSlice";
import { Link } from "react-router-dom";
import BASE_URL from "../../../utils/imageConfig";
import { FaSearch, FaShoppingCart, FaPlus, FaMinus, FaTrash, FaBoxOpen } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductCart.css";

const ProductList = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadingProductId, setLoadingProductId] = useState(null);
    const itemsPerPage = 8;

    const { data: products = [], isLoading, isFetching } = useGetProductQuery();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);

    // Filter products based on search input
    const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
    const paginatedProducts = filteredProducts?.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // Reset to first page when search term changes
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    const getCartItem = (productId) => cart.find((item) => item._id === productId);

    const handleAddToCart = (product) => {
        if (product.stock <= 0) {
            toast.error(`"${product.name}" is out of stock and cannot be added to cart`);
            return;
        }

        setLoadingProductId(product._id);
        setTimeout(() => {
            dispatch(addToCart(product));
            toast.success(`Added "${product.name}" to cart`);
            setLoadingProductId(null);
        }, 300);
    };

    const handleQuantityChange = (product, newQuantity) => {
        if (newQuantity > product.stock) {
            toast.error(`Only ${product.stock} units available for "${product.name}"`);
            return;
        }

        if (newQuantity === 0) {
            dispatch(removeFromCart(product._id));
            toast.info(`Removed "${product.name}" from cart`);
        } else {
            dispatch(updateQuantity({ _id: product._id, quantity: newQuantity }));
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Container className="py-4 product-listing-container">
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header Section */}
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
                        <Link to="/dashboard/cart" className="cart-btn">
                            <FaShoppingCart className="cart-icon" />
                            <span className="cart-text">Cart</span>
                            {cart.length > 0 && (
                                <span className="cart-badge">{cart.length}</span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {(isLoading || isFetching) && (
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
            )}

            {/* Empty State */}
            {!isLoading && filteredProducts?.length === 0 && (
                <div className="empty-state text-center py-5">
                    <div className="empty-state-icon">
                        <FaBoxOpen size={48} />
                    </div>
                    <h3 className="empty-state-title">No Products Found</h3>
                    <p className="empty-state-text">
                        {searchTerm
                            ? "We couldn't find any products matching your search."
                            : "Our collection is currently empty. Please check back later."}
                    </p>
                    {searchTerm && (
                        <Button
                            variant="outline-primary"
                            onClick={() => setSearchTerm("")}
                        >
                            Clear Search
                        </Button>
                    )}
                </div>
            )}

            {/* Product Grid */}
            {!isLoading && filteredProducts?.length > 0 && (
                <>
                    <Row className="g-4">
                        {paginatedProducts?.map((product) => {
                            const cartItem = getCartItem(product._id);
                            const isOutOfStock = product.stock <= 0;

                            return (
                                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                                    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
                                        <div className="product-image-container">
                                            <img
                                                src={`${BASE_URL}${product.images?.[0]?.url || "/default-product.png"}`}
                                                alt={product.name}
                                                className="product-image"
                                                loading="lazy"
                                            />
                                            {product.discount && (
                                                <div className="discount-badge">
                                                    {product.discount}% OFF
                                                </div>
                                            )}
                                            {isOutOfStock && (
                                                <div className="out-of-stock-badge">
                                                    Sold Out
                                                </div>
                                            )}
                                        </div>
                                        <div className="product-details">
                                            <h3 className="product-title">{product.name}</h3>
                                            <p className="product-description">
                                                {product.description?.substring(0, 60)}...
                                            </p>
                                            <div className="price-container">
                                                <span className="current-price">₹{product.price}</span>
                                                {product.originalPrice && (
                                                    <span className="original-price">
                                                        ₹{product.originalPrice}
                                                    </span>
                                                )}
                                            </div>

                                            {cartItem ? (
                                                <div className="quantity-control">
                                                    <button
                                                        className="quantity-btn minus"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                product,
                                                                cartItem.quantity - 1
                                                            )
                                                        }
                                                    >
                                                        {cartItem.quantity === 1 ? (
                                                            <FaTrash />
                                                        ) : (
                                                            <FaMinus />
                                                        )}
                                                    </button>
                                                    <span className="quantity-value">
                                                        {cartItem.quantity}
                                                    </span>
                                                    <button
                                                        className="quantity-btn plus"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                product,
                                                                cartItem.quantity + 1
                                                            )
                                                        }
                                                        disabled={cartItem.quantity >= product.stock}
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={isOutOfStock || loadingProductId === product._id}
                                                >
                                                    {loadingProductId === product._id ? (
                                                        <Spinner size="sm" animation="border" />
                                                    ) : isOutOfStock ? (
                                                        "Out of Stock"
                                                    ) : (
                                                        <>
                                                            <FaPlus className="me-2" /> Add to Cart
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination-container">
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                                    disabled={page === 1}
                                />
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (page <= 3) {
                                        pageNum = i + 1;
                                    } else if (page >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = page - 2 + i;
                                    }

                                    return (
                                        <Pagination.Item
                                            key={pageNum}
                                            active={pageNum === page}
                                            onClick={() => handlePageChange(pageNum)}
                                        >
                                            {pageNum}
                                        </Pagination.Item>
                                    );
                                })}
                                <Pagination.Next
                                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                                    disabled={page === totalPages}
                                />
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default ProductList;