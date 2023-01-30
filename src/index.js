import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BudgetsProvider } from "./contexts/BudgetsContexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Everything in BudgetsProvider will be available in our App */}
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>
);
