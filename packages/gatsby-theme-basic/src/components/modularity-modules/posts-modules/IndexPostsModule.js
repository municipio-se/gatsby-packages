import {
  Link,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import React from "react";

import Grid from "../../Grid";
import ModuleWrapper from "../../ModuleWrapper";

import * as defaultStyles from "./IndexPostsModule.module.css";

export default function IndexPostsModule({
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
  let showDate = postsFields?.includes("date");

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <Grid className={clsx(styles.list)}>
        {normalizedItems.map((item, index) => {
          return (
            // TODO: Add <Card>
            <div key={index} className={clsx(styles.item)}>
              <Link to={item.url} className={clsx(styles.link)}>
                <span>{item.title}</span>
              </Link>{" "}
              {!!showDate && (
                <Time
                  date={item.dateGmt}
                  format={{ year: "numeric", month: "numeric", day: "numeric" }}
                />
              )}
            </div>
          );
        })}
      </Grid>
    </ModuleWrapper>
  );
}