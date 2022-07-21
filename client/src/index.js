import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { store } from "./configure-store";
import "animate.css";

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const Component = () => <App />;
const Container = connect(mapStateToProps)(Component);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
