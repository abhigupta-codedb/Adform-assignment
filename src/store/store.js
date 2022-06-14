import { configureStore } from "@reduxjs/toolkit";
import campaignSlice from "./campaignSlice";

const store = configureStore({
  reducer: {
    campaign: campaignSlice,
  },
});

export default store;
