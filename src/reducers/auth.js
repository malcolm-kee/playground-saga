import { AuthActionType, AuthStatus } from "../constants";

const DEFAULT_STATE = {
  status: AuthStatus.ANONYMOUS
};

const attemptLogin = state => ({
  ...state,
  status: AuthStatus.AWAITING_AUTH_RESPONSE
});

const loginSuccess = state => ({
  ...state,
  status: AuthStatus.LOGGED_IN
});

const loginFail = state => ({
  ...state,
  status: AuthStatus.ANONYMOUS
});

const attemptLogout = state => ({
  ...state,
  status: AuthStatus.AWAITING_AUTH_RESPONSE
});

const logoutSuccess = state => ({
  ...state,
  status: AuthStatus.ANONYMOUS
});

const logoutFail = state => ({
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
