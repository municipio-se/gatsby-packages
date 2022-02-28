import { css } from "@emotion/react";
import { useSearch } from "@whitespace/gatsby-plugin-search/src/hooks";
import clsx from "clsx";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Grid from "../../../Grid";
import ModuleWrapper from "../../../ModuleWrapper";
import PostsModuleHeader from "../../../PostsModuleHeader";
import PostsModuleFilterForm from "../../PostsModuleFilterForm";

import * as defaultStyles from "./PostsModuleGridLayout.module.css";

PostsModuleGridLayout.propTypes = {
  className: PropTypes.string,
  itemComponent: PropTypes.elementType.isRequired,
  module: PropTypes.shape({
    modPostsDataDisplay: PropTypes.shape({
      postsFields: PropTypes.arrayOf(PropTypes.string),
      theme: PropTypes.string,
    }),
    modPostsDataSource: {
      archiveLink: PropTypes.bool,
      postsDataPostType: PropTypes.shape({
        hasArchive: PropTypes.bool,
        uri: PropTypes.string,
        labels: PropTypes.shape({
          allItems: PropTypes.string,
          menuName: PropTypes.string,
        }),
      }),
    },
  }).isRequired,
  normalizedItems: PropTypes.arrayOf(PropTypes.object),
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
};

export default function PostsModuleGridLayout({
  styles = defaultStyles,
  className,
  itemComponent: Item,
  title,
  module,
  normalizedItems,
  ...restProps
}) {
  const {
    modPostsDataDisplay: { theme },
  } = module;

  const { schema } = useSearch();

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, theme, className)}
      css={css({
        "--card-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--card-hover-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--card-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--card-hover-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--card-meta-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--module-wrapper-title-rule-color": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
      })}
      components={{
        ModuleWrapperHeader: PostsModuleHeader,
      }}
    >
      <PostsModuleFilterForm className={clsx(styles.filterForm)} />
      <Grid className={clsx(styles.list)} autoFit={!schema}>
        {normalizedItems.map((item, index) => {
          return <Item key={index} className={clsx(styles.item)} item={item} />;
        })}
      </Grid>
    </ModuleWrapper>
  );
}
