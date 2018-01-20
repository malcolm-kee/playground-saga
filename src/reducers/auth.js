import { AuthActionType, AuthStatus } from "../constants";

const DEFAULT_STATE = {
  status: AuthStatus.ANONYMOUS
};

const attemptLogin = (state, action) => ({
  ...state,
  status: AuthStatus.AWAITING_AUTH_RESPONSE
});

const loginSuccess = (state, action) => ({
  ...state,
  status: AuthStatus.LOGGED_IN
});

const loginFail = (state, action) => ({
  ...state,
  status: AuthStatus.ANONYMOUS
});

const attemptLogout = (state, action) => ({
  ...state,
  status: AuthStatus.AWAITING_AUTH_RESPONSE
});

const logoutSuccess = (state, action) => ({
  ...state,
  status: AuthStatus.ANONYMOUS
});

const logoutFail = (state, action) => ({
  ...state,
  status: AuthStatus.LOGGED_IN
});

const authReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AuthActionType.ATTEMPT_LOGIN:
      return attemptLogin(state, action);

    case AuthActionType.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case AuthActionType.LOGIN_FAIL:
      return loginFail(state, action);

    case AuthActionType.ATTEMPT_LOGOUT:
      return attemptLogout(state, action);

    case AuthActionType.LOGOUT_SUCCESS:
      return logoutSuccess(state, action);

    case AuthActionType.LOGOUT_FAIL:
      return logoutFail(state, action);

    default:
      return state;
  }
};

export default authReducer;
