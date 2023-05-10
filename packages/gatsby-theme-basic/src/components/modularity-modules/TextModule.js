import { css } from "@emotion/react";
import { HTML } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import TextContent from "@whitespace/gatsby-theme-wordpress-basic/src/components/TextContent";
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
    contentModularityModules: PropTypes.shape({ nodes: PropTypes.any }),
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
    contentModularityModules,
    modTextOptions: { hideBoxFrame = false, theme } = {},
  },
  // colorScheme,
  ...restProps
}) {
  const Wrapper = hideBoxFrame ? "div" : Box;

  return (
    <ModuleWrapper
      as={Wrapper}
      title={title && <div className={clsx(styles.title, "h1")}>{title}</div>}
      {...restProps}
      css={css({
        "--box-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--box-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--box-font-size": "var(--text-module-boxed-font-size, 0.875rem)",
      })}
      styles={styles}
      className={clsx(className)}
    >
      <TextContent className={styles.content}>
        <HTML
          contentMedia={contentMedia}
          contentModularityModules={contentModularityModules}
        >
          {content}
        </HTML>
      </TextContent>
    </ModuleWrapper>
  );
}
