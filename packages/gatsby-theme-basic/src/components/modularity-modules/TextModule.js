import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import React from "react";

import Box from "../Box";
import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./TextModule.module.css";

export default function TextModule({
  styles = defaultStyles,
  className,
  title,
  module: {
    content,
    contentMedia,
    // textOptions: {
    //   // fontSize = "text-md",
    //   // hideBoxFrame = false,
    // } = {},
  },
  moduleType,
  // colorScheme,
  ...restProps
}) {
  void moduleType;

  const { processPageContent } = useHTMLProcessor();
  let { content: processedContent } = processPageContent(content, {
    contentMedia,
  });

  // const textSize = fontSize.replace(/^text-/, "");

  // const Wrapper = hideBoxFrame ? "div" : Box;

  return (
    <ModuleWrapper
      as={Box}
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      {processedContent}
    </ModuleWrapper>
  );
}
