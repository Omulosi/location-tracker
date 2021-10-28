import * as ACTION_TYPES from "./user.types";
import { ActionType } from "./user.actions";

export const initialState = {
  isAuthenticated: false,
  error: null,
};

export const AuthReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };

    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
