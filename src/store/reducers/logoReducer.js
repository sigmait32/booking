


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api'; // Ensure this is correctly configured

// Async Thunks
export const fetchlogo = createAsyncThunk('logo/list', async () => {
    const response = await api.get('/logo/list');
    return response.data;
});

export const addlogo = createAsyncThunk('logo/add', async (name) => {
    const response = await api.post('/logo/create', { name });
    return response.data;
});

export const updatelogo = createAsyncThunk('logo/update', async ({ id, name }) => {
    const response = await api.put(`/logo/update/${id}`, { name });
    return response.data;
});

export const deletelogo = createAsyncThunk('logo/remove', async (id) => {
    await api.delete(`/logo/remove/${id}`);
    return id;
});

// Slice
const subCategorySlice = createSlice({
    name: 'logo',
    initialState: {
        logo_list: [],
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
        resetDeleteStatus: (state) => {
            state.deleteStatus = 'idle';
        },

        resetUpdateStatus: (state) => {
            state.updateStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Sub-Categories
            .addCase(fetchlogo.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(fetchlogo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.logo_list = action.payload;
            })
            .addCase(fetchlogo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Add Sub-Category
            .addCase(addlogo.pending, (state) => {
                state.addStatus = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(addlogo.fulfilled, (state, action) => {
                state.addStatus = 'succeeded';
                state.logo_list.push(action.payload); // Add the new sub-category to the list
            })
            .addCase(addlogo.rejected, (state, action) => {
                state.addStatus = 'failed';
                state.error = action.error.message;
            })

            // Update Sub-Category
            .addCase(updatelogo.pending, (state) => {
                state.updateStatus = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(updatelogo.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.logo_list.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.logo_list[index] = action.payload; // Update the sub-category in the list
                }
            })
            .addCase(updatelogo.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.error.message;
            })

            // Delete Sub-Category
            .addCase(deletelogo.pending, (state) => {
                state.deleteStatus = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(deletelogo.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.logo_list = state.logo_list.filter(item => item._id !== action.payload); // Remove the deleted sub-category
            })
            .addCase(deletelogo.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export the reset actions
export const { resetAddStatus, resetDeleteStatus, resetUpdateStatus } = subCategorySlice.actions;

export default subCategorySlice.reducer;