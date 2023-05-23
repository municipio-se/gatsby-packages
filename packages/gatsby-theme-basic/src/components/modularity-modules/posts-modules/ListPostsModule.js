import { css } from "@emotion/react";
import { Html } from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import { TypographyBlock } from "@wsui/base";
import clsx from "clsx";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import ModuleWrapper from "../../ModuleWrapper";
import RuledList from "../../RuledList";

import * as defaultStyles from "./ListPostsModule.module.css";
import ListPostsModuleItem from "./ListPostsModuleItem";

ListPostsModule.propTypes = {
  className: PropTypes.string,
  module: PropTypes.shape({
    modPostsDataDisplay: PropTypes.shape({
      postsFields: PropTypes.arrayOf(PropTypes.string),
      theme: PropTypes.string,
    }),
    modDescription: PropTypes.shape({
      description: PropTypes.string,
    }),
  }),
  normalizedItems: PropTypes.arrayOf(PropTypes.object),
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
};

export default function ListPostsModule({
  styles = defaultStyles,
  className,
  // comnponents: { ItemLink = Button } = { ItemLink: Button },
  title,
  module,
  normalizedItems,
  ...restProps
}) {
  const {
    modPostsDataDisplay: { theme },
    modDescription: { description },
  } = module;
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
      {description && (
        <TypographyBlock>
          <Html>{description}</Html>
        </TypographyBlock>
      )}
      <RuledList className={clsx(styles.list)} ruleTop={!title} ruleBottom>
        {normalizedItems.map((item, index) => {
          return (
            <ListPostsModuleItem
              item={item}
              className={clsx(styles.item)}
              key={index}
            />
          );
        })}
      </RuledList>
    </ModuleWrapper>
  );
}
