// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const cartApi = createApi({
//     reducerPath: "cartApi",
//     baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/cart" }),
//     endpoints: (builder) => ({
//         getCart: builder.query({
//             query: (userId) => `/${userId}`,
//         }),
//         addToCart: builder.mutation({
//             query: (cartData) => ({
//                 url: "/add",
//                 method: "POST",
//                 body: cartData,
//             }),
//         }),
//         removeFromCart: builder.mutation({
//             query: ({ userId, productId }) => ({
//                 url: `/${userId}/${productId}`,
//                 method: "DELETE",
//             }),
//         }),
//         checkout: builder.mutation({
//             query: (userId) => ({
//                 url: "/checkout",
//                 method: "POST",
//                 body: { userId },
//             }),
//         }),
//     }),
// });

// export const {
//     useGetCartQuery,
//     useAddToCartMutation,
//     useRemoveFromCartMutation,
//     useCheckoutMutation
// } = cartApi;



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials and headers configuration
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Include cookies for authentication
    prepareHeaders: (headers) => {
        // You can add any common headers here
        headers.set('Accept', 'application/json');
        return headers;
    },
});

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: baseQuery,
    tagTypes: ['Cart'], // Define tag types for caching
    endpoints: (builder) => ({
        // Get user's cart
        getCart: builder.query({
            query: (userId) => ({
                url: `${userId}`,
                method: 'GET',
            }),
            providesTags: ['Cart'], // This query provides 'Cart' tag
        }),

        // Add item to cart
        addToCart: builder.mutation({
            query: (cartData) => ({
                url: 'add',
                method: 'POST',
                body: cartData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Cart'], // This mutation invalidates 'Cart' tag
        }),

        // Remove item from cart
        removeFromCart: builder.mutation({
            query: ({ userId, productId }) => ({
                url: `${userId}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        // Update cart item quantity
        updateCartItem: builder.mutation({
            query: ({ userId, productId, quantity }) => ({
                url: `${userId}/${productId}`,
                method: 'PATCH',
                body: { quantity },
            }),
            invalidatesTags: ['Cart'],
        }),

        // Checkout process
        checkout: builder.mutation({
            query: (orderData) => ({
                url: 'order/create',
                method: 'POST',
                body: orderData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Cart'], // Checkout clears the cart
            // Transform response to standardize it
            transformResponse: (response) => {
                if (!response.order) {
                    throw new Error('Order ID missing in response');
                }
                return response;
            },
            // Handle errors consistently
            transformErrorResponse: (response) => {
                return {
                    status: response.status,
                    data: response.data?.message || 'Checkout failed. Please try again.',
                };
            },
        }),

        // Clear entire cart
        clearCart: builder.mutation({
            query: (userId) => ({
                url: `${userId}/clear`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useUpdateCartItemMutation,
    useCheckoutMutation,
    useClearCartMutation,
} = cartApi;