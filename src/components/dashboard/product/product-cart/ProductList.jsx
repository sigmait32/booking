import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useGetProductQuery } from "../../../../store/features/product/productApi";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import HeaderSection from "./HeaderSection";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import ProductGrid from "./ProductGrid";
import PaginationControl from "./PaginationControl";
import { paginateProducts, filterProductsBySearch } from "./productListHelpers";

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    const { data: products = [], isLoading, isFetching } = useGetProductQuery();
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    useEffect(() => setPage(1), [searchTerm]);

    const filteredProducts = filterProductsBySearch(products, searchTerm);
    const paginatedProducts = paginateProducts(filteredProducts, page, itemsPerPage);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <Container className="py-4 product-listing-container">
            <ToastContainer position="top-right" autoClose={3000} />

            <HeaderSection
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                cartItemCount={cart.length}
            />

            {isLoading || isFetching ? (
                <LoadingSkeleton />
            ) : filteredProducts.length === 0 ? (
                <EmptyState searchTerm={searchTerm} onClearSearch={() => setSearchTerm("")} />
            ) : (
                <>
                    <ProductGrid
                        products={paginatedProducts}
                        cartItems={cart}
                        dispatch={dispatch}
                    />
                    <PaginationControl
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </Container>
    );
};

export default ProductList;
