import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ModularityAreaModules on WP_NodeModularityArea {
    modules {
      columnWidth
      hidden
      key
      node {
        # ... on WP_ModContacts {
        #   ...WP_ModContacts
        # }
        # ... on WP_ModFileslist {
        #   ...WP_ModFileslist
        # }
        # ... on WP_ModGallery {
        #   ...WP_ModGallery
        # }
        # ... on WP_ModImage {
        #   ...WP_ModImage
        # }
        # ... on WP_ModNotice {
        #   ...WP_ModNotice
        # }
        # ... on WP_ModPosts {
        #   ...WP_ModPosts
        # }
        ... on WP_ModText {
          ...WP_ModText
        }
        # ... on WP_ModTable {
        #   ...WP_ModTable
        # }
      }
    }
  }
`;
