// export function* fetchDataSaga() {
//   try {
//     let result = yield call(() => loadData("todos"));
//     yield put(fetchData(result.data));
//   } catch (e) {
//     yield put({ type: "TODO_FETCH_FAILED" });
//   }
// }

import { all, fork } from 'redux-saga/effects';
import about from './about';

/**
 * rootSaga
 */
export default function* root() {
  // yield all([fork(github), fork(user)]);
  yield all([
    fork(about)
  ]);
}