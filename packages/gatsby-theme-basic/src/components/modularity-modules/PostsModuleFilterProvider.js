import { withComponentDefaults } from "@whitespace/components";
import {
  LazyMinisearchSearchBackendProvider,
  StateSearchParamsProvider,
} from "@whitespace/gatsby-plugin-search";
import { getOptionsFromTaxonomy } from "@whitespace/gatsby-theme-wordpress-basic/src/utils";
import PropTypes from "prop-types";
import React from "react";

import { useModularityModule } from "../../hooks";

PostsModuleFilterProvider.propTypes = {
  attributesForFaceting: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  paramTypes: PropTypes.any,
};

export default withComponentDefaults(
  PostsModuleFilterProvider,
  "postsModuleFilterProvider",
);

function PostsModuleFilterProvider({
  attributesForFaceting = ["tags"],
  children,
  paramTypes = {
    contentType: {
      type: "string",
      multi: false,
    },
    tags: {
      type: "string",
      multi: true,
      control: "select",
      options: getOptionsFromTaxonomy("tag"),
      conditions: { contentType: (value) => value === "post" },
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
