import { setStatus, setUsers } from "../Slices/UsersSlice";
import { STATUS } from "../../helpers/helpers";

export const fetchData = () => {
  return async function fetchDataThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      dispatch(setUsers(data));
      dispatch(setStatus(STATUS.IDLE));
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
      console.log(err);
    }
  };
};
