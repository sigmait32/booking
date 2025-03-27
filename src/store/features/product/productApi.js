import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/', // Base URL for all endpoints
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
    useGetSubCategoryByCatIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;