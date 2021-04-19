import { Section, H } from "@jfrk/react-heading-levels";
import { Icon } from "@whitespace/components/src";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import React from "react";

import discIcon from "../../icons/disc.svg";

import * as defaultStyles from "./TextModule.module.css";

export default function TextModule({
  styles = defaultStyles,
  className,
  title,
  content,
  settings,
  contentMedia,
  ...restProps
}) {
  const { processPageContent } = useHTMLProcessor();
  let { content: processedContent } = processPageContent(content, {
    contentMedia,
  });
  const textSize = settings.fontSize.replace(/^text-/, "--");

  return (
    <article className={clsx(styles.component, className)} {...restProps}>
      {title && <H>{title}</H>}
      <Section>{processedContent}</Section>
    </article>
  );
}
