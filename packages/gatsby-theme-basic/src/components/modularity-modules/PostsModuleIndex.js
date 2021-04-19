import { Section } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import React from "react";

import CardIndex from "../CardIndex";
import CardList from "../CardList";
import SectionHeader from "../SectionHeader";

import * as defaultStyles from "./GalleryModule.module.css";

export default function PostsModuleIndex({
  styles = defaultStyles,
  className,
  title,
  dataSource,
  items,
  // ...restProps
}) {
  var itemsToSlice =
    dataSource.postsCount >= 0 ? dataSource.postsCount : items.length;
  const itemsCard = items.slice(0, 2);
  const itemsList = items.slice(2, itemsToSlice);

  const MaybeSection = title ? Section : React.Fragment;

  return (
    <>
      {title && (
        <SectionHeader
          title={title}
          withBorder={true}
          sectionHeader={
            dataSource.archiveLink && dataSource.postsDataPostType
              ? {
                  link: {
                    url: dataSource.postsDataPostType.url,
                    text: dataSource.postsDataPostType.labels.allItems,
                  },
                }
              : null
          }
        />
      )}
      <MaybeSection>
        <div className={clsx(styles.component, className)}>
          {itemsCard.map((item, index) => {
            switch (
              item.contentType &&
              item.contentType.node &&
              item.contentType.node.name
            ) {
              case "input":
                return (
                  <CardIndex
                    key={index}
                    title={item.title}
                    date={item.date}
                    content={item.content && item.content}
                    url={item.url}
                    image={item.image}
                  />
                );
              default:
                return (
                  <CardIndex
                    key={index}
                    title={item.title}
                    date={item.date}
                    excerpt={item.excerpt}
                    url={item.url}
                    image={item.image}
                  />
                );
            }
          })}
          {itemsList && (
            <div>
              {itemsList.map((item, index) => {
                switch (
                  item.contentType &&
                  item.contentType.node &&
                  item.contentType.node.name
                ) {
                  case "input":
                    return (
                      <CardList
                        key={index}
                        title={item.title}
                        excerpt={item.excerpt}
                        url={item.url}
                      />
                    );
                  default:
                    return (
                      <CardList
                        key={index}
                        title={item.title}
                        date={item.date}
                        url={item.url}
                      />
                    );
                }
              })}
            </div>
          )}
        </div>
      </MaybeSection>
    </>
  );
}
