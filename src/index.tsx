import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { ModalProvider } from "./components/modal-provider";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>
);
