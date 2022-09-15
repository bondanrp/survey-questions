import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#009A7B",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DndProvider backend={HTML5Backend}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </DndProvider>
);
