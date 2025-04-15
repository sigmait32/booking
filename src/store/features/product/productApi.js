import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => 'product',
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            query: (id) => `product/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        getProductByCode: builder.query({
            query: (code) => `product/code/${code}`, // Matches your backend route
            providesTags: (result, error, code) => [{ type: 'Product', id: code }],
        }),

        getSubCategoryByCatId: builder.query({
            query: (id) => `product/sub-category/${id}`,  // Added `/` before ${id}
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),


        addProduct: builder.mutation({
            query: (productData) => ({
                url: 'product',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `product/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
        }),

        // updateProductStock: builder.mutation({
        //     query: ({ id, formData }) => ({
        //         url: `product/update-stock/${id}`,
        //         method: 'PATCH',
        //         body: formData,
        //         headers: {
        //             Accept: 'application/json',
        //         },
        //     }),
        //     invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
        // }),

        updateProductStock: builder.mutation({
            query: ({ id, formData }) => {
                console.log("🚀 Sending update stock request:", { id, formData }); // Log before sending request
                return {
                    url: `product/update-stock/${id}`,
                    method: "PATCH",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                };
            },
            // invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
            invalidatesTags: ["Product"],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductQuery,
    useGetProductByIdQuery,
    useGetProductByCodeQuery,
    useGetSubCategoryByCatIdQuery,
    useAddProductMutation,
    useUpdateProductStockMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;