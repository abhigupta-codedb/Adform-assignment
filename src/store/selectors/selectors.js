import { createSelector } from "reselect";

export const normalizeUsersSelector = createSelector(
  (state) => state.campaign.data,
  (data) =>
    data.map((user) => {
      return { id: user.id, userName: user.username };
    })
);

export const normalizeTestData = (allUsers, Data) => {
  Data.forEach((data) => {
    const user = allUsers.find((user) => user.id === data.id);
    if (user) {
      data.username = user.userName;
    } else {
      data.username = "Unknown user";
    }
  });

  return Data;
};
