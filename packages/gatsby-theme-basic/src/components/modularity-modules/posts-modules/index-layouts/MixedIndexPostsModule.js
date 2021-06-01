import clsx from "clsx";
import { difference } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import * as teaserStyles from "../../../CompactTeaser.module.css";
import Grid from "../../../Grid";
import ModuleWrapper from "../../../ModuleWrapper";
import RuledList from "../../../RuledList";
import * as defaultStyles from "../IndexPostsModule.module.css";
import IndexPostsModuleCard from "../IndexPostsModuleCard";
import ListPostsModuleItem from "../ListPostsModuleItem";

import * as listStyles from "./List.module.css";

MixedIndexPostsModule.propTypes = {
  className: PropTypes.string,
  module: PropTypes.object,
  normalizedItems: PropTypes.arrayOf(PropTypes.object),
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string,
};

export default function MixedIndexPostsModule({
  className,
  module,
  normalizedItems,
  styles = defaultStyles,
  title,
  ...restProps
}) {
  const {
    modPostsDataDisplay: { postsFields },
  } = module;

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <Grid className={clsx(styles.list)}>
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
                <IndexPostsModuleCard
                  key={index}
                  className={clsx(styles.item)}
                  item={item}
                  visibleFields={postsFields || []}
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
