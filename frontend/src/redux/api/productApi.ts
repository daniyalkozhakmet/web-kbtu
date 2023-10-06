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
    getProducts: builder.query({
      query: (page = 1) => ({
        url: `/products?page=${page}`,
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
        // responseHandler: (response) => response.text(),
      }),
      transformResponse: (result: productsDataType) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProducts(data));
        } catch (error) {}
      },
    }),
    getProductById: builder.query({
      query: (data: { id: string; page?: number }) => ({
        url: `/products/${data.id}?page=${data.page ?? 1}`,
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
      }),
      transformResponse: (result: {
        data: productType & {
          comments: CommentType[];
          meta: { current_page: number; total_page: number };
        };
      }) => result,
      providesTags: [{ type: "SingleProduct", id: "id" }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setProduct(data));
        } catch (error) {}
      },
    }),
    getCategories: builder.query({
      query: (page = 1) => ({
        url: `/categories?page=${page}`,
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
        // responseHandler: (response) => response.text(),
      }),
      transformResponse: (result: { data: categoryType[] }) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCategories(data));
        } catch (error) {}
      },
    }),
    getProductsByCategory: builder.query({
      query: (params: { id: number; page?: number }) => ({
        url: `/categories/${params.id}?page=${params.page || 1}`,
        method: "GET",
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json`,
        },
        // responseHandler: (response) => response.text(),
      }),
      transformResponse: (result: productsDataType) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Helllo");
          dispatch(setProducts(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    createComment: builder.mutation({
      query: (data: CreateCommentType & { product_id: string }) => ({
        url: `/comment/${data.product_id}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
      }),
      invalidatesTags: [{ type: "SingleProduct", id: "id" }],
      async onQueryStarted(_, { dispatch }) {
        try {
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useCreateCommentMutation,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,

  useGetProductsByCategoryQuery,
  useLazyGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
} = productApi;
