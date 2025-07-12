import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ClientLayout from "./components/ClientLayout";
import { LovableProvider } from "../lovable";
import {
  initializeResourcePreloading,
  setupRouteChangePreloading,
} from "./utils/preloadResources";
import { fixMainRoutes } from "./utils/fixMainRoutes";
import { checkMainRoutes } from "./utils/routeChecker";
// import "./utils/hotmartWebhookSimulator"; // Carregar simulador de webhook - temporariamente desabilitado

// Initialize performance optimizations
initializeResourcePreloading();
setupRouteChangePreloading();

// Initialize route checking and fixes
setTimeout(() => {
  fixMainRoutes();
  checkMainRoutes();
}, 100);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LovableProvider>
      <ClientLayout>
        <App />
      </ClientLayout>
    </LovableProvider>
  </React.StrictMode>
);
