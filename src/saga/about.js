/**
 * @module Sagas/About
 * @desc About List
 */
import { all, put, takeLatest, call } from "redux-saga/effects";
import { About } from "../utils/namespace";
import { fetchData } from "../slice/about";
import { loadData } from "../utils/helpers";

/**
 * list
 */
function* list() {
  try {
    let result = yield call(() => loadData("todos"));
    yield put(fetchData(result));
  } catch (e) {
    console.log("e", e);
    // yield put({ type: "TODO_FETCH_FAILED" });
  }
}

/**
 * About Sagas
 */
export default function* root() {
  yield all([
    takeLatest(About + "/list", list),
  ]);
}
