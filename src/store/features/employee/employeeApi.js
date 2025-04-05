import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/', // Base URL for all endpoints
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['Employee'],
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => 'employee-list',
            providesTags: ['Employee'],
        }),
        getEmployeeById: builder.query({
            query: (id) => `employee/${id}`,
            providesTags: (result, error, id) => [{ type: 'Employee', id }],
        }),
        addEmployee: builder.mutation({
            query: (employeeData) => ({
                url: 'register',
                method: 'POST',
                body: employeeData,
            }),
            invalidatesTags: ['Employee'],
        }),

        updateEmployee: builder.mutation({
            query: ({ id, ...formData }) => ({ // Ensure formData is spread correctly
                url: `employee/update/${id}`,
                method: 'PUT',
                body: formData,  // Send data directly
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Employee', id }],
        }),

        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `remove-employee/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employee'],
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useGetEmployeeByIdQuery,
    useAddEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApi;
