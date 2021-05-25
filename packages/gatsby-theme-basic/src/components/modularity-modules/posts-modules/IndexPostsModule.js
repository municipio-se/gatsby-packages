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
  let showImage = postsFields?.includes("image");

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <Grid className={clsx(styles.list)}>
        {normalizedItems.map((item, index) => {
          return (
            <Item
              key={index}
              className={clsx(styles.item)}
              url={item.url}
              title={item.title}
              date={!!showDate && item.dateGmt}
              image={!!showImage && item.image}
            />
          );
        })}
      </Grid>
    </ModuleWrapper>
  );
}
