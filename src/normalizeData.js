import { apiData } from "./apiData";

export const normalizeTestData = (allUsers) => {
  apiData.forEach((data) => {
    const user = allUsers.find((user) => user.id === data.id);
    if (user) {
      data.username = user.userName;
    } else {
      data.username = "Unknown user";
    }
  });

  return apiData;
};
