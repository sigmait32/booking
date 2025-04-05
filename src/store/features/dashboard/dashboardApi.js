import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/dashboard" }),
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => "/stats", // Backend should return all stats in one request
        }),
    }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
