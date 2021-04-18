import theme from "./src/theme";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
