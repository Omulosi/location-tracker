import React, { createContext } from "react";
import { NavigateFunction } from "react-router-dom";
import { ActionType } from "../../store/user/user.actions";
import { useProvideAuth } from "./auth";

type AuthContextInterface = {
  authState: { isAuthenticated: boolean; error: any };
  login: (user: any, navigate: NavigateFunction) => void;
  logout: (navigate: NavigateFunction) => void;
  dispatch: React.Dispatch<ActionType> | null;
};

export const AuthContext = createContext<AuthContextInterface>({
  authState: { isAuthenticated: false, error: null },
  login: () => {},
  logout: () => {},
  dispatch: null,
});

export const AuthContextProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const authHook = useProvideAuth();

  return (
    <AuthContext.Provider value={authHook}>
      {props.children}
    </AuthContext.Provider>
  );
};
