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
    image {
      modImageLink
      modImageLinkUrl
      modImageCaption
      modImageImage {
        base64: base64Uri
        src: sourceUrl(size: LARGE)
        srcSet: srcSet(size: LARGE)
        srcWebp: sourceUrl(size: LARGE)
        srcSetWebp: srcSet(size: LARGE)
        title
        caption
        # photograph {
        #   name
        # }
        altText
        mediaDetails {
          height
          width
        }
      }
    }
  }
`;
