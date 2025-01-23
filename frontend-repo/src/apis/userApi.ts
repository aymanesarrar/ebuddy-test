import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3003",
  async prepareHeaders(headers, api) {
    const data = await fetch("http://localhost:3000/api/session", {
      credentials: "include",
    });
    const token = await data.json();
    const tokenId = token.tokenId;
    if (tokenId) {
      headers.set("authorization", `Bearer ${tokenId}`);
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/users/fetch-user-data",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
