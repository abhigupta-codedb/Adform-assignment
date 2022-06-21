import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../helpers/helpers";

const UsersSlice = createSlice({
  name: "UsersSlice",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setUsers, setStatus } = UsersSlice.actions;

export default UsersSlice.reducer;
