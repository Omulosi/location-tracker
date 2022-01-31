export const HOST =
  process.env.NODE_ENV === "production"
    ? "https://speed-monitoring.herokuapp.com"
    : `http://localhost:8000`;

export const API_HOST =
  process.env.NODE_ENV === "production"
    ? "speed-monitoring.herokuapp.com"
    : "localhost:8000";

export const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? `wss://${API_HOST}`
    : `ws://${API_HOST}`;
