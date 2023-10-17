import { IUser } from "../../shared/interfaces/auth";
import { metaType } from "../../shared/interfaces/product";
import { setUsers } from "../features/adminSlice";
import { baseApi, getTokenFromLocalStorage } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 1) => ({
        url: "/admin/users",
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        // responseHandler: (response) => response.text(),
      }),
      transformResponse: (result: { data: IUser[]; meta: metaType }) => {
        return result;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setUsers(data));
        } catch (error) {}
      },
    }),
  }),
});
export const { useGetUsersQuery, useLazyGetUsersQuery } = adminApi;
