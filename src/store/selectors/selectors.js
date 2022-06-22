export const normalizeTestData = (allUsers, Data) => {
  Data.forEach((data) => {
    const user = allUsers.find((user) => user.id === data.id);
    if (user) {
      data.username = user.username;
    } else {
      data.username = "Unknown user";
    }
  });

  return Data;
};
