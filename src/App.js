import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import store from "./slice";
import Routes from "./routes";
// import 'antd/dist/antd.css';
import "./App.css";

console.log(store.getState());

const App = (props) => {

  return (
    <Provider store={store}>
      <div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
        </ul>

        <Switch>
          {Routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
