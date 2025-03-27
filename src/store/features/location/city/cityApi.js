import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/', // Base URL for all endpoints
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const cityApi = createApi({
    reducerPath: 'cityApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['City'],
    endpoints: (builder) => ({
        getCity: builder.query({
            query: () => 'city',
            providesTags: ['City'],
        }),
        getCityById: builder.query({
            query: (id) => `city/${id}`,
            providesTags: (result, error, id) => [{ type: 'City', id }],
        }),
        addCity: builder.mutation({
            query: (cityData) => ({
                url: 'city',
                method: 'POST',
                body: cityData,
            }),
            invalidatesTags: ['City'],
        }),
        updateCity: builder.mutation({
            query: ({ id, formData }) => ({
                url: `city/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'City', id }],
        }),
        deleteCity: builder.mutation({
            query: (id) => ({
                url: `city/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['City'],
        }),
    }),
});

export const {
    useGetCityQuery,
    useGetCityByIdQuery,
    useAddCityMutation,
    useUpdateCityMutation,
    useDeleteCityMutation,
} = cityApi;