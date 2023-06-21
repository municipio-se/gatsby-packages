import { HtmlProcessorExtensionProvider } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import React from "react";

import WpModularityModule from "./WpModularityModule.jsx";

const modularityShortcode = {
  inputTransforms: [],
  treeTransforms: [],
  stringifierComponents: {
    modularity: WpModularityModule,
  },
};

export default function RootElementWrapper({ children }) {
  return (
    <HtmlProcessorExtensionProvider {...modularityShortcode}>
      {children}
    </HtmlProcessorExtensionProvider>
  );
}
