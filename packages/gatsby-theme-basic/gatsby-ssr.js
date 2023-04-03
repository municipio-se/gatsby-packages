import { HtmlProcessorExtensionProvider } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import React from "react";

import modularityShortcode from "./node/modularityShortcode";
import BrandColorWrapper from "./src/components/BrandColorWrapper";
import pluginOptionsContext from "./src/contexts/pluginOptionsContext";

export const wrapRootElement = ({ element }) => {
  return (
    <HtmlProcessorExtensionProvider extension={{ ...modularityShortcode }}>
      {element}
    </HtmlProcessorExtensionProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return (
    <pluginOptionsContext.Provider value={{}}>
      <BrandColorWrapper>{element}</BrandColorWrapper>
    </pluginOptionsContext.Provider>
  );
};
