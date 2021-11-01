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
      //Dispatch any action on success
      console.log(
        "=================================== intercepted ======================"
      );
      return response;
    },
    function (error) {
      localStorage.removeItem("token");
      window.location.reload();
      console.log(
        "=================================== intercepted error ======================"
      );
      return Promise.reject(error);
    }
  );

  return client;
};
