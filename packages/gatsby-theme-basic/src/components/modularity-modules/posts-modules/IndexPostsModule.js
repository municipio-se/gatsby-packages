import {
  Link,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import React from "react";

import Card from "../../Card";
import Grid from "../../Grid";
import ModuleWrapper from "../../ModuleWrapper";

import * as defaultStyles from "./IndexPostsModule.module.css";

export default function IndexPostsModule({
  styles = defaultStyles,
  className,
  components: { Item = Card } = { Item: Card },
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
            <Item
              key={index}
              className={clsx(styles.item)}
              url={item.url}
              title={item.title}
              date={!!showDate && item.dateGmt}
            />
          );
        })}
      </Grid>
    </ModuleWrapper>
  );
}
