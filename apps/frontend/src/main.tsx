import { StrictMode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";

import { App } from "./App.jsx";
import { themeOptions } from "./libs/constants/constants.js";
import { store } from "./modules/store/store.js";

import "./index.css";

const theme = createTheme(themeOptions);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
