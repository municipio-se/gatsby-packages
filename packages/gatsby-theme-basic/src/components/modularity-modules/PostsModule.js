import { HTML } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { camelCase, upperFirst } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import normalizePostsModuleItems from "../../utils/normalizePostsModuleItems";
import visibleFields from "../../utils/visibleFields";

import * as postsModuleComponents from "./posts-modules";
import PostsModuleFilterProvider from "./PostsModuleFilterProvider";

const normalizeHit =
  ({ module, HTML, stripHTML }) =>
  (item) => {
    // let processedContent = processContent(item.content);
    const { showDate, showImage, showExcerpt } = visibleFields(
      module?.modPostsDataDisplay?.postsFields,
    );
    return {
      ...item,
      date: showDate && item.date,
      title: item.label,
      excerpt: showExcerpt && item.text,
      image: showImage && item?.image,
      content: showExcerpt && item.text,
      // taxonomies: useTaxonomies(
      //   { ...item.tags?.nodes, ...item.categories?.nodes },
      //   item.contentType?.node?.name,
      // ),
    };
  };

PostsModule.propTypes = {
  module: PropTypes.shape({
    modPostsDataSource: PropTypes.shape({
      postsDataSource: PropTypes.string,
    }),
    modPostsDataDisplay: PropTypes.shape({
      postsDisplayAs: PropTypes.string,
    }),
    modPostsDataFiltering: PropTypes.shape({
      frontEndTaxFiltering: PropTypes.bool,
    }),
  }),
};

function fromDisplayModeToComponentName(displayMode) {
  return displayMode && upperFirst(camelCase(displayMode)) + "PostsModule";
}

export default function PostsModule({ module, ...restProps }) {
  let displayMode = module?.modPostsDataDisplay?.postsDisplayAs;
  let isFilteringEnabled =
    !!module?.modPostsDataFiltering?.frontEndTaxFiltering &&
    module?.modPostsDataSource?.postsDataSource === "posttype";

  const { stripHTML } = useHTMLProcessor();
  let componentName = fromDisplayModeToComponentName(displayMode);
  let Component =
    // eslint-disable-next-line import/namespace
    (componentName && postsModuleComponents[componentName]) ||
    // eslint-disable-next-line import/namespace
    postsModuleComponents.DefaultPostsModule;

  if (isFilteringEnabled) {
    return (
      <PostsModuleFilterProvider>
        {({ hits }) => (
          <Component
            module={module}
            normalizedItems={(hits || []).map(
              normalizeHit({ module, HTML, stripHTML }),
            )}
            {...restProps}
          />
        )}
      </PostsModuleFilterProvider>
    );
  }

  return (
    <Component
      module={module}
      normalizedItems={normalizePostsModuleItems(module, {
        HTML,
        stripHTML,
      })}
      {...restProps}
    />
  );
}
