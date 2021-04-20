import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ModPosts on WP_ModPosts {
    id
    title
    hideTitle
    contentType {
      node {
        name
      }
    }
    dataDisplay {
      postsDisplayAs
      postsFields
      postsHighlight
    }
    dataSource {
      postsDataSource
      postsCount
      archiveLink
      data {
        postTitle
        permalink
        postContent
        image {
          ...WP_ImageForCard
        }
        postContentMedia {
          ...WP_ImageForCard
        }
      }
      postsDataPostType {
        name
        hasArchive
        labels {
          allItems
          archives
          menuName
          name
          singularName
        }
      }
    }
    posts(first: 50) {
      nodes {
        ...WP_ContentNodeForModPosts
      }
    }
  }
`;
