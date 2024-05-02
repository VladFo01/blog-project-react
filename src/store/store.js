import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { postSlice } from "./slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [postSlice.name]: postSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
