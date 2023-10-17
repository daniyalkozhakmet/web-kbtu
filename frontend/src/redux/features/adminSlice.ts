import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../shared/interfaces/auth";
import { metaType } from "../../shared/interfaces/product";

interface IUserState {
  user: IUser | null;
  users: IUser[] | null;
  meta: metaType | null;
}

const initialState: IUserState = {
  user: null,
  users: null,
  meta: null,
};

export const adminSlice = createSlice({
  initialState,
  name: "adminSlice",
  reducers: {
    setUsers: (
      state,
      action: PayloadAction<{ data: IUser[]; meta: metaType }>
    ) => {
      state.users = action.payload.data;
      state.meta = action.payload.meta;
    },
  },
});

export default adminSlice.reducer;

export const { setUsers } = adminSlice.actions;
