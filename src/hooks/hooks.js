import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const GetApiStatus = () => {
  const status = useSelector((state) => state.users.status);

  return status;
};

export const GetAllUsers = () => {
  const allUsers = createSelector(
    (state) => state.users.data,
    (data) => data.map(({ id, username }) => ({ id, username }))
  );

  return useSelector(allUsers);
};
