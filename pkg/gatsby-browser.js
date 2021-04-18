import { ThemeProvider } from "@whitespace/components/src";
import React from "react";

import theme from "./src/theme";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
