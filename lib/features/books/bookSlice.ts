import Url from '@/lib/Url';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Book } from '../../Interface/book.interface';
import { PaginationMeta } from '../../Interface/pagination.interface';

interface bookState {
    book: Book[];
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
    pagination: PaginationMeta;
};

const defaultPagination: PaginationMeta = {
    page: 1,
    itemPerPage: 20,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
};

const initialState: bookState = {
    book: [],
    status: "idle",
    error: null,
    pagination: defaultPagination,
};

export const getBooks = createAsyncThunk<
    { data: Book[]; pagination: PaginationMeta },
    { search: string; filtre: string; page: number; itemPerPage?: number }
>("books/getBooks", async ({ search, filtre, page = 1, itemPerPage = 20 }) => {
    const response = await axios.get(Url.getBooks, {
       withCredentials: true,
        params: { search, filtre, page, itemPerPage }
    });
    return response.data;
});

export const deleteBook = createAsyncThunk<any, { id: string; }>("books/deleteBook", async ({ id }) => {
    const response = await axios.delete(`${Url.getBooks}/${id}`, {
        withCredentials: true,
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
                state.book = Array.isArray(action.payload.data) ? action.payload.data : [];
                state.pagination = action.payload.pagination ?? defaultPagination;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string || "Failed to fetch books";
            })
            .addCase(deleteBook.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.status = "success";
                const deletedId = action.payload?.data?.id ?? action.meta.arg.id;
                if (Array.isArray(state.book)) {
                    state.book = state.book.filter((book) => book.id !== deletedId);
                }
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            });
    },
});

export const selectBook = (state: any) => state.book.book;
export const selectBookPagination = (state: any) => state.book.pagination;
export const selectBokkStatus = (state: any) => state.book.status;

export default bookSlice.reducer;
