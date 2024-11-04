import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from 'react-redux';
import App from "@/App.tsx";
import "@/index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme.ts";
import "@/i18n";
import "@/font-awesome";
import store from './redux/store';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);