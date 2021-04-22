// import { css } from "@emotion/react";
import { H, Section } from "@jfrk/react-heading-levels";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import React from "react";

import Box from "../Box";

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
    <Box
      className={clsx(styles.component, className)}
      // css={css`
      //   font-size: var(--font-size-${textSize});
      // `}
      {...restProps}
    >
      {title && <H>{title}</H>}
      <Section>{processedContent}</Section>
    </Box>
  );
}
