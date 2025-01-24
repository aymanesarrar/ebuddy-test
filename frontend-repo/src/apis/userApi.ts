import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "shared";

let sessionToken: string | null | undefined = null;

const fetchSessionToken = async () => {
  if (!sessionToken) {
    const response = await fetch("http://localhost:3000/api/session", {
      credentials: "include",
    });
    const tokenData = await response.json();
    sessionToken = tokenData.tokenId;
  }
  return sessionToken;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3003",
  async prepareHeaders(headers, api) {
    if (!sessionToken) {
      sessionToken = await fetchSessionToken();
    }
    if (sessionToken) {
      headers.set("authorization", `Bearer ${sessionToken}`);
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<IUser, any>({
      query: () => "/fetch-user-data",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/update-user-data",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "http://localhost:3000/api/logout",
        method: "POST",
      }),

      onQueryStarted: async () => {
        sessionToken = null;
      },
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation, useLogoutUserMutation } =
  userApi;
