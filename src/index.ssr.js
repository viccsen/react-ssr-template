import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";
import Routes from "../src/routes";
import store from "./slice";
import App from "./App";

// 导出渲染函数，以给采用 Node.js 编写的 HTTP 服务器代码调用
export function render(req) {
  let url = req.url;
  let path = req.path;
  if(req.url === "/favicon.ico" || req.path === "/favicon.ico") {
    path = url = "/";
  }
  const promises = [];

  Routes.some((route) => {
    // use `matchPath` here
    const match = matchPath(path, route);
    if (match) {
      const getInitialProps =
        route.component && route.component.getInitialProps;
      if (getInitialProps && typeof getInitialProps === "function")
        promises.push(getInitialProps(store, match));
    }
    return match;
  });
  
  return Promise.all(promises).then((dataArr) => {
    const preloadedState = store.getState();
    const context = { preloadedState };
    const app = ReactDOMServer.renderToString(
      <ReduxProvider store={store}>
        <StaticRouter location={url} context={context}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    );
    return { app, preloadedState, context };
  });
}
