import { css } from "@emotion/react";
import clsx from "clsx";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Grid from "../../../Grid";
import ModuleWrapper from "../../../ModuleWrapper";
import * as defaultStyles from "../IndexPostsModule.module.css";
import IndexPostsModuleCard from "../IndexPostsModuleCard";

GridIndexPostsModule.propTypes = {
  className: PropTypes.string,
  module: PropTypes.shape({
    modPostsDataDisplay: PropTypes.shape({
      postsFields: PropTypes.arrayOf(PropTypes.string),
      theme: PropTypes.string,
    }),
  }),
  normalizedItems: PropTypes.arrayOf(PropTypes.object),
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
};

export default function GridIndexPostsModule({
  styles = defaultStyles,
  className,
  title,
  module,
  normalizedItems,
  ...restProps
}) {
  const {
    modPostsDataDisplay: { postsFields, theme },
  } = module;

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, theme, className)}
      css={css({
        "--card-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--card-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--card-meta-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
      })}
    >
      <Grid className={clsx(styles.list)}>
        {normalizedItems.map((item, index) => {
          return (
            <IndexPostsModuleCard
              key={index}
              className={clsx(styles.item)}
              item={item}
              visibleFields={postsFields || []}
            />
          );
        })}
      </Grid>
    </ModuleWrapper>
  );
}
