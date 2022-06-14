import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../constant";

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

// Thunk
export function fetchData() {
  return async function fetchDataThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      dispatch(setCampaign(data));
      dispatch(setStatus(STATUS.IDLE));
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
      console.log(err);
    }
  };
}
