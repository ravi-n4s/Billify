import React from "react";
import ReactDOM from "react-dom/client";
import register from "./serviceWorkerRegistration";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routes />
    <ToastContainer />
  </React.StrictMode>
);

register();
