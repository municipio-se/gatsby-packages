import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { camelCase, upperFirst } from "lodash/fp";
import React from "react";

import getMostRelevantDate from "../../utils/getMostRelevantDate";
import ExpandableList from "../ExpandableList";

import * as postsModuleComponents from "./posts-modules";

function fromDisplayModeToComponentName(displayMode) {
  return displayMode && upperFirst(camelCase(displayMode)) + "PostsModule";
}

function normalizeItems({ modPostsDataSource, contentNodes }) {
  const { processContent, stripHTML } = useHTMLProcessor();
  switch (modPostsDataSource.postsDataSource) {
    case "input":
      return (modPostsDataSource.data || []).map(
        ({ postContentMedia, ...item }) => {
          let processedContent = processContent(item.postContent, {
            contentMedia: postContentMedia,
          });
          return {
            title: item.postTitle,
            contentType: { name: modPostsDataSource.postsDataSource },
            url: item.permalink,
            excerpt: stripHTML(item.postContent),
            content: processedContent,
            image: item.image && {
              ...item.image,
              alt: item.image.altText,
              src: item.image.src,
              aspectRatio: item.image.width / item.image.height,
            },
          };
        },
      );

    default: {
      let itemsArr = contentNodes?.nodes || [];
      let itemsToSlice =
        modPostsDataSource.postsCount >= 0
          ? modPostsDataSource.postsCount
          : itemsArr.length;

      let items = itemsArr
        .filter(Boolean)
        .slice(0, itemsToSlice)
        .map(({ contentMedia, ...item }) => {
          let processedContent = processContent(item.content, {
            contentMedia,
          });
          return {
            ...item,
            title: item.title,
            date:
              (item.archiveDatesGmt &&
                getMostRelevantDate(item.archiveDatesGmt)) ||
              item.dateGmt,
            url: item.uri,
            excerpt: item.description
              ? item.description
              : stripHTML(item.content),
            image: item.featuredImage &&
              item.featuredImage.node && {
                ...item.featuredImage.node,
                alt: item.featuredImage.node.altText,
                src: item.featuredImage.node.src,
                aspectRatio:
                  item.featuredImage.node.width /
                  item.featuredImage.node.height,
              },
            content: processedContent,
            element: "div",
          };
        });

      // if (dataSource.postsDataPostType !== null) {
      //   return sortModuleItemsByPostType(items, dataSource.postsDataPostType);
      // }

      return items;
    }
  }
}

export default function PostsModule({ module, ...restProps }) {
  const normalizedItems = normalizeItems(module);
  const {
    modPostsDataDisplay: { postsDisplayAs },
  } = module;
  let componentName = fromDisplayModeToComponentName(postsDisplayAs);
  let Component =
    // eslint-disable-next-line import/namespace
    (componentName && postsModuleComponents[componentName]) ||
    // eslint-disable-next-line import/namespace
    postsModuleComponents.DefaultPostsModule;
  return (
    <Component
      module={module}
      normalizedItems={normalizedItems}
      {...restProps}
    />
  );

  switch (postsDisplayAs) {
    case "index":
      return (
        <PostsModuleIndex
          title={title}
          dataSource={dataSource}
          items={normalizeItems({ dataSource, posts }).map((item) => {
            return {
              ...item,
              content: item.content,
            };
          })}
        />
      );
    case "expandable-list":
      return (
        <ExpandableList
          sectionHeader={{
            content: {
              title: title,
              withBorder: dataSource.archiveLink,
              link: dataSource.archiveLink
                ? {
                    url: dataSource.postsDataPostType.url,
                    text: dataSource.postsDataPostType.labels.allItems,
                  }
                : null,
            },
            noMarginBottom: !dataSource.archiveLink && true,
          }}
          items={normalizeItems({ dataSource, posts }).map((item) => ({
            ...item,
          }))}
        />
      );

    case "horizontal":
      return (
        <PostsModuleDefault
          title={title}
          dataSource={dataSource}
          items={normalizeItems({ dataSource, posts })}
          postsFields={postsFields}
          cardClassName={
            "c-card--horizontal" + (postsHighlight ? " c-card--highlight" : "")
          }
        />
      );

    default:
      return (
        <PostsModuleDefault
          title={title}
          dataSource={dataSource}
          items={normalizeItems({ dataSource, posts })}
          postsFields={postsFields}
          wrapperClassName="c-card-group--half"
        />
      );
  }
}
