import clsx from "clsx";
import React from "react";

import Card from "../../Card";
import Grid from "../../Grid";
import ModuleWrapper from "../../ModuleWrapper";

import * as defaultStyles from "./NewsPostsModule.module.css";

function DefaultSecondaryItem({ url, title, date }) {
  return <div>{title}</div>;
}

export default function NewsPostsModule({
  styles = defaultStyles,
  className,
  components: { PrimaryItem = Card, SecondaryItem = DefaultSecondaryItem } = {
    PrimaryItem: Card,
    SecondaryItem: DefaultSecondaryItem,
  },
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
        {({ columns = [] }) => {
          let primaryItemCount = Math.max(1, columns.length - 1);
          let primaryItems = normalizedItems.slice(0, primaryItemCount);
          let secondaryItems = normalizedItems.slice(primaryItemCount);
          return [
            ...primaryItems.map((item, index) => {
              return (
                <PrimaryItem
                  key={index}
                  className={clsx(styles.item)}
                  url={item.url}
                  title={item.title}
                  date={!!showDate && item.dateGmt}
                  image={!!showImage && item.image}
                />
              );
            }),
            secondaryItems.length > 0 && (
              <ul key="rest">
                {secondaryItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <SecondaryItem
                        className={clsx(styles.item)}
                        url={item.url}
                        title={item.title}
                        date={!!showDate && item.dateGmt}
                      />
                    </li>
                  );
                })}
              </ul>
            ),
          ];
        }}
      </Grid>
    </ModuleWrapper>
  );
}
