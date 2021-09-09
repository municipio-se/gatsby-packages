import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { camelCase, upperFirst } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import useArchives from "../../hooks/useArchives";
import useTaxonomies from "../../hooks/useTaxonomies";
import getMostRelevantDate from "../../utils/getMostRelevantDate";

import * as postsModuleComponents from "./posts-modules";

PostsModule.propTypes = {
  module: PropTypes.shape({
    modPostsDataDisplay: PropTypes.shape({
      postsDisplayAs: PropTypes.string,
    }),
  }),
};

function fromDisplayModeToComponentName(displayMode) {
  return displayMode && upperFirst(camelCase(displayMode)) + "PostsModule";
}

function normalizeItems({ modPostsDataSource, contentNodes }) {
  if (!modPostsDataSource?.postsDataSource) {
    return [];
  }
  const { processContent, stripHTML } = useHTMLProcessor();
  switch (modPostsDataSource.postsDataSource) {
    case "input":
      return (modPostsDataSource.data || []).map(
        ({ postContentMedia, ...item }) => {
          let processedContent = processContent(item.postContent, {
            contentMedia: postContentMedia,
          });
          return {
            ...item,
            title: item.postTitle,
            url: item.permalink,
            excerpt: stripHTML(item.postContent),
            content: processedContent,
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
            image: item.featuredImage?.node,
            content: processedContent,
            element: "div",
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

export default function PostsModule({ module, ...restProps }) {
  const normalizedItems = normalizeItems(module);
  const archives = useArchives();
  const {
    modPostsDataDisplay: { postsDisplayAs } = {},
    modPostsDataSource: { postsDataPostType: postType } = {},
  } = module;

  module.archive = postType ? archives[postType.name] : {};

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
}
