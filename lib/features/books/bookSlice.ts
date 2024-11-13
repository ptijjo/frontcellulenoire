import Url from '@/lib/Url';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Book {
    id: string;
    title: string;
    url: string;
    categoryId: string;
    uploadedAt: Date;
};

interface bookState {
    book: Book[] | []
    status: "idle" | "loading" | "success" | "failed";
    error: string | null
};

const initialState: bookState = {
    book: [],
    status: "idle",
    error: null,
};

export const getBooks = createAsyncThunk("books/getBooks", async (token: string) => {
    const response = await axios.get(Url.getBooks, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.status = "loading";
            })
        
            .addCase(getBooks.fulfilled, (state, action) => {
                state.status = "success";
                state.book = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            })
    },
});

export const selectBook = (state: any) => state.book.book.data;
export const selectBokkStatus = (state: any) => state.book.status;

export default bookSlice.reducer;