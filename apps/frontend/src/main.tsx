import { StrictMode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { App } from "./app.js";

import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#42a5f5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0000ff",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
