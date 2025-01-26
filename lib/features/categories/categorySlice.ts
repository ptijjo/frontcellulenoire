import { Category } from '@/lib/Interface/categories.interface';
import { RootState } from '@/lib/store';
import Url from '@/lib/Url';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface categoryState{
    category: Category | null;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
};

const initialState: categoryState = {
    category: null,
    status: "idle",
    error: null,
};

export const getCategory = createAsyncThunk<any, { token: string; id: string }>("categories/getCategory", async ({ token, id }) => {
    const response = await axios.get(`${Url.getCategory}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
});

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.status = "success";
                state.category = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string || "Failed to fetch categories";
            })
    },
});



export const selectCategory = (state: any) => state.category.category;
export const selectCategoryStatus = (state: any) => state.category.status;

export default categorySlice.reducer;