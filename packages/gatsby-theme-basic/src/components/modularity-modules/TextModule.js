import { css } from "@emotion/react";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import { kebabCase, mapKeys, transform } from "lodash";
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
    modTextOptions: {
      // fontSize = "text-md",
      // hideBoxFrame = false,
      theme,
    } = {},
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
      css={css({
        "--box-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--box-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
      })}
      className={clsx(styles.component, className)}
    >
      {processedContent}
    </ModuleWrapper>
  );
}
