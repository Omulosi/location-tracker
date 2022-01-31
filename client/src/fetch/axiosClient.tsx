import axios from "axios";
import { HOST } from "../config";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  let client = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    baseURL: HOST,
  });

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // localStorage.removeItem("token");
      // window.location.reload();
      return Promise.reject(error);
    }
  );

  return client;
};
