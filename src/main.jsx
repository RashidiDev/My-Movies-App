import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { IsSignedInContextProvider } from "./contexts/IsSignedInContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <IsSignedInContextProvider>
        <App />
      </IsSignedInContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
