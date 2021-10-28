import { useContext, useReducer } from "react";
import axios from "axios";
import { History } from "history";
import { AuthReducer, initialState } from "../../store/user/user.reducer";
import { loginSuccess, loginFailure } from "../../store/user/user.actions";
import { AuthContext } from "./index";
import { HOST } from "../../config";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [authState, dispatch] = useReducer(AuthReducer, initialState);

  const login = (user: any, history: History) => {
    axios
      .post(`${HOST}/auth/token/login/`, user)
      .then((res) => {
        dispatch(loginSuccess());
        localStorage.setItem("token", res.data.auth_token);
        history.push("/");
      })
      .catch((error) => {
        dispatch(loginFailure(error?.response?.data?.error || error.message));
      });
  };

  const logout = (history: History) => {
    localStorage.removeItem("token");
    history.push("/login");
    dispatch(loginFailure(null));
  };

  return {
    authState,
    login,
    logout,
    dispatch,
  };
};
