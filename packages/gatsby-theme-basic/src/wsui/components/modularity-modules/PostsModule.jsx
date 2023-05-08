import { HTML } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { PostsModule as WsuiPostsModule } from "@wsui/municipio";
import React from "react";

// import PostsModuleFilterProvider from "../../../components/modularity-modules/PostsModuleFilterProvider";
import useTaxonomies from "../../../hooks/useTaxonomies";
import getMostRelevantDate from "../../../utils/getMostRelevantDate";
import ModuleWrapper from "../ModuleWrapper.jsx";

const excerpted = (text) => {
  return text.length > 153 ? text.slice(0, 150) + "…" : text;
};

function defaultNormalizePostsModuleItems(
  { modPostsDataSource, contentNodes },
  { HTML, stripHTML } = {},
) {
  if (!modPostsDataSource?.postsDataSource) {
    return [];
  }

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
            link: item?.link,
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
          let processedContent = (
            <HTML contentMedia={contentMedia}>{item.content}</HTML>
          );

          let excerpt = excerpted(stripHTML(item.content));
          const splitContent = item.content?.split("<!--more-->");
          if (splitContent?.[1]) {
            // Use everything above Read more tag as excerpt/preamble
            excerpt = stripHTML(splitContent[0]);
          }

          return {
            ...item,
            contentType: item.contentType?.node?.name,
            title: item.title,
            dateGmt: item.dateGmt,
            date:
              (item.archiveDatesGmt &&
                getMostRelevantDate(item.archiveDatesGmt)) ||
              item.dateGmt,
            url: item.uri,
            excerpt: item.description ? item.description : excerpt,
            image: item.featuredImage?.node,
            content: processedContent,
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

// const normalizeHit =
//   ({ HTML, stripHTML }) =>
//   (item) => {
//     return {
//       ...item,
//       title: item.label,
//       excerpt: item.text,
//       content: item.text,
//     };
//   };

export default function PostsModule({
  title,
  module = {},
  normalizePostsModuleItems = defaultNormalizePostsModuleItems,
  ...restProps
}) {
  // let isFilteringEnabled =
  //   !!module?.modPostsDataFiltering?.frontEndTaxFiltering &&
  //   module?.modPostsDataSource?.postsDataSource === "posttype";
  let displayMode = module?.modPostsDataDisplay?.postsDisplayAs;

  let visibleFields =
    module?.modPostsDataSource.postsDataSource !== "input" &&
    module?.modPostsDataDisplay?.postsFields
      ? ["title", ...module.modPostsDataDisplay.postsFields]
      : ["image", "title", "excerpt"];

  const { stripHTML } = useHTMLProcessor();

  const items = normalizePostsModuleItems(module, {
    HTML,
    stripHTML,
  });

  // if (isFilteringEnabled) {
  //   return (
  //     <PostsModuleFilterProvider>
  //       {({ hits }) => (
  //         <WsuiPostsModule
  //           items={(hits || []).map(normalizeHit({ HTML, stripHTML }))}
  //           {...restProps}
  //         />
  //       )}
  //     </PostsModuleFilterProvider>
  //   );
  // }

  return (
    <ModuleWrapper title={title} {...restProps}>
      <WsuiPostsModule
        items={items}
        visibleFields={visibleFields}
        displayMode={displayMode}
      />
    </ModuleWrapper>
  );
}
