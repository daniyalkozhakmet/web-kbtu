import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./redux/api/baseApi";
import userReducer from "./redux/features/userSlice";
import productReducer from "./redux/features/productSlice";
// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      baseApi.middleware,
      // authApi.middleware,
      // // Add the PostApi middleware to the store
      // postApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
