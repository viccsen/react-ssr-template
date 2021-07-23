import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

let render = ReactDOM.hydrate;

try {
  if(__BROWSER__) {
    render = ReactDOM.render;
  }
} catch (e) {

}
// console.log('render', render);

render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById("root")
);
