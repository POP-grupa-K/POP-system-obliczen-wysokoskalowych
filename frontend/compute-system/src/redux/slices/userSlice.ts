import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockUsers, { User } from "../../mocks/common/mockUsers";

export interface startState {
  user: User;
}

const initialState: startState = {
  user: mockUsers[0],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<number>) => {
      const user = mockUsers.find((u) => u.id === action.payload);
      state.user = { ...user!! };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
