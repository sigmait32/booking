// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const bannerApi = createApi({
//     reducerPath: 'bannerApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
//     tagTypes: ['Banner'],
//     endpoints: (builder) => ({
//         getBanners: builder.query({
//             query: () => 'banner/list',
//             providesTags: ['Banner'],
//         }),
//         getBannerById: builder.query({
//             query: (id) => `banner/single-banner/${id}`,
//             providesTags: (result, error, id) => [{ type: 'Banner', id }],
//         }),
//         addBanner: builder.mutation({
//             query: (bannerData) => ({
//                 url: 'banner/create',
//                 method: 'POST',
//                 body: bannerData,
//             }),
//             invalidatesTags: ['Banner'],
//         }),
        
//         updateBanner: builder.mutation({
//             query: ({ id, formData }) => ({
//                 url: `banner/update/${id}`,
//                 method: 'PUT',
//                 body: formData,
//                 formData: true, // ⚠️ Tells RTK Query to send FormData properly
//             }),
//             invalidatesTags: ['Banner'],
//         }),

//         deleteBanner: builder.mutation({
//             query: (id) => ({
//                 url: `banner/remove/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['Banner'],
//         }),
//     }),
// });

// export const {
//     useGetBannersQuery,
//     useGetBannerByIdQuery,
//     useAddBannerMutation,
//     useUpdateBannerMutation,
//     useDeleteBannerMutation
// } = bannerApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bannerApi = createApi({
    reducerPath: 'bannerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    tagTypes: ['Banner'],
    endpoints: (builder) => ({
        getBanners: builder.query({
            query: () => 'banner/list',
            providesTags: ['Banner'],
        }),
        getBannerById: builder.query({
            query: (id) => `banner/single-banner/${id}`,
            providesTags: (result, error, id) => [{ type: 'Banner', id }],
        }),
        addBanner: builder.mutation({
            query: (bannerData) => ({
                url: 'banner/create',
                method: 'POST',
                body: bannerData,
            }),
            invalidatesTags: ['Banner'],
        }),
        updateBanner: builder.mutation({
            query: ({ id, formData }) => ({
                url: `banner/update/${id}`,
                method: 'PUT',
                body: formData,
                // Do not manually set Content-Type header so that the browser can set it automatically
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Banner', id }],
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `banner/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Banner'],
        }),
    }),
});

export const {
    useGetBannersQuery,
    useGetBannerByIdQuery,
    useAddBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation
} = bannerApi;
