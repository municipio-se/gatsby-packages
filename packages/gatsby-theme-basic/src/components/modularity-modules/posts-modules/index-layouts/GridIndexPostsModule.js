import clsx from "clsx";
import React from "react";

import Grid from "../../../Grid";
import ModuleWrapper from "../../../ModuleWrapper";
import * as defaultStyles from "../IndexPostsModule.module.css";
import IndexPostsModuleCard from "../IndexPostsModuleCard";

export default function GridIndexPostsModule({
  styles = defaultStyles,
  className,
  title,
  module,
  normalizedItems,
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
