import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  categoryType,
  metaType,
  productsDataType,
  productType,
} from "../../shared/interfaces/product";
import { setCartLocalStorage } from "../../utils/functions";

interface IProductsState {
  products: productType[] | null;
  categories: categoryType[] | null;
  cart: {
    products: (productType & { qty: number })[];
    totalPrice: number;
    totalSum: number;
    totalQty: number;
  };
  meta: metaType | null;
}

const initialState: IProductsState = {
  products: null,
  categories: null,
  cart: { products: [], totalPrice: 0, totalSum: 0, totalQty: 0 },
  meta: null,
};

export const productSlice = createSlice({
  initialState,
  name: "productSlice",
  reducers: {
    setProducts: (state, action: PayloadAction<productsDataType>) => {
      state.products = action.payload.data;
      state.meta = action.payload.meta;
    },
    setCategories: (state, action: PayloadAction<{data:categoryType[]}>) => {
      console.log(action.payload)
      state.categories = action.payload.data;
    },
    setFromLocalStorage: (
      state,
      action: PayloadAction<{
        data: {
          products: (productType & {
            qty: number;
          })[];
          totalPrice: number;
          totalSum: number;
          totalQty: number;
        };
      }>
    ) => {
      state.cart.products = action.payload.data.products;
      state.cart.totalPrice = action.payload.data.totalPrice;
      state.cart.totalSum = action.payload.data.totalSum;
      state.cart.totalQty = action.payload.data.totalQty;
    },
    setCart: (state, action: PayloadAction<{ id: number }>) => {
      let id = action.payload.id;
      if (
        state.products &&
        state.products.some((item) => (item.id == id ? true : false))
      ) {
        state.products.forEach((p) =>
          p.id == id
            ? (state.cart.products = [...state.cart.products, { ...p, qty: 1 }])
            : (state.cart.products = [...state.cart.products])
        );

        state.cart.totalPrice = state.cart.products.reduce(
          (acc, curr) => acc + curr.price * curr.qty,
          0
        );
        state.cart.totalQty = state.cart.products.reduce(
          (acc, curr) => acc + curr.qty,
          0
        );
        setCartLocalStorage(state.cart);
      }
    },
    unSetCart: (state, action: PayloadAction<{ id: number }>) => {
      let id = action.payload.id;
      if (state.products) {
        state.cart.products = state.cart.products.filter(
          (product) => product.id != id
        );
        state.cart.totalPrice = state.cart.products.reduce(
          (acc, curr) => acc + curr.price * curr.qty,
          0
        );
        state.cart.totalQty = state.cart.products.reduce(
          (acc, curr) => acc + curr.qty,
          0
        );
        setCartLocalStorage(state.cart);
      }
    },
    increaseQtyCart: (state, action: PayloadAction<{ id: number }>) => {
      let id = action.payload.id;
      state.cart.products.forEach((item) => item.id == id && item.qty++);
      state.cart.totalPrice = state.cart.products.reduce(
        (acc, curr) => acc + curr.price * curr.qty,
        0
      );
      state.cart.totalQty = state.cart.products.reduce(
        (acc, curr) => acc + curr.qty,
        0
      );
      setCartLocalStorage(state.cart);
    },
    decreaseQtyCart: (state, action: PayloadAction<{ id: number }>) => {
      let id = action.payload.id;
      state.cart.products.map((item) =>
        item.id == id && item.qty == 1
          ? productSlice.caseReducers.unSetCart(state, {
              type: "unSetCart",
              payload: { id },
            })
          : item.id == id && item.qty--
      );
      state.cart.totalPrice = state.cart.products.reduce(
        (acc, curr) => acc + curr.price * curr.qty,
        0
      );
      state.cart.totalQty = state.cart.products.reduce(
        (acc, curr) => acc + curr.qty,
        0
      );
      setCartLocalStorage(state.cart);
    },
  },
});

export default productSlice.reducer;

export const {
  setProducts,
  setCart,
  unSetCart,
  increaseQtyCart,
  decreaseQtyCart,
  setFromLocalStorage,
  setCategories,
} = productSlice.actions;
