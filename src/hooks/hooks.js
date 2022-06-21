import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const GetApiStatus = () => {
  const status = useSelector((state) => state.users.status);

  return status;
};

export const GetAllUsers = () => {
  const allUsers = createSelector(
    (state) => state.users.data,
    (data) =>
      data.map((user) => {
        return { id: user.id, userName: user.username };
      })
  );

  return useSelector(allUsers);
};
