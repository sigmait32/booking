export const filterProductsBySearch = (products, term) =>
    products?.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description?.toLowerCase().includes(term.toLowerCase())
    );

export const paginateProducts = (products, page, itemsPerPage) =>
    products?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
