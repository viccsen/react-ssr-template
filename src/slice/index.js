import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import aboutSlice from "./about";
import saga from "../saga";

let preloadedState;
let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
try {
  preloadedState = window.__PRELOADED_STATE__;
  console.log("client preloadedState", preloadedState);
} catch (e) {}

const store = configureStore({
  reducer: {
    [aboutSlice.name]: aboutSlice.reducer,
  },
  middleware,
  preloadedState,
});
// console.log('saga', saga);
sagaMiddleware.run(saga);

export default store;
