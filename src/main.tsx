import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { TodoProvider } from "./components/store/useTodos.tsx";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <TodoProvider>
        <App />
      </TodoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
