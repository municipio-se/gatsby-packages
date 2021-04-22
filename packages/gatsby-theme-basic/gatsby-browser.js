import { IconProvider, ThemeProvider } from "@whitespace/components/src";
import React from "react";

import theme from "./src/theme";

import "./src/index.css";

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <IconProvider getIconSrc={(name) => `/icons/${name}.svg`}>
        {element}
      </IconProvider>
    </ThemeProvider>
  );
};
