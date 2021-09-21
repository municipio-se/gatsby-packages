import { css } from "@emotion/react";
import clsx from "clsx";
import { kebabCase } from "lodash";
import { difference } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import * as teaserStyles from "../../../CompactTeaser.module.css";
import Grid from "../../../Grid";
import ModuleWrapper from "../../../ModuleWrapper";
import PostsModuleHeader from "../../../PostsModuleHeader";
import RuledList from "../../../RuledList";
import ListPostsModuleItem from "../ListPostsModuleItem";

import * as defaultStyles from "./PostsModuleMixedLayout.module.css";

PostsModuleMixedLayout.propTypes = {
  className: PropTypes.string,
  itemComponent: PropTypes.elementType.isRequired,
  module: PropTypes.shape({
    modPostsDataDisplay: PropTypes.shape({
      postsFields: PropTypes.arrayOf(PropTypes.string),
      theme: PropTypes.string,
    }),
  }),
  normalizedItems: PropTypes.arrayOf(PropTypes.object),
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string,
};

export default function PostsModuleMixedLayout({
  className,
  itemComponent: PrimaryItem,
  module,
  normalizedItems,
  styles = defaultStyles,
  title,
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
      components={{
        ModuleWrapperHeader: PostsModuleHeader,
      }}
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
        "--list-rule-color": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--module-wrapper-title-rule-color": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
      })}
    >
      <Grid
        className={clsx(styles.list)}
        columnMinWidth={normalizedItems.length === 1 && "100%"}
      >
        {({ columns = [] }) => {
          let primaryItemCount =
            normalizedItems.length > columns.length
              ? Math.max(1, columns.length - 1)
              : normalizedItems.length;
          let primaryItems = normalizedItems.slice(0, primaryItemCount);
          let secondaryItems = normalizedItems.slice(primaryItemCount);
          return [
            ...primaryItems.map((item, index) => {
              return (
                <PrimaryItem
                  key={index}
                  className={clsx(styles.item)}
                  item={item}
                  visibleFields={postsFields || []}
                  horizontal={normalizedItems.length === 1}
                />
              );
            }),
            secondaryItems.length > 0 && (
              <RuledList className={clsx(styles.secondaryList)} key="secondary">
                {secondaryItems.map((item, index) => {
                  return (
                    <ListPostsModuleItem
                      teaserStyles={teaserStyles}
                      item={item}
                      visibleFields={difference(postsFields || [], [
                        "image",
                        "excerpt",
                      ])}
                      className={clsx(styles.secondaryItem)}
                      key={index}
                    />
                  );
                })}
              </RuledList>
            ),
          ];
        }}
      </Grid>
    </ModuleWrapper>
  );
}
