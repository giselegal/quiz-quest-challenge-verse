import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  initializeResourcePreloading,
  setupRouteChangePreloading,
} from "./utils/preloadResources";
import { fixMainRoutes } from "./utils/fixMainRoutes";
import { checkMainRoutes } from "./utils/routeChecker";
// import "./utils/hotmartWebhookSimulator"; // Carregar simulador de webhook - temporariamente desabilitado

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
