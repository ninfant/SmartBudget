import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Provider is a component that makes the store accessible throughout your app.
// StrictMode is a component that helps you to find potential problems in your code.
// store is the store that contains the state of the app.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
