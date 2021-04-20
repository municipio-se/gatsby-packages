import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ContentNodeModularityAreas on WP_NodeWithModularity {
    contentArea: modularityArea(area: CONTENT_AREA) {
      ...WP_ModularityAreaModules
    }
  }
`;
