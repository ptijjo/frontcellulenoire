import Url from '@/lib/Url';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Book } from '../../Interface/book.interface';

// interface Book {
//     id: string;
//     title: string;
//     url: string;
//     categoryId: string;
//     uploadedAt: Date;
// };

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
        params:{search,filtre,page,itemPerPage}
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
            // Récupération des livres
            .addCase(getBooks.pending, (state) => {
                state.status = "loading";
            })
        
            .addCase(getBooks.fulfilled, (state, action) => {
                state.status = "success";
                  // Vérifie si l'API retourne directement un tableau ou un objet contenant `data`
                state.book = Array.isArray(action.payload.data) && action.payload.data ;
    
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string || "Failed to fech books";
            })
            

            .addCase(deleteBook.pending, (state) => {
                state.status = "loading";
            })
        
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.status = "success";
                 // Filtrer le livre supprimé par son ID
                if (Array.isArray(state.book)) {
                state.book = state.book.filter((book) => book.id !== action.payload.id);
          }
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            })
    },
});

export const selectBook = (state: any) => state.book.book;
export const selectBokkStatus = (state: any) => state.book.status;

export default bookSlice.reducer;