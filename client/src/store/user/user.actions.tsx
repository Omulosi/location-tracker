import * as ACTION_TYPES from "./user.types";

export type ActionType = {
  type: string;
  payload?: any | null;
};

export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS,
  };
};

export const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE,
  };
};

export const loginSuccess = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  };
};

export const loginFailure = (data: any | null) => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
    payload: data,
  };
};
