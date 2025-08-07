import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Provider } from "react-redux";
import { store } from "./store/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </FluentProvider>
  </React.StrictMode>
);
reportWebVitals();
