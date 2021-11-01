export const HOST =
  process.env.NODE_ENV === "production"
    ? "https://speed-monitoring.herokuapp.com"
    : `http://localhost:8000`;
