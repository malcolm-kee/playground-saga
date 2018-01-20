import { AuthActionType } from "../constants";

export const attemptLogin = ({ username, password }) => ({
  type: AuthActionType.ATTEMPT_LOGIN,
  payload: {
    username,
    password
  }
});

export const loginSuccessful = () => ({
  type: AuthActionType.LOGIN_SUCCESS
});

export const loginFail = () => ({
  type: AuthActionType.LOGIN_FAIL
});

export const attemptLogout = () => ({
  type: AuthActionType.ATTEMPT_LOGOUT
});

export const logoutSuccessful = () => ({
  type: AuthActionType.LOGOUT_SUCCESS
});

export const logoutFail = () => ({
  type: AuthActionType.LOGOUT_FAIL
});
