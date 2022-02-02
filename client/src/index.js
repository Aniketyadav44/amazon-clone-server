import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as ALertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const alert_options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <ALertProvider template={AlertTemplate} {...alert_options}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ALertProvider>
  </Provider>,
  document.getElementById("root")
);
