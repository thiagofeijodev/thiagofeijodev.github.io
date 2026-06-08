import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import createGoogleTag from "./utils/createGoogleTag";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production")
  navigator.serviceWorker.register("service-worker.js");

createGoogleTag();
