import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ModText on WP_ModText {
    id
    title
    hideTitle
    contentType {
      node {
        name
      }
    }
    content
    contentMedia {
      ...WP_ImageMedium
    }
    # textOptions {
    #   fontSize
    #   hideBoxFrame
    # }
  }
`;
