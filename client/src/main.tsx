import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
<<<<<<< HEAD
=======
import {
  initializeResourcePreloading,
  setupRouteChangePreloading,
} from "./utils/preloadResources";
import { fixMainRoutes } from "./utils/fixMainRoutes";
import { checkMainRoutes } from "./utils/routeChecker";
// import "./utils/hotmartWebhookSimulator"; // Carregar simulador de webhook - temporariamente desabilitado
>>>>>>> e3df6263084c251ab32a2aa425fbb30b0a930527

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
