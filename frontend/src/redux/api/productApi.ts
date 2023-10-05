import { IUser } from "../../shared/interfaces/auth";
import {
  CommentType,
  CreateCommentType,
  categoryType,
  metaType,
  productType,
  productsDataType,
} from "../../shared/interfaces/product";
import {
  setCategories,
  setProduct,
  setProducts,
} from "../features/productSlice";
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
    getProductById: builder.mutation({
      query: (data: { id: string; page?: number }) => ({
        url: `/products/${data.id}?page=${data.page ?? 1}`,
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
        // responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Products"],
      transformResponse: (result: {
        data: productType & {
          comments: CommentType[];
          meta: { current_page: number; total_page: number };
        };
      }) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProduct(data));
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
      transformResponse: (result: { data: categoryType[] }) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCategories(data));
        } catch (error) {}
      },
    }),
    getProductsByCategory: builder.mutation({
      query: (params: { id: number; page?: number }) => ({
        url: `/categories/${params.id}?page=${params.page || 1}`,
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
    createComment: builder.mutation({
      query: (data: CreateCommentType & { product_id: string }) => ({
        url: `/comment/${data.product_id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          Accept: `application/json`,
        },
      }),

      invalidatesTags: ["Products"],
      //   transformResponse: (result: { data: IUser }) => result.data,
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(logout());
          //   localStorage.removeItem("user");
          //   localStorage.removeItem("token");
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetProductsMutation,
  useCreateCommentMutation,
  useGetCategoriesMutation,
  useGetProductsByCategoryMutation,
  useGetProductByIdMutation,
} = productApi;
