import { useStaticQuery, graphql } from "gatsby";

export default function getFallbackImage() {
  // return useStaticQuery(graphql`
  //   query GET_PAGES {
  //     file(
  //       sourceInstanceName: { eq: "images" }
  //       relativePath: { eq: "fallback.png" }
  //     ) {
  //       childImageSharp {
  //         fluid {
  //           base64
  //           aspectRatio
  //           sizes
  //           src
  //           srcSet
  //         }
  //       }
  //     }
  //     site {
  //       siteMetadata {
  //         siteUrl
  //       }
  //     }
  //   }
  // `);
}

export function fallbackImage() {
  return {
    width: 1200,
    height: 627,
    src:
      getFallbackImage().site.siteMetadata.siteUrl +
      getFallbackImage().file.childImageSharp.fluid.src,
  };
}
