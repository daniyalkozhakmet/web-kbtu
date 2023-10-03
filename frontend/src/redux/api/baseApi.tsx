import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/userSlice";
import { IUser } from "../../shared/interfaces/auth";
export const getTokenFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("token") || "null");
};
export const baseApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
  tagTypes: ["Auth","Products"],
  endpoints: () => ({}),

});

export const { } =
  baseApi;
