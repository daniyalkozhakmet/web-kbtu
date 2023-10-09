import { IUser } from "../../shared/interfaces/auth";
import { logout, setToken, setUser } from "../features/userSlice";
import { baseApi, getTokenFromLocalStorage } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUser, { email: string; password: string }>({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
        // responseHandler: (response) => response.text(),
      }),

      transformResponse: (result: { data: IUser }) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken({ token: data.token }));
          localStorage.setItem("token", JSON.stringify(data.token));
          console.log("Setting token");

          if (data.verified) {
            localStorage.setItem("user", JSON.stringify(data));

            dispatch(setUser(data));
          } else {
            dispatch(logout());
          }
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
          dispatch(setToken({ token: data.token }));
          localStorage.setItem("token", JSON.stringify(data.token));
          console.log("Setting token");

          if (data.verified) {
            localStorage.setItem("user", JSON.stringify(data));

            dispatch(setUser(data));
          } else {
            dispatch(logout());
          }
          // localStorage.setItem("user", JSON.stringify(data));
          // localStorage.setItem("token", JSON.stringify(data.token));
          // dispatch(setUser(data));
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
      // transformResponse: (result) => console.log(result),
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    verifyEmail: builder.query({
      query: () => ({
        url: "/email/resend",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
      }),
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          console.log((await queryFulfilled).data);
          // dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyVerifyEmailQuery,
} = authApi;
