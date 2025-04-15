import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base query setup with credentials and environment-based URL
const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api/', // Base URL for all endpoints
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: "include",
});

export const saleEntryApi = createApi({
    reducerPath: "saleEntryApi",
    baseQuery,
    tagTypes: ["SaleEntry"],

    endpoints: (builder) => ({
        // Fetch all sale entries
        getSaleEntries: builder.query({
            query: () => "sale",
            providesTags: ["SaleEntry"],
        }),

        // Fetch a single sale entry by ID
        getSaleEntryById: builder.query({
            query: (id) => `sale/${id}`,
            providesTags: (result, error, id) => [{ type: "SaleEntry", id }],
        }),

        // Create a new sale entry
        createSaleEntry: builder.mutation({
            query: (data) => ({
                url: "sale",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["SaleEntry"],
        }),

        // Update an existing sale entry
        updateSaleEntry: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `sale/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                "SaleEntry",
                { type: "SaleEntry", id },
            ],
        }),

        // Delete a sale entry
        deleteSaleEntry: builder.mutation({
            query: (id) => ({
                url: `sale/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "SaleEntry",
                { type: "SaleEntry", id },
            ],
        }),
    }),
});

// Export generated hooks
export const {
    useGetSaleEntriesQuery,
    useGetSaleEntryByIdQuery,
    useCreateSaleEntryMutation,
    useUpdateSaleEntryMutation,
    useDeleteSaleEntryMutation,
} = saleEntryApi;
