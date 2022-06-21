import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./Slices/UsersSlice";

const store = configureStore({
  reducer: {
    users: UsersSlice,
  },
});

export default store;
