import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../shared/interfaces/auth";

interface IUserState {
  user: IUser | null;
  token: string | null;
}

const initialState: IUserState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      console.log(action.payload)
      state.token = action.payload.token;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setToken } = userSlice.actions;
