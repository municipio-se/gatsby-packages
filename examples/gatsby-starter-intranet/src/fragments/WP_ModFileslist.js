import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ModFileslist on WP_ModFileslist {
    id
    title
    hideTitle
    contentType {
      node {
        name
      }
    }
    files {
      fileList {
        file {
          title
          fileSize
          mediaDetails {
            sizes {
              height
              name
              width
              sourceUrl
            }
            file
          }
          mimeType
          altText
          mediaItemUrl
        }
      }
    }
  }
`;
