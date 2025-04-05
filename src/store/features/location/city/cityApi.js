// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Base query with credentials
// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api/',
//     credentials: 'include',
// });

// export const cityApi = createApi({
//     reducerPath: 'cityApi',
//     baseQuery: baseQuery,
//     tagTypes: ['City'],
//     endpoints: (builder) => ({
//         getCity: builder.query({
//             query: () => 'city',
//             providesTags: ['City'],
//         }),
//         getCityById: builder.query({
//             query: (id) => `city/${id}`,
//             providesTags: (result, error, id) => [{ type: 'City', id }],
//         }),

//         getCityByStateId: builder.query({
//             query: (stateId) => `city/get-city-by-state/${stateId}`,
//             providesTags: (result, error, stateId) =>
//                 result
//                     ? [...result.map(({ _id }) => ({ type: 'City', id: _id })), { type: 'City', id: stateId }]
//                     : [{ type: 'City', id: stateId }],
//         }),

//         addCity: builder.mutation({
//             query: (cityData) => ({
//                 url: 'city',
//                 method: 'POST',
//                 body: cityData,
//             }),
//             invalidatesTags: ['City'],
//         }),
//         updateCity: builder.mutation({
//             query: ({ id, formData }) => ({
//                 url: `city/${id}`,
//                 method: 'PUT',
//                 body: formData,
//                 headers: { Accept: 'application/json' },
//             }),
//             invalidatesTags: (result, error, { id }) => [{ type: 'City', id }],
//         }),
//         deleteCity: builder.mutation({
//             query: (id) => ({
//                 url: `city/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['City'],
//         }),
//     }),
// });

// export const {
//     useGetCityQuery,
//     useGetCityByIdQuery,
//     useGetCityByStateIdQuery,
//     useAddCityMutation,
//     useUpdateCityMutation,
//     useDeleteCityMutation,
// } = cityApi;



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
        getCityByStateId: builder.query({
            query: (id) => `city/get-city-by-state/${id}`,
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
    useGetCityByStateIdQuery,
    useAddCityMutation,
    useUpdateCityMutation,
    useDeleteCityMutation,
} = cityApi;