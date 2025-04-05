import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api'; // Ensure this is correctly configured

// Async Thunks
export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', async () => {
    const response = await api.get('/customer/list');
    return response.data;
});

export const addCustomer = createAsyncThunk('customer/add', async (customerData) => {
    const response = await api.post('/customer/create', customerData);
    return response.data;
});

export const updateCustomer = createAsyncThunk('customer/update', async ({ id, customerData }) => {
    // console.log("Sending Data to Backend:", JSON.stringify(customerData, null, 2)); // ✅ Debug log
    const response = await api.put(`/customer/update/${id}`, customerData);
    return response.data;
});

export const deleteCustomer = createAsyncThunk('customer/remove', async (id) => {
    await api.delete(`/customer/remove/${id}`);
    return id;
});

// Slice
const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [],
        status: 'idle', // Tracks the status of fetch operations
        addStatus: 'idle', // Tracks the status of add operations
        updateStatus: 'idle', // Tracks the status of update operations
        deleteStatus: 'idle', // Tracks the status of delete operations
        error: null,
    },
    reducers: {
        // Add reducers to reset statuses
        resetAddStatus: (state) => {
            state.addStatus = 'idle';
        },
        resetUpdateStatus: (state) => {
            state.updateStatus = 'idle';
        },
        resetDeleteStatus: (state) => {
            state.deleteStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Customers
            .addCase(fetchCustomers.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Add Customer
            .addCase(addCustomer.pending, (state) => {
                state.addStatus = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.addStatus = 'succeeded';
                state.customers.push(action.payload); // Add the new customer to the list
            })
            .addCase(addCustomer.rejected, (state, action) => {
                state.addStatus = 'failed';
                state.error = action.error.message;
            })

            // Update Customer
            .addCase(updateCustomer.pending, (state) => {
                state.updateStatus = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.customers.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.customers[index] = action.payload; // Update the customer in the list
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.error.message;
            })

            // Delete Customer
            .addCase(deleteCustomer.pending, (state) => {
                state.deleteStatus = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.customers = state.customers.filter(item => item._id !== action.payload); // Remove the deleted customer
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export the reset actions
export const { resetAddStatus, resetUpdateStatus, resetDeleteStatus } = customerSlice.actions;

export default customerSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../api'; // Ensure this is correctly configured

// // Async Thunks
// export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', async () => {
//     const response = await api.get('/customer/list');
//     return response.data;
// });

// export const addCustomer = createAsyncThunk('customer/add', async (customerData) => {
//     const response = await api.post('/customer/create', customerData);
//     return response.data;
// });

// export const updateCustomer = createAsyncThunk('customer/update', async ({ id, customerData }) => {
//     const response = await api.put(`/customer/update/${id}`, customerData);
//     return response.data;
// });

// export const deleteCustomer = createAsyncThunk('customer/remove', async (id) => {
//     await api.delete(`/customer/remove/${id}`);
//     return id;
// });

// // Slice
// const customerSlice = createSlice({
//     name: 'customer',
//     initialState: {
//         customers: [],
//         status: 'idle', // Tracks the status of fetch operations
//         addStatus: 'idle', // Tracks the status of add operations
//         updateStatus: 'idle', // Tracks the status of update operations
//         deleteStatus: 'idle', // Tracks the status of delete operations
//         error: null,
//     },
//     reducers: {
//         // Single reducer to reset all statuses and error messages
//         clearMessage: (state) => {
//             state.addStatus = 'idle';
//             state.updateStatus = 'idle';
//             state.deleteStatus = 'idle';
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch Customers
//             .addCase(fetchCustomers.pending, (state) => {
//                 state.status = 'loading';
//                 state.error = null; // Reset error on pending
//             })
//             .addCase(fetchCustomers.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.customers = action.payload;
//             })
//             .addCase(fetchCustomers.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })

//             // Add Customer
//             .addCase(addCustomer.pending, (state) => {
//                 state.addStatus = 'loading';
//                 state.error = null; // Reset error on pending
//             })
//             .addCase(addCustomer.fulfilled, (state, action) => {
//                 state.addStatus = 'succeeded';
//                 state.customers.push(action.payload); // Add the new customer to the list
//             })
//             .addCase(addCustomer.rejected, (state, action) => {
//                 state.addStatus = 'failed';
//                 state.error = action.error.message;
//             })

//             // Update Customer
//             .addCase(updateCustomer.pending, (state) => {
//                 state.updateStatus = 'loading';
//                 state.error = null; // Reset error on pending
//             })
//             .addCase(updateCustomer.fulfilled, (state, action) => {
//                 state.updateStatus = 'succeeded';
//                 const index = state.customers.findIndex(item => item._id === action.payload._id);
//                 if (index !== -1) {
//                     state.customers[index] = action.payload; // Update the customer in the list
//                 }
//             })
//             .addCase(updateCustomer.rejected, (state, action) => {
//                 state.updateStatus = 'failed';
//                 state.error = action.error.message;
//             })

//             // Delete Customer
//             .addCase(deleteCustomer.pending, (state) => {
//                 state.deleteStatus = 'loading';
//                 state.error = null; // Reset error on pending
//             })
//             .addCase(deleteCustomer.fulfilled, (state, action) => {
//                 state.deleteStatus = 'succeeded';
//                 state.customers = state.customers.filter(item => item._id !== action.payload); // Remove the deleted customer
//             })
//             .addCase(deleteCustomer.rejected, (state, action) => {
//                 state.deleteStatus = 'failed';
//                 state.error = action.error.message;
//             });
//     },
// });

// // Export the clearMessage action
// export const { clearMessage } = customerSlice.actions;

// export default customerSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../api'; // Ensure this is correctly configured

// // Async Thunks
// export const fetchCustomers = createAsyncThunk('/customer/list', async () => {
//     const response = await api.get('/customer/list');
//     return response.data;
// });

// export const addCustomer = createAsyncThunk('customer/add', async (customerData) => {
//     const response = await api.post('/customer/create', { customerData });
//     return response.data;
// });

// export const updateCustomer = createAsyncThunk('customer/update', async ({ id, customerData }) => {
//     const response = await api.put(`/customer/update/${id}`, { customerData });
//     return response.data;
// });

// export const deleteCustomer = createAsyncThunk('customer/remove', async (id) => {
//     await api.delete(`/customer/remove/${id}`);
//     return id;
// });

// // Slice
// const customerSlice = createSlice({
//     name: 'customer',
//     initialState: {
//         customers: [],
//         status: 'idle', // Tracks the status of fetch operations
//         addStatus: 'idle', // Tracks the status of add operations
//         updateStatus: 'idle', // Tracks the status of update operations
//         deleteStatus: 'idle', // Tracks the status of delete operations
//         error: null,
//     },
//     reducers: {
//         // Add reducers to reset statuses
//         resetAddStatus: (state) => {
//             state.addStatus = 'idle';
//         },
//         resetDeleteStatus: (state) => {
//             state.deleteStatus = 'idle';
//         },

//         resetUpdateStatus: (state) => {
//             state.updateStatus = 'idle';
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch Sub-Categories
//             .addCase(fetchCustomers.pending, (state) => {
//                 state.status = 'loading';
//                 state.error = null; // Reset error on pending
//             })
//             .addCase(fetchCustomers.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.customers = action.payload;
//             })
//             .addCase(fetchCustomers.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })

//             // Add Sub-Category
//             .addCase(addCustomer.pending, (state) => {
//                 state.addStatus = 'loading';
//                 state.error = null; // Reset error on pending
//             })
//             .addCase(addCustomer.fulfilled, (state, action) => {
//                 state.addStatus = 'succeeded';
//                 state.customers.push(action.payload); // Add the new sub-category to the list
//             })
//             .addCase(addCustomer.rejected, (state, action) => {
//                 state.addStatus = 'failed';
//                 state.error = action.error.message;
//             })

//             // Update Sub-Category
//             .addCase(updateCustomer.pending, (state) => {
//                 state.updateStatus = 'loading';
//                 state.error = null; // Reset error on pending
//             })
//             .addCase(updateCustomer.fulfilled, (state, action) => {
//                 state.updateStatus = 'succeeded';
//                 const index = state.customers.findIndex(item => item._id === action.payload._id);
//                 if (index !== -1) {
//                     state.customers[index] = action.payload; // Update the sub-category in the list
//                 }
//             })
//             .addCase(updateCustomer.rejected, (state, action) => {
//                 state.updateStatus = 'failed';
//                 state.error = action.error.message;
//             })

//             // Delete Sub-Category
//             .addCase(deleteCustomer.pending, (state) => {
//                 state.deleteStatus = 'loading';
//                 state.error = null; // Reset error on pending
//             })
//             .addCase(deleteCustomer.fulfilled, (state, action) => {
//                 state.deleteStatus = 'succeeded';
//                 state.customers = state.customers.filter(item => item._id !== action.payload); // Remove the deleted sub-category
//             })
//             .addCase(deleteCustomer.rejected, (state, action) => {
//                 state.deleteStatus = 'failed';
//                 state.error = action.error.message;
//             });
//     },
// });

// // Export the reset actions
// export const { resetAddStatus, resetDeleteStatus, resetUpdateStatus } = customerSlice.actions;

// export default customerSlice.reducer;