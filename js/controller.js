import { App } from "./view.js";

export function renderApp() {
  const root = document.getElementById("app");
  root.innerHTML = "";
  root.appendChild(App());
}
