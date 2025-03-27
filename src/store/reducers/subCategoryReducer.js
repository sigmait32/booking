


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api'; // Ensure this is correctly configured

// Async Thunks
export const fetchSubCategories = createAsyncThunk('subCategories/fetchSubCategories', async () => {
    const response = await api.get('/sub-category');
    return response.data;
});

// export const addSubCategory = createAsyncThunk('subCategories/addSubCategory', async (formData) => {
//     const response = await api.post('/sub-category', { formData });
//     return response.data;
// });
export const addSubCategory = createAsyncThunk(
    'subCategories/addSubCategory',
    async (formData) => {
        const response = await api.post('/sub-category', formData); // Pass formData directly
        return response.data;
    }
);

// export const updateSubCategory = createAsyncThunk('subCategories/updateSubCategory', async ({ formData }) => {
//     const response = await api.put(`/sub-category/${id}`, { formData });
//     return response.data;
// });
export const updateSubCategory = createAsyncThunk(
    'subCategories/updateSubCategory',
    async (payload, { rejectWithValue }) => {
        try {
            const { id, formData } = payload; // Destructure `id` and `formData` from the payload
            const response = await api.put(`/sub-category/${id}`, formData); // Use `id` in the endpoint and send `formData`
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update sub-category');
        }
    }
);

export const deleteSubCategory = createAsyncThunk('subCategories/deleteSubCategory', async (id) => {
    await api.delete(`/sub-category/${id}`);
    return id;
});

// Slice
const subCategorySlice = createSlice({
    name: 'subCategories',
    initialState: {
        items: [],
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
            .addCase(fetchSubCategories.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchSubCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Add Sub-Category
            .addCase(addSubCategory.pending, (state) => {
                state.addStatus = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(addSubCategory.fulfilled, (state, action) => {
                state.addStatus = 'succeeded';
                state.items.push(action.payload); // Add the new sub-category to the list
            })
            .addCase(addSubCategory.rejected, (state, action) => {
                state.addStatus = 'failed';
                state.error = action.error.message;
            })

            // Update Sub-Category
            .addCase(updateSubCategory.pending, (state) => {
                state.updateStatus = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(updateSubCategory.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload; // Update the sub-category in the list
                }
            })
            .addCase(updateSubCategory.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.error.message;
            })

            // Delete Sub-Category
            .addCase(deleteSubCategory.pending, (state) => {
                state.deleteStatus = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.items = state.items.filter(item => item._id !== action.payload); // Remove the deleted sub-category
            })
            .addCase(deleteSubCategory.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export the reset actions
export const { resetAddStatus, resetDeleteStatus, resetUpdateStatus } = subCategorySlice.actions;

export default subCategorySlice.reducer;