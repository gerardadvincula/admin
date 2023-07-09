import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
import { AuthContextProvider } from "./contextApi/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
