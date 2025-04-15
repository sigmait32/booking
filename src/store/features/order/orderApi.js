

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Base query with credentials
// const baseQuery = fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api/", // Base URL for all endpoints
//     credentials: "include", // Equivalent to `withCredentials: true` in axios
// });

// export const orderApi = createApi({
//     reducerPath: "orderApi",
//     baseQuery: baseQuery, // Use the base query with credentials
//     tagTypes: ["Order"],

//     endpoints: (builder) => ({
//         // Fetch all orders
//         getOrders: builder.query({
//             query: () => "order/list",
//             providesTags: ["Order"],
//         }),

//         getEmployeeOrders: builder.query({
//             query: () => "order/get-employee-order-list",
//             providesTags: ["Order"],
//         }),

//         // Fetch order by ID
//         getOrderById: builder.query({
//             query: (orderId) => `order/${orderId}`,
//             providesTags: ["Order"],
//         }),
//         // Fetch order by ID
//         getCustomerOrderById: builder.query({
//             query: (orderId) => `order/customer-order/${orderId}`,
//             providesTags: ["Order"],
//         }),


//         // Update order status
//         updateOrderStatus: builder.mutation({
//             query: ({ id, status }) => ({
//                 url: `order/update/${id}`, // Ensure the correct endpoint
//                 method: "PATCH",
//                 body: { status },
//             }),
//             invalidatesTags: ["Order"],
//         }),

//         // Delete an order
//         deleteOrder: builder.mutation({
//             query: (orderId) => ({
//                 url: `order/${orderId}`, // Ensure consistency
//                 method: "DELETE",
//             }),
//             invalidatesTags: ["Order"],
//         }),
//     }),
// });

// // Export hooks for usage in components
// export const {
//     useGetOrdersQuery,
//     getEmployeeOrders,
//     useGetOrderByIdQuery, // New hook for fetching order by ID
//     useGetCustomerOrderByIdQuery,
//     useUpdateOrderStatusMutation,
//     useDeleteOrderMutation,
// } = orderApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: "include", // Equivalent to `withCredentials: true` in axios
});

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ["Order"],

    endpoints: (builder) => ({
        // Fetch all orders
        getOrders: builder.query({
            query: () => "order/list",
            providesTags: ["Order"],
        }),

        // Fetch all employee orders
        getEmployeeOrders: builder.query({
            query: () => "order/get-employee-order-list",
            keepUnusedDataFor: 0,
            providesTags: ["Order"], // Ensures data refresh when an order changes
        }),

        // Fetch order by ID
        getOrderById: builder.query({
            query: (orderId) => `order/${orderId}`,
            providesTags: ["Order"],
        }),

        getEmpOrderDtlById: builder.query({
            query: (orderId) => `order/employee-order-detail/${orderId}`,
            providesTags: ["Order"],
        }),



        // Fetch customer order by ID
        getCustomerOrderById: builder.query({
            query: (orderId) => `order/customer-order/${orderId}`,
            providesTags: ["Order"],
        }),

        // Update order status
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `order/update/${id}`, // Ensure the correct endpoint
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Order"],
        }),

        // Delete an order
        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: `order/${orderId}`, // Ensure consistency
                method: "DELETE",
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetOrdersQuery,
    useGetEmpOrderDtlByIdQuery,
    useGetEmployeeOrdersQuery, // Corrected this export
    useGetOrderByIdQuery,
    useGetCustomerOrderByIdQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation,
} = orderApi;
