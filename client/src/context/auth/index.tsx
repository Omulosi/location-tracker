import React, { createContext } from "react";
import { History } from "history";
import { ActionType } from "../../store/user/user.actions";
import { useProvideAuth } from "./auth";

type AuthContextInterface = {
  authState: { isAuthenticated: boolean; error: any };
  login: (user: any, history: History) => void;
  logout: (history: History) => void;
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
