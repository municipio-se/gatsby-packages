import clsx from "clsx";
import React from "react";

import ModuleWrapper from "../../ModuleWrapper";

import * as defaultStyles from "./ExpandableListPostsModule.module.css";

export default function ExpandableListPostsModule({
  styles = defaultStyles,
  className,
  title,
  // module,
  normalizedItems,
  ...restProps
}) {
  // const {
  //   modPostsDataDisplay: { postsFields },
  // } = module;
  // let showDate = postsFields?.includes("date");

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      {/* TODO: Replace with real accordion component */}
      {normalizedItems.map((item, index) => {
        return (
          <details key={index} className={clsx(styles.item)}>
            <summary className={clsx(styles.summary)}>{item.title}</summary>
            {item.content}
          </details>
        );
      })}
    </ModuleWrapper>
  );
}
