import { fork } from "redux-saga/effects";

import authSaga from "./Auth";

function* rootSaga() {
  yield fork(authSaga);
}

export default rootSaga;
