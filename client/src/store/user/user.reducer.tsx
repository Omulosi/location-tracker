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
      };

    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
