import { IUser } from "../../shared/interfaces/auth";
import {
  categoryType,
  metaType,
  productType,
  productsDataType,
} from "../../shared/interfaces/product";
import { setCategories, setProducts } from "../features/productSlice";
import { logout, setUser } from "../features/userSlice";
import { baseApi, getTokenFromLocalStorage } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: (page = 1) => ({
        url: `/products?page=${page}`,
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
        // responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Products"],
      transformResponse: (result: productsDataType) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProducts(data));
        } catch (error) {}
      },
    }),
    getCategories: builder.mutation({
      query: (page = 1) => ({
        url: `/categories?page=${page}`,
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
        // responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Products"],
      transformResponse: (result: {data:categoryType[]}) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data)
          dispatch(setCategories(data));
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
        },
      }),

      invalidatesTags: ["Auth"],
      //   transformResponse: (result: { data: IUser }) => result.data,
      async onQueryStarted(_, { dispatch }) {
        try {
          console.log(getTokenFromLocalStorage());
          dispatch(logout());
          //   localStorage.removeItem("user");
          //   localStorage.removeItem("token");
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});
export const { useGetProductsMutation, useLogoutMutation ,useGetCategoriesMutation} = productApi;
