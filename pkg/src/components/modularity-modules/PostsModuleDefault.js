import { Section } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import React from "react";

import Card from "../Card";
import SectionHeader from "../SectionHeader";

import * as defaultStyles from "./GalleryModule.module.css";

export default function PostsModuleDefault({
  styles = defaultStyles,
  className,
  title,
  dataSource,
  postsFields,
  items,
  // ...restProps
}) {
  const MaybeSection = title ? Section : React.Fragment;

  return (
    <>
      {title && (
        <SectionHeader
          title={title}
          withBorder={dataSource.archiveLink}
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
          noMarginBottom={!dataSource.archiveLink && true}
        />
      )}
      <MaybeSection>
        <div className={clsx(styles.component, className)}>
          {items.map((item, index) => {
            return (
              <Card
                key={index}
                title={postsFields.includes("title") && item.title}
                date={postsFields.includes("date") && item.date}
                excerpt={
                  postsFields.includes("excerpt") &&
                  dataSource.postsDataSource !== "input" &&
                  item.excerpt
                }
                content={dataSource.postsDataSource === "input" && item.content}
                element={item.element}
                url={item.url}
                image={postsFields.includes("image") && item.image}
              />
            );
          })}
        </div>
      </MaybeSection>
    </>
  );
}
