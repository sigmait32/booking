import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const stateApi = createApi({
    reducerPath: 'stateApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['State'],
    endpoints: (builder) => ({
        getState: builder.query({
            query: () => 'state',
            providesTags: ['State'],
        }),
        getStateById: builder.query({
            query: (id) => `state/${id}`,
            providesTags: (result, error, id) => [{ type: 'State', id }],
        }),
        getStateByCountryId: builder.query({
            query: (id) => `state/get-state-by-country/${id}`,
            providesTags: (result, error, id) => [{ type: 'State', id }],
        }),
        addState: builder.mutation({
            query: (stateData) => ({
                url: 'state',
                method: 'POST',
                body: stateData,
            }),
            invalidatesTags: ['State'],
        }),
        updateState: builder.mutation({
            query: ({ id, formData }) => ({
                url: `state/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'State', id }],
        }),
        deleteState: builder.mutation({
            query: (id) => ({
                url: `state/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['State'],
        }),
    }),
});

export const {
    useGetStateQuery,
    useGetStateByIdQuery,
    useGetStateByCountryIdQuery,
    useAddStateMutation,
    useUpdateStateMutation,
    useDeleteStateMutation,
} = stateApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Base query with credentials
// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api/', // Base URL for all endpoints
//     credentials: 'include', // Equivalent to `withCredentials: true` in axios
// });

// export const stateApi = createApi({
//     reducerPath: 'stateApi',
//     baseQuery: baseQuery, // Use the base query with credentials
//     tagTypes: ['State'], // Define a tag type for cache invalidation
//     endpoints: (builder) => ({
//         // Get all states
//         getState: builder.query({
//             query: () => 'state',
//             providesTags: (result) =>
//                 result
//                     ? [
//                         // Provide a tag for each state in the result
//                         ...result.map(({ _id }) => ({ type: 'State', id: _id })),
//                         { type: 'State', id: 'LIST' }, // Provide a tag for the entire list
//                     ]
//                     : [{ type: 'State', id: 'LIST' }], // Fallback if result is undefined
//         }),

//         // Get a single state by ID
//         getStateById: builder.query({
//             query: (id) => `state/${id}`,
//             providesTags: (result, error, id) => [{ type: 'State', id }], // Provide a tag for the specific state
//         }),

//         // Add a new state
//         addState: builder.mutation({
//             query: (stateData) => ({
//                 url: 'state',
//                 method: 'POST',
//                 body: stateData,
//             }),
//             invalidatesTags: [{ type: 'State', id: 'LIST' }], // Invalidate the entire list
//         }),

//         // Update an existing state
//         updateState: builder.mutation({
//             query: ({ id, formData }) => ({
//                 url: `state/${id}`,
//                 method: 'PUT',
//                 body: formData,
//             }),
//             invalidatesTags: (result, error, { id }) => [
//                 { type: 'State', id }, // Invalidate the specific state
//                 { type: 'State', id: 'LIST' }, // Invalidate the entire list
//             ],
//         }),

//         // Delete a state
//         deleteState: builder.mutation({
//             query: (id) => ({
//                 url: `state/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: (result, error, id) => [
//                 { type: 'State', id }, // Invalidate the specific state
//                 { type: 'State', id: 'LIST' }, // Invalidate the entire list
//             ],
//         }),
//     }),
// });

// // Export hooks for usage in components
// export const {
//     useGetStateQuery,
//     useGetStateByIdQuery,
//     useAddStateMutation,
//     useUpdateStateMutation,
//     useDeleteStateMutation,
// } = stateApi;