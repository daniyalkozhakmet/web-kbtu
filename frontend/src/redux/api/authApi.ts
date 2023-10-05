import { IUser } from "../../shared/interfaces/auth";
import { logout, setUser } from "../features/userSlice";
import { baseApi, getTokenFromLocalStorage } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user: { email: string; password: string }) => ({
        url: "/login",
        method: "POST",
        body: user,
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
        // responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Auth"],
      transformResponse: (result: { data: IUser }) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", JSON.stringify(data.token));
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    register: builder.mutation({
      query: (user: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
      }) => ({
        url: "/register",
        method: "POST",
        body: user,
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
      }),
      invalidatesTags: ["Auth"],
      transformResponse: (result: { data: IUser }) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", JSON.stringify(data.token));
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
      }),

      invalidatesTags: ["Auth"],
      //   transformResponse: (result: { data: IUser }) => result.data,
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(logout());
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
