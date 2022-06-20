import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../helpers/helpers";

const CampaignSlice = createSlice({
  name: "CampaignSlice",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setCampaign(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setCampaign, setStatus } = CampaignSlice.actions;

export default CampaignSlice.reducer;
