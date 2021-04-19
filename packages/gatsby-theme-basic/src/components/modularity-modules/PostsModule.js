import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import React from "react";

// import { sortModuleItemsByPostType } from "../../utils/sort";
import ExpandableList from "../ExpandableList";
// import { fallbackImage } from "../hooks/image-settings";

import PostsModuleDefault from "./PostsModuleDefault";
import PostsModuleIndex from "./PostsModuleIndex";

function normalizeItems({ dataSource, posts }) {
  const { processPageContent, stripHTML } = useHTMLProcessor();
  switch (dataSource.postsDataSource) {
    case "input":
      return (dataSource.data || []).map(({ postContentMedia, ...item }) => {
        let { content: processedContent } = processPageContent(
          item.postContent,
          { postContentMedia },
        );
        return {
          title: item.postTitle,
          contentType: { name: dataSource.postsDataSource },
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
      });
    default: {
      let itemsArr = (posts && posts.nodes) || [];
      let itemsToSlice =
        dataSource.postsCount >= 0 ? dataSource.postsCount : itemsArr.length;

      let items = itemsArr
        .filter(Boolean)
        .slice(0, itemsToSlice)
        .map(({ contentMedia, ...item }) => {
          let { content: processedContent } = processPageContent(item.content, {
            contentMedia,
          });
          return {
            ...item,
            title: item.title,
            date: item.date,
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

export default function PostsModule({
  title,
  dataDisplay: { postsDisplayAs, postsFields, postsHighlight },
  dataSource,
  posts,
  // ...restProps
}) {
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
