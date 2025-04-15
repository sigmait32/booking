
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const logoApi = createApi({
    reducerPath: 'logoApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['Logo'],
    endpoints: (builder) => ({
        getLogo: builder.query({
            query: () => 'logo/list',
            providesTags: ['Logo'],
        }),
        getLogoById: builder.query({
            query: (id) => `logo/single-logo/${id}`,
            providesTags: (result, error, id) => [{ type: 'Logo', id }],
        }),
        addLogo: builder.mutation({
            query: (logoData) => ({
                url: 'logo/create',
                method: 'POST',
                body: logoData,
            }),
            invalidatesTags: ['Logo'],
        }),
        updateLogo: builder.mutation({
            query: ({ id, formData }) => ({
                url: `logo/update/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Logo', id }],
        }),
        deleteLogo: builder.mutation({
            query: (id) => ({
                url: `logo/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Logo'],
        }),
    }),
});

export const {
    useGetLogoQuery,
    useGetLogoByIdQuery,
    useAddLogoMutation,
    useUpdateLogoMutation,
    useDeleteLogoMutation,
} = logoApi;