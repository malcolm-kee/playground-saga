import { call, put, race, take } from "redux-saga/effects";
import { delay } from "redux-saga";

import { AuthActionType } from "../../constants";
import { authService, deauthService } from "../../apis/auth";
import { loginFail, loginSuccessful, logoutFail, logoutSuccessful } from "../../actions/auth";

function* authenticate(credentialsOrToken) {
  try {
    const token = yield call(authService, credentialsOrToken);
    yield put(loginSuccessful());
    return token;
  } catch (e) {
    yield put(loginFail());
    return null;
  }
}

function* deauthenticate() {
  try {
    yield call(deauthService);
    yield put(logoutSuccessful());
    return true;
  } catch (e) {
    yield put(logoutFail());
    return null;
  }
}

function* authSaga() {
  while (true) {
    const action = yield take(AuthActionType.ATTEMPT_LOGIN);
    const { username, password } = action.payload;

    let token = yield call(authenticate, { username, password });

    while (token) {
      const { expired } = yield race({
        expired: delay(token.expiresIn * 1000),
        logout: take(AuthActionType.ATTEMPT_LOGOUT)
      });

      if (expired) {
        token = yield call(authenticate, token.refreshToken);
      } else {
        const logout = yield call(deauthenticate);
        if (logout) {
          token = null;
        }
      }
    }
  }
}

export default authSaga;
