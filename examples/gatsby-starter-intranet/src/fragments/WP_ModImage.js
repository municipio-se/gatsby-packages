import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ModImage on WP_ModImage {
    id
    title
    hideTitle
    contentType {
      node {
        name
      }
    }
    modImageOptions {
      modImageLink
      modImageLinkUrl
      modImageCaption
      modImageImage {
        ...WP_ImageLarge
      }
    }
  }
`;
