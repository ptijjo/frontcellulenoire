import Url from '@/lib/Url';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: string,
    email: string,
    role: string,
    pseudo: string,
    avatar:string,
};

interface userState {
    user: User | null
    status: "idle" | "loading" | "success" | "failed";
    error: string | null
};


const initialState: userState = {
    user: null,
    status: "idle",
    error: null,
};

export const login = createAsyncThunk("users/logging", async (token: string) => {
           
    const response = await axios.get(Url.decodage, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
});

export const logout = createAsyncThunk("user/logout", async (_, { dispatch }) => {
    localStorage.removeItem("token"); // Effet secondaire
});


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })

            .addCase(login.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload;
            })

            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.status = "idle";
            });
    },

});

export const selectUser = (state: any) => state.user.user;
export const selectUserStatus = (state: any) => state.user.status;


export default userSlice.reducer