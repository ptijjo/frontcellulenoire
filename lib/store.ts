import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import bookReducer from './features/books/bookSlice';
import categoryReducer from "./features/categories/categorySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      book: bookReducer,
      category:categoryReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']