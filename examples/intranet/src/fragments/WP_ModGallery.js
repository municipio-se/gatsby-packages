import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ModGallery on WP_ModGallery {
    id
    title
    hideTitle
    contentType {
      node {
        name
      }
    }
    gallery {
      modGalleryImages {
        ...WP_ImageMedium
      }
    }
  }
`;
