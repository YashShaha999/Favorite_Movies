import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext"; // import provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <MovieProvider>
        <App />
      </MovieProvider>
    </HashRouter>
  </StrictMode>,
);
