import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import "./styles/index.css";
import App from "./components/App";
import { UserProvider } from "./providers/userProvider";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <UserProvider>
        <App />
      </UserProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
