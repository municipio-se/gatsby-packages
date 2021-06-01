import TextContent from "@whitespace/gatsby-theme-wordpress-basic/src/components/TextContent";
import clsx from "clsx";
import React from "react";

import * as focusWithinStyles from "../../../utils/focusWithin.module.css";
import ModuleWrapper from "../../ModuleWrapper";
import RuledList from "../../RuledList";

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
      <RuledList gap={`2rem`} ruleTop ruleBottom>
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
