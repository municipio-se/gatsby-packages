import { css } from "@emotion/react";
import TextContent from "@whitespace/gatsby-theme-wordpress-basic/src/components/TextContent";
import clsx from "clsx";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import * as focusWithinStyles from "../../../utils/focusWithin.module.css";
import ModuleWrapper from "../../ModuleWrapper";
import RuledList from "../../RuledList";

import * as defaultStyles from "./ExpandableListPostsModule.module.css";

ExpandableListPostsModule.propTypes = {
  className: PropTypes.string,
  module: PropTypes.shape({
    modPostsDataDisplay: PropTypes.shape({ theme: PropTypes.string }),
  }),
  normalizedItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
    }),
  ),
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
};

export default function ExpandableListPostsModule({
  className,
  module,
  normalizedItems,
  styles = defaultStyles,
  title,
  ...restProps
}) {
  const {
    modPostsDataDisplay: { theme },
  } = module;
  // let showDate = postsFields?.includes("date");

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, theme, className)}
      css={css({
        "--list-rule-color": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--module-wrapper-title-rule-color": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
      })}
    >
      {/* TODO: Replace with real accordion component */}
      <RuledList gap={`2rem`} ruleTop={!title} ruleBottom>
        {normalizedItems.map((item, index) => {
          return (
            <details
              key={index}
              className={clsx(
                styles.item,
                focusWithinStyles.component,
                focusWithinStyles.outset,
              )}
            >
              <summary className={clsx(styles.summary)}>{item.title}</summary>
              <TextContent className={styles.content}>
                {item.content}
              </TextContent>
            </details>
          );
        })}
      </RuledList>
    </ModuleWrapper>
  );
}
