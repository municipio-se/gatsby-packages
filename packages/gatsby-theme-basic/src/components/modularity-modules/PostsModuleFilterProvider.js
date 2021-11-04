import { withComponentDefaults } from "@whitespace/components";
import {
  LazyMinisearchSearchBackendProvider,
  StateSearchParamsProvider,
} from "@whitespace/gatsby-plugin-search";
import { sortBy } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

import { useModularityModule } from "../../hooks";

PostsModuleFilterProvider.propTypes = {
  attributesForFaceting: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  paramTypes: PropTypes.any,
};

function fromFacetsToOptions(
  counts,
  {
    showCounts,
    sortBy: sortByIteratee = ({ count }) => -count,
    label = (value) => value,
    anyLabel = () => "Any",
  } = {},
) {
  return [
    {
      value: "",
      label: showCounts
        ? `${anyLabel()} (${Object.values(counts).reduce(
            (sum, count) => sum + count,
            0,
          )})`
        : anyLabel(),
    },
    ...sortBy(
      Object.entries(counts).map(([value, count]) => ({
        value,
        label: showCounts ? `${label(value)} (${count})` : label(value),
        count,
      })),
      sortByIteratee,
    ),
  ];
}

export default withComponentDefaults(
  PostsModuleFilterProvider,
  "postsModuleFilterProvider",
);

function PostsModuleFilterProvider({
  attributesForFaceting = ["tags"],
  children,
  paramTypes = {
    tags: {
      type: "string",
      multi: true,
      control: "select",
      options: ({ facets }) =>
        facets?.tags &&
        fromFacetsToOptions(facets?.tags, {
          showCounts: false,
        }),
      // conditions: { contentType: (value) => value === "post" },
    },
  },
}) {
  let { module } = useModularityModule();

  return (
    <StateSearchParamsProvider
      paramTypes={paramTypes}
      forcedParams={{
        contentType: module.modPostsDataSource.postsDataPostType.name,
        sort: "date:desc",
        hitsPerPage: module.modPostsDataSource.postsCount,
      }}
    >
      {(paramsContext) => (
        <LazyMinisearchSearchBackendProvider
          preload={true}
          settings={{
            attributesForFaceting,
          }}
        >
          {(backendContext) =>
            typeof children === "function"
              ? children({ ...paramsContext, ...backendContext })
              : children
          }
        </LazyMinisearchSearchBackendProvider>
      )}
    </StateSearchParamsProvider>
  );
}
