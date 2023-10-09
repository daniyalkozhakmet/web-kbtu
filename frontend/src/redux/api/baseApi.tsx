import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/userSlice";
import { IUser } from "../../shared/interfaces/auth";
export const getTokenFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("token") || "null");
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api",

  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult?.data) {
      localStorage.setItem(
        "token",
        JSON.stringify(refreshResult?.data?.data?.token)
      );
      // const user = api.getState().componentSlice.user;
      // // store the new token
      // api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      api.dispatch(logout());
    }
  }
  if (result?.error?.status === 403) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Products", "SingleProduct"],
  endpoints: () => ({}),
});

export const {} = baseApi;
