import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

//store.dispatch({type: "PRODUCT_LIST", payload: [{id: 1, name: "item", detail: "detail"}]});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
