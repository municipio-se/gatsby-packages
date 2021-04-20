import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ContentNodeForModPosts on WP_ContentNode {
    id
    databaseId
    uri
    dateGmt
    contentType {
      node {
        name
      }
    }
    ... on WP_NodeWithTitle {
      title
    }
    ... on WP_NodeWithContentEditor {
      content
    }
    # ... on WP_Page {
    #   ...WP_PageForModPosts
    # }
    # ... on WP_Post {
    #   ...WP_PostForModPosts
    # }
    ... on WP_NodeWithFeaturedImage {
      featuredImage {
        node {
          ...WP_ImageMedium
        }
      }
    }
    # ... on WP_NodeWithPageAttributes {
    #   menuOrder
    # }
  }
`;
