import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  initialState,
  name: "postSlice",
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = [...payload];
    },
    reset: () => initialState,
  },
});
