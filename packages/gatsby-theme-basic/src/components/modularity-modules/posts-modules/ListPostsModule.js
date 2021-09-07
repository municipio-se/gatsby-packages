import clsx from "clsx";
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
    modPostsDataDisplay: { postsFields, theme },
  } = module;
  // let showDate = postsFields?.includes("date");
  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, theme, className)}
    >
      <RuledList className={clsx(styles.list)} ruleTop={!title} ruleBottom>
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
