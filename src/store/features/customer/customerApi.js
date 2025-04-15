import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => 'customer/list',
            providesTags: ['Customer'],
        }),
        getCustomerById: builder.query({
            query: (id) => `customer/${id}`,
            providesTags: (result, error, id) => [{ type: 'Customer', id }],
        }),
        addCustomer: builder.mutation({
            query: (customerData) => ({
                url: 'customer/create',
                method: 'POST',
                body: customerData,
            }),
            invalidatesTags: ['Customer'],
        }),
        // updateCustomer: builder.mutation({
        //     query: ({ id, formData }) => ({
        //         url: `customer/update/${id}`,
        //         method: 'PUT',
        //         body: formData,
        //         headers: {
        //             Accept: 'application/json',
        //         },
        //     }),
        //     invalidatesTags: (result, error, { id }) => [{ type: 'Customer', id }],
        // }),
        updateCustomer: builder.mutation({
            query: ({ id, ...formData }) => ({ // Ensure formData is spread correctly
                url: `customer/update/${id}`,
                method: 'PUT',
                body: formData,  // Send data directly
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Customer', id }],
        }),

        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `customer/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Customer'],
        }),
    }),
});

export const {
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customerApi;
