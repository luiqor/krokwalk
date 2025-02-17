import { StrictMode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { App } from "./App.jsx";
import { themeOptions } from "./libs/constants/constants.js";
import { store } from "./modules/store/store.js";

import "./index.css";

const theme = createTheme(themeOptions);
const NOTIFICATION_DURATION = 5000;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer autoClose={NOTIFICATION_DURATION} hideProgressBar />
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
