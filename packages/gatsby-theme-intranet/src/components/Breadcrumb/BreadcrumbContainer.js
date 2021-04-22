import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import usePages from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/pages";
import {
  getFrontPage,
  getAncestors,
  getPage,
} from "@whitespace/gatsby-theme-wordpress-basic/src/utils/pageTree";
// import { getPostType } from "gatsby-theme-municipio/src/utils/postTypes";
import React from "react";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import Breadcrumb from "./Breadcrumb";

export default function BreadcrumbContainer({ ...restProps }) {
  const pageContext = usePageContext();
  const {
    contentNode: {
      contentType: { node: { name: postTypeName } = {} } = {},
    } = {},
  } = pageContext;
  const allPages = usePages();
  const frontpage = getFrontPage(allPages);
  const crumbs = [];
  if (frontpage) {
    crumbs.push(frontpage);
  }

  if (!postTypeName) return null;

  switch (postTypeName) {
    case "page":
      {
        const {
          contentNode: { id: pageId },
        } = pageContext;

        const page = getPage(allPages, pageId);

        if (page) {
          const { isFrontPage } = page;
          if (!isFrontPage) {
            crumbs.push(
              ...getAncestors(allPages, pageId),
              getPage(allPages, pageId),
            );
          }
        }
      }

      break;
    default: {
      // let postType = getPostType(postTypeName);
      let postType = "";
      if (postType && postType.archive) {
        let {
          labels: { name: title },
          archive: { url },
        } = postType;
        crumbs.push({ title, url });
      }
      let { title } = pageContext.contentNode;
      crumbs.push({ title });
    }
  }
  if (!crumbs || crumbs.length === 0) {
    return null;
  }
  return (
    <ErrorBoundary>
      <Breadcrumb crumbs={crumbs} {...restProps} />
    </ErrorBoundary>
  );
}
