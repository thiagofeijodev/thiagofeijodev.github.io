import { createRoot } from "react-dom/client";
import createGoogleTag from "./utils/createGoogleTag";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("service-worker.js");

createGoogleTag();
