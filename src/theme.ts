import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Noto Sans, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
});

export default theme;
