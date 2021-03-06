import { withComponentDefaults } from "@whitespace/components";
import { StateSearchParamsProvider } from "@whitespace/gatsby-plugin-search";
import DefaultSearchBackendProvider from "@whitespace/gatsby-theme-wordpress-basic/src/components/DefaultSearchBackendProvider";
import { getOptionsFromTaxonomy } from "@whitespace/gatsby-theme-wordpress-basic/src/utils";
import PropTypes from "prop-types";
import React from "react";

import { useModularityModule } from "../../hooks";

PostsModuleFilterProvider.propTypes = {
  attributesForFaceting: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  components: PropTypes.objectOf(PropTypes.elementType),
  paramTypes: PropTypes.any,
  transformParams: PropTypes.func,
};

export default withComponentDefaults(
  PostsModuleFilterProvider,
  "postsModuleFilterProvider",
);

function PostsModuleFilterProvider({
  children,
  components: { SearchBackendProvider = DefaultSearchBackendProvider } = {
    SearchBackendProvider: DefaultSearchBackendProvider,
  },
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
  transformParams = (params) => params,
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
        <SearchBackendProvider transformParams={transformParams}>
          {(backendContext) =>
            typeof children === "function"
              ? children({ ...paramsContext, ...backendContext })
              : children
          }
        </SearchBackendProvider>
      )}
    </StateSearchParamsProvider>
  );
}
