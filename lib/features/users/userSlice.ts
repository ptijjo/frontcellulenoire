import Url from '@/lib/Url';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: string,
    email: string,
    role: string,
    pseudo: string,
    avatar: string,
    download:number,
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

export const login = createAsyncThunk("users/logging", async ():Promise<User> => {
           
    const response = await axios.get(Url.decodage, {
        withCredentials:true,
    });
    return response.data
});

export const getAllUser = createAsyncThunk<any, { search: string; page: number; itemPerPage: number }>("users/getAll", async ({search, page = 1, itemPerPage = 20 }) => {
    const allUser = await axios.get(Url.userById, {
        withCredentials:true,
        params: { search, page, itemPerPage }
    })

    return allUser.data;
});

export const logout = createAsyncThunk("user/logout", async (): Promise<void> => {
    
    await axios.get(Url.logout, { withCredentials: true });
});



export const updatePseudo = createAsyncThunk<any, { id: string; data:string }>("users/updatePseudo", async ({ id, data }) => {
    const response = await axios.put(`${Url.userById}/${id}`, {
      pseudo:data,  
    }, {
        withCredentials:true,
    });

    return(response.data.data.pseudo);
    
});

export const updateRole = createAsyncThunk<any, { id: string; data: string }>("users/updateRole", async ({ id, data }) => { 

    if (data !== "admin" && data !== "modo" && data !== "user") {
        return "user";
     }

    const response = await axios.put(`${Url.userById}/${id}`, {
        role: data
    }, {
        withCredentials:true,
    });

    return response.data.data.role;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder
            //Utilisateur connecté
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
            
            //Mise a jour de pseudo de l'utilisateur connecté
        .addCase(updatePseudo.pending, (state) => {
            state.status = "loading";
        })

        .addCase(updatePseudo.fulfilled, (state, action) => {
            state.status = "success";
            state.user = {
                ...state.user!,
                pseudo: action.payload
            };
        })

        .addCase(updatePseudo.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message as string;
        }) 
            
        //Mise à jour du role de l'utilisateur connecté
        .addCase(updateRole.pending, (state) => {
            state.status = "loading";
        })
        .addCase(updateRole.fulfilled, (state, action) => {
            state.status = "success";
            state.user = {
                ...state.user!,
                role: action.payload
            };
        })
        .addCase(updateRole.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message as string;
        })

        //Déconnection
           .addCase(logout.pending, (state) => {
            state.status = "loading";
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.status = "success";
            state.user = null;
        })
        .addCase(logout.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message as string;
        })
    },

});

export const selectUser = (state: any) => state.user.user;
export const selectUserStatus = (state: any) => state.user.status;
export const selectUserError = (state: any) => state.user.error;
// export const { logout } = userSlice.actions;


export default userSlice.reducer;