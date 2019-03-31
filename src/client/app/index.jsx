import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import stackReducer from "./reducers/stackReducer";
import Container from "./containers/rootContainer";
import { fromJS } from "immutable";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.scss";

let initialState = fromJS({});
let store = createStore(stackReducer, initialState);

render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById("root")
);
