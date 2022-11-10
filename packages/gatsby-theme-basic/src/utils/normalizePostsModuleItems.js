import React from "react";

import useTaxonomies from "../hooks/useTaxonomies";

import getMostRelevantDate from "./getMostRelevantDate";

function visibleFields(item) {
  return {
    showDate: item?.includes("date"),
    showImage: item?.includes("image"),
    showExcerpt: item?.includes("excerpt"),
  };
}

export default function normalizePostsModuleItems(
  { modPostsDataSource, contentNodes, modPostsDataDisplay },
  { HTML, stripHTML } = {},
) {
  if (!modPostsDataSource?.postsDataSource) {
    return [];
  }
  const { showDate, showImage, showExcerpt } = visibleFields(
    modPostsDataDisplay.postsFields,
  );
  switch (modPostsDataSource.postsDataSource) {
    case "input":
      return (modPostsDataSource.data || []).map(
        ({ postContentMedia, postContentModularityModules, ...item }) => {
          let processedContent = (
            <HTML
              contentMedia={postContentMedia}
              contentModularityModules={postContentModularityModules?.nodes}
            >
              {item.postContent}
            </HTML>
          );
          return {
            ...item,
            title: item.postTitle,
            url: item.link?.url || item.permalink,
            excerpt: showExcerpt && stripHTML(item.postContent),
            content: showExcerpt && processedContent,
            showAll: true,
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
          let processedContent = (
            <HTML contentMedia={contentMedia}>{item.content}</HTML>
          );

          return {
            ...item,
            contentType: item.contentType?.node?.name,
            title: item.title,
            dateGmt: showDate && item.dateGmt,
            date:
              showDate &&
              ((item.archiveDatesGmt &&
                getMostRelevantDate(item.archiveDatesGmt)) ||
                item.dateGmt),
            url: item.uri,
            excerpt:
              showExcerpt &&
              (item.description ? item.description : stripHTML(item.content)),
            image: showImage && item.featuredImage?.node,
            content: showExcerpt && processedContent,
            taxonomies: useTaxonomies(
              { ...item.tags?.nodes, ...item.categories?.nodes },
              item.contentType?.node?.name,
            ),
          };
        });

      return items;
    }
  }
}
