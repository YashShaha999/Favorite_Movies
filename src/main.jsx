import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <MovieProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </MovieProvider>
    </HashRouter>
  </StrictMode>,
);
