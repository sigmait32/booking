
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const categoryApi = createApi({
//     reducerPath: 'categoryApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
//     tagTypes: ['Category'],
//     endpoints: (builder) => ({
//         getCategorys: builder.query({
//             query: () => 'category/list',
//             providesTags: ['Category'],
//         }),
//         getCategoryById: builder.query({
//             query: (id) => `category/${id}`,
//             providesTags: (result, error, id) => [{ type: 'Category', id }],
//         }),
//         addCategory: builder.mutation({
//             query: (categoryData) => ({
//                 url: 'category/create',
//                 method: 'POST',
//                 body: categoryData,
//             }),
//             invalidatesTags: ['Category'],
//         }),
//         updateCategory: builder.mutation({
//             query: ({ id, formData }) => ({
//                 url: `category/update/${id}`,
//                 method: 'PUT',
//                 body: formData,
//                 // Do not manually set Content-Type header so that the browser can set it automatically
//                 headers: {
//                     Accept: 'application/json',
//                 },
//             }),
//             invalidatesTags: (result, error, { id }) => [{ type: 'Banner', id }],
//         }),

//         deleteCategory: builder.mutation({
//             query: (id) => ({
//                 url: `category/remove/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['Category'],
//         }),
//     }),
// });

// export const {
//     useGetCategorysQuery,
//     useGetCategoryByIdQuery,
//     useAddCategoryMutation,
//     useUpdateCategoryMutation,
//     useDeleteCategoryMutation
// } = categoryApi;




import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/', // Base URL for all endpoints
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['category'],
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => 'category/list',
            providesTags: ['category'],
        }),
        getCategoryById: builder.query({
            query: (id) => `category/${id}`,
            providesTags: (result, error, id) => [{ type: 'category', id }],
        }),
        addCategory: builder.mutation({
            query: (categoryData) => ({
                url: 'category/create',
                method: 'POST',
                body: categoryData,
            }),
            invalidatesTags: ['category'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, formData }) => ({
                url: `category/update/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'category', id }],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `category/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['category'],
        }),
    }),
});

export const {
    useGetCategoryByIdQuery,
    useGetCategoryQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;
