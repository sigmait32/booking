

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const countryApi = createApi({
    reducerPath: 'countryApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['Country'],
    endpoints: (builder) => ({
        getCountry: builder.query({
            query: () => 'country',
            providesTags: ['Country'],
        }),
        getCountryById: builder.query({
            query: (id) => `country/${id}`,
            providesTags: (result, error, id) => [{ type: 'Country', id }],
        }),
        addCountry: builder.mutation({
            query: (countryData) => ({
                url: 'country',
                method: 'POST',
                body: countryData,
            }),
            invalidatesTags: ['Country'],
        }),
        updateCountry: builder.mutation({
            query: ({ id, formData }) => ({
                url: `country/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Country', id }],
        }),
        deleteCountry: builder.mutation({
            query: (id) => ({
                url: `country/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Country'],
        }),
    }),
});

export const {
    useGetCountryQuery,
    useGetCountryByIdQuery,
    useAddCountryMutation,
    useUpdateCountryMutation,
    useDeleteCountryMutation,
} = countryApi;