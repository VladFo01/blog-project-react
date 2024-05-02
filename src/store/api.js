import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
});

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
    }),
    getPostById: builder.query({
      query: (id) => `post/${id}`,
    }),
  }),
  reducerPath: "api",
});
