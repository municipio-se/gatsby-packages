import clsx from "clsx";
import React from "react";

import ModuleWrapper from "../../ModuleWrapper";
import RuledList from "../../RuledList";

import * as defaultStyles from "./ListPostsModule.module.css";
import ListPostsModuleItem from "./ListPostsModuleItem";

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
    modPostsDataDisplay: { postsFields, theme },
  } = module;
  // let showDate = postsFields?.includes("date");
  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, theme, className)}
    >
      <RuledList className={clsx(styles.list)} ruleTop ruleBottom>
        {normalizedItems.map((item, index) => {
          return (
            <ListPostsModuleItem
              item={item}
              visibleFields={postsFields || []}
              className={clsx(styles.item)}
              key={index}
            />
          );
        })}
      </RuledList>
    </ModuleWrapper>
  );
}
