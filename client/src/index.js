import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { store } from "./configure-store";

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const Component = () => <App />;
const Container = connect(mapStateToProps)(Component);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Container />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
