import { call, delay, put, race, take } from "redux-saga/effects";

import { AuthActionType } from "../../constants";
import { authService, deauthService, getStoredToken, restoreTokenDb } from "../../apis/auth";
import {
  attemptLogin,
  loginFail,
  loginSuccessful,
  logoutFail,
  logoutSuccessful
} from "../../actions/auth";

function* callApiWithRetry(service, ...data) {
  for (let i = 0; i < 5; i += 1) {
    try {
      const apiResponse = yield call(service, ...data);
      return apiResponse;
    } catch (err) {
      if (i < 4) {
        yield call(delay, 1000);
      }
    }
  }
  throw new Error(`${service.name} call fails.`);
}

function* authenticate(credentialsOrToken) {
  try {
    const token = yield call(callApiWithRetry, authService, credentialsOrToken);
    yield put(loginSuccessful());
    return token;
  } catch (e) {
    yield put(loginFail(e.message));
    return null;
  }
}

function* deauthenticate() {
  try {
    yield call(callApiWithRetry, deauthService);
    yield put(logoutSuccessful());
    return true;
  } catch (e) {
    yield put(logoutFail(e.message));
    return null;
  }
}

function* authSaga() {
  let token;
  try {
    yield call(restoreTokenDb); // restoreTokenDb should not be required in real application
    token = yield call(getStoredToken);
    yield put(attemptLogin(token));
  } catch (error) {
    token = null;
  }

  while (true) {
    while (token) {
      const { expiresIn, accessToken } = token;
      const { expired } = yield race({
        expired: delay(expiresIn * 1000, accessToken),
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

    const action = yield take(AuthActionType.ATTEMPT_LOGIN);
    const { username, password } = action.payload;

    token = yield call(authenticate, { username, password });
  }
}

export default authSaga;
