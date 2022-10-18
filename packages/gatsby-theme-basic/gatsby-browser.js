import "./src/index.css";
import { HtmlProcessorExtensionProvider } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import React from "react";

import modularityShortcode from "./node/modularityShortcode";
import BrandColorWrapper from "./src/components/BrandColorWrapper";
import FeedbackFormProvider from "./src/components/FeedbackFormProvider";
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
      <BrandColorWrapper>
        <FeedbackFormProvider>{element}</FeedbackFormProvider>
      </BrandColorWrapper>
    </pluginOptionsContext.Provider>
  );
};
