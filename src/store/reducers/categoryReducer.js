
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import api from "../../api";

// // Add Category
// export const categoryAdd = createAsyncThunk(
//     'category/categoryAdd',
//     async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
//         try {
//             const formData = new FormData();
//             formData.append("name", name);
//             formData.append("image", image);

//             const { data } = await api.post('/category/create', formData, { withCredentials: true });
//             return fulfillWithValue(data);
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Get Categories
// export const get_category = createAsyncThunk(
//     'category/list',
//     // async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
//     async ({ }, { rejectWithValue, fulfillWithValue }) => {
//         try {
//             // const { data } = await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true });
//             const { data } = await api.get(`/category/list`, { withCredentials: true });
//             return fulfillWithValue(data);
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Update Category
// export const updateCategory = createAsyncThunk(
//     'category/updateCategory',
//     async ({ id, name, image }, { rejectWithValue, fulfillWithValue }) => {
//         try {
//             const formData = new FormData();
//             formData.append('name', name);
//             if (image) {
//                 formData.append('image', image);
//             }
//             const { data } = await api.put(`/category-update/${id}`, formData, { withCredentials: true });
//             return fulfillWithValue(data);
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Delete Category
// export const deleteCategory = createAsyncThunk(
//     'category/deleteCategory',
//     async (id, { rejectWithValue }) => {
//         try {
//             const response = await api.delete(`/category/${id}`);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data.message);
//         }
//     }
// );

// // Create the category slice
// export const categoryReducer = createSlice({
//     name: 'category',
//     initialState: {
//         successMessage: '',
//         errorMessage: '',
//         loader: false,
//         categorys: [],
//         totalCategory: 0,
//     },
//     reducers: {
//         messageClear: (state) => {
//             state.errorMessage = '';
//             state.successMessage = '';
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Add Category
//             .addCase(categoryAdd.pending, (state) => {
//                 state.loader = true;
//             })
//             .addCase(categoryAdd.rejected, (state, { payload }) => {
//                 state.loader = false;
//                 state.errorMessage = payload.error;
//             })
//             .addCase(categoryAdd.fulfilled, (state, { payload }) => {
//                 state.loader = false;
//                 state.successMessage = payload.message;
//                 state.categorys = [...state.categorys, payload.category];
//             })

//             // Get Categories
//             .addCase(get_category.fulfilled, (state, { payload }) => {
//                 state.totalCategory = payload.totalCategory;
//                 state.categorys = payload.categorys;
//             })

//             // Update Category
//             .addCase(updateCategory.fulfilled, (state, { payload }) => {
//                 state.loader = false;
//                 state.successMessage = payload.message;
//                 const index = state.categorys.findIndex((cat) => cat._id === payload.category._id);
//                 if (index !== -1) {
//                     state.categorys[index] = payload.category;
//                 }
//             })
//             .addCase(updateCategory.rejected, (state, { payload }) => {
//                 state.loader = false;
//                 state.errorMessage = payload.error;
//             })

//             // Delete Category
//             .addCase(deleteCategory.fulfilled, (state, action) => {
//                 state.categorys = state.categorys.filter(cat => cat._id !== action.meta.arg);
//                 state.successMessage = action.payload.message;
//             })
//             .addCase(deleteCategory.rejected, (state, action) => {
//                 state.errorMessage = action.payload;
//             });
//     },
// });

// export const { messageClear } = categoryReducer.actions;
// export default categoryReducer.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

// Fetch All Categories
export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/category/list");
            // console.log("category data redux is ======>", data.categories)
            return data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
        }
    }
);

// Add Category
// export const categoryAdd = createAsyncThunk(
//     "category/categoryAdd",
//     async ({ name, image }, { rejectWithValue }) => {
//         try {
//             const formData = new FormData();
//             formData.append("name", name);
//             formData.append("image", image);

//             const { data } = await api.post("/category/create", formData, { withCredentials: true });
//             console.log("add category image is ======>", data)
//             return data.category;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Category creation failed");
//         }
//     }
// );

export const categoryAdd = createAsyncThunk(
    'category/categoryAdd',
    async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("image", image);

            const { data } = await api.post('/category/create', formData);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update Category
export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ id, name, image }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            if (image) formData.append("image", image);

            const { data } = await api.put(`/category-update/${id}`, formData);
            return data.category;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Update failed");
        }
    }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
    "category/remove",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/category/remove/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        loading: false,
        error: null,
        successMessage: "",
    },
    reducers: {
        clearMessage: (state) => {
            state.successMessage = "";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categories = payload;
            })
            .addCase(fetchCategories.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // // Add Category
            // .addCase(categoryAdd.fulfilled, (state, { payload }) => {
            //     state.categories.push(payload);
            //     state.successMessage = "Category added successfully!";
            // })

            .addCase(categoryAdd.pending, (state) => {
                state.loader = true;
            })
            .addCase(categoryAdd.rejected, (state, { payload }) => {
                state.loader = false;
                console.log(" state rejected ========>")
                console.log("state is ========>", state)
                console.log("payload is ========>", payload.error)
                state.errorMessage = payload.error;
            })
            .addCase(categoryAdd.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;

                console.log(" state fulfilled ========>")
                console.log("state is ========>", state)
                console.log("payload is ========>", payload.message)

                // state.categorys = [...state.categorys, payload.category];
            })


            // Update Category
            .addCase(updateCategory.fulfilled, (state, { payload }) => {
                const index = state.categories.findIndex((cat) => cat._id === payload._id);
                if (index !== -1) {
                    state.categories[index] = payload;
                }
                state.successMessage = "Category updated successfully!";
            })

            // Delete Category
            .addCase(deleteCategory.fulfilled, (state, { payload }) => {
                state.categories = state.categories.filter(cat => cat._id !== payload);
                state.successMessage = "Category deleted successfully!";
            });
    },
});

export const { clearMessage } = categorySlice.actions;
export default categorySlice.reducer;
