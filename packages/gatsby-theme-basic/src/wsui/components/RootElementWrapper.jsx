import { HtmlProcessorExtensionProvider } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import React from "react";

import WPModularityModule from "./WPModularityModule.jsx";

const modularityShortcode = {
  inputTransforms: [],
  treeTransforms: [],
  stringifierComponents: {
    modularity: WPModularityModule,
  },
};

export default function RootElementWrapper({ children }) {
  return (
    <HtmlProcessorExtensionProvider {...modularityShortcode}>
      {children}
    </HtmlProcessorExtensionProvider>
  );
}
