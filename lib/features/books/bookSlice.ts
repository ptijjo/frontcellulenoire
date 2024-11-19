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
    book: Book[] | [];
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
};

const initialState: bookState = {
    book: [],
    status: "idle",
    error: null,
};

export const getBooks = createAsyncThunk < any, { token: string; search: string; filtre: string; page: number; itemPerPage?:number}> ("books/getBooks", async ({ token, search, filtre, page=1,itemPerPage=20 }) => {
    const response = await axios.get(Url.getBooks, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params:{search,filtre,page,limit:itemPerPage}
    });
    return response.data;
});

export const deleteBook = createAsyncThunk<any, { id: string; token:string}>("books/deleteBook", async({ id, token }) => {
    const response = await axios.delete(`${Url.getBooks}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
})

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

            .addCase(deleteBook.pending, (state) => {
                state.status = "loading";
            })
        
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.status = "success";
                state.book = action.payload;
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            })
    },
});

export const selectBook = (state: any) => state.book.book.data;
export const selectBokkStatus = (state: any) => state.book.status;

export default bookSlice.reducer;