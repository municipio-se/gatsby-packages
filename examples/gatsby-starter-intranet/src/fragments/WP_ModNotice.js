import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ModNotice on WP_ModNotice {
    id
    title
    hideTitle
    contentType {
      node {
        name
      }
    }
    modNoticeOptions {
      noticeText
      noticeType
    }
  }
`;
