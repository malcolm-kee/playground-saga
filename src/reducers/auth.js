import { AuthActionType, AuthStatus } from "../constants";

const DEFAULT_STATE = {
  status: AuthStatus.ANONYMOUS,
  error: ""
};

const attemptLogin = state => ({
  ...state,
  status: AuthStatus.AWAITING_AUTH_RESPONSE,
  error: ""
});

const loginSuccess = state => ({
  ...state,
  status: AuthStatus.LOGGED_IN,
  error: ""
});

const loginFail = (state, action) => ({
  ...state,
  status: AuthStatus.ANONYMOUS,
  error: action.payload
});

const attemptLogout = state => ({
  ...state,
  status: AuthStatus.AWAITING_AUTH_RESPONSE,
  error: ""
});

const logoutSuccess = state => ({
  ...state,
  status: AuthStatus.ANONYMOUS,
  error: ""
});

const logoutFail = (state, action) => ({
  ...state,
  status: AuthStatus.LOGGED_IN,
  message: action.payload
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
