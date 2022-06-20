import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const GetApiStatus = () => {
  const status = useSelector((state) => state.campaign.status);

  return status;
};

export const GetAllUsers = () => {
  const allUsers = createSelector(
    (state) => state.campaign.data,
    (data) =>
      data.map((user) => {
        return { id: user.id, userName: user.username };
      })
  );

  return useSelector(allUsers);
};
