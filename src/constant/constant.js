export const STATUS = Object.freeze({
  IDLE: "Idle",
  LOADING: "loading",
  ERROR: "Error",
});

export const getFormattedDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
