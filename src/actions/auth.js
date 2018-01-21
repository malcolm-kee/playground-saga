import { AuthActionType } from "../constants";

export const attemptLogin = input => {
  if (typeof input.refreshToken === "string") {
    // attempt login with token
    return {
      type: AuthActionType.ATTEMPT_LOGIN,
      payload: input
    };
  }

  const { username, password } = input;
  return {
    type: AuthActionType.ATTEMPT_LOGIN,
    payload: {
      username,
      password
    }
  };
};

export const loginSuccessful = () => ({
  type: AuthActionType.LOGIN_SUCCESS
});

export const loginFail = errorMsg => ({
  type: AuthActionType.LOGIN_FAIL,
  payload: errorMsg
});

export const attemptLogout = () => ({
  type: AuthActionType.ATTEMPT_LOGOUT
});

export const logoutSuccessful = () => ({
  type: AuthActionType.LOGOUT_SUCCESS
});

export const logoutFail = errorMsg => ({
  type: AuthActionType.LOGOUT_FAIL,
  payload: errorMsg
});
