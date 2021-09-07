import { css } from "@emotion/react";
import TextContent from "@whitespace/gatsby-theme-wordpress-basic/src/components/TextContent";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Box from "../Box";
import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./TextModule.module.css";

TextModule.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
  module: PropTypes.shape({
    content: PropTypes.string,
    contentMedia: PropTypes.arrayOf(PropTypes.object),
    modTextOptions: PropTypes.shape({
      hideBoxFrame: PropTypes.bool,
      theme: PropTypes.string,
    }),
  }),
};

export default function TextModule({
  styles = defaultStyles,
  className,
  title,
  module: {
    content,
    contentMedia,
    modTextOptions: { fontSize = "text-md", hideBoxFrame = false, theme } = {},
  },
  // colorScheme,
  ...restProps
}) {
  const { processPageContent } = useHTMLProcessor();
  let { content: processedContent } = processPageContent(content, {
    contentMedia,
  });

  const textSize = fontSize.replace(/^text-/, "");

  const Wrapper = hideBoxFrame ? "div" : Box;

  return (
    <ModuleWrapper
      as={Wrapper}
      title={title}
      {...restProps}
      css={css({
        "--box-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--box-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--text-module-content-font-size": `var(--text-module-content-${kebabCase(
          textSize,
        )})`,
        "--text-module-title-font-size": `var(--text-module-title-${kebabCase(
          textSize,
        )})`,
      })}
      styles={styles}
      className={clsx(className)}
    >
      <TextContent className={styles.content}>{processedContent}</TextContent>
    </ModuleWrapper>
  );
}
