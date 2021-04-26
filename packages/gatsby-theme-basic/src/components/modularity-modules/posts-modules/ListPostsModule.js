import {
  Link,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import React from "react";

import ModuleWrapper from "../../ModuleWrapper";

import * as defaultStyles from "./ListPostsModule.module.css";

export default function ListPostsModule({
  styles = defaultStyles,
  className,
  title,
  module,
  normalizedItems,
  ...restProps
}) {
  const {
    dataDisplay: { postsFields },
  } = module;
  let showDate = postsFields?.includes("date");
  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <ul className={clsx(styles.list)}>
        {normalizedItems.map((item, index) => {
          return (
            <li key={index} className={clsx(styles.item)}>
              <Link to={item.url} className={clsx(styles.link)}>
                <span>{item.title}</span>
              </Link>{" "}
              {!!showDate && (
                <Time
                  date={item.dateGmt}
                  format={{ year: "numeric", month: "numeric", day: "numeric" }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </ModuleWrapper>
  );
}
