import { useLocation } from "@gatsbyjs/reach-router";
import { H } from "@jfrk/react-heading-levels";
import { TreeMenu } from "@whitespace/components";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import usePages from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/pages";
import {
  getAncestors,
  getTreeStructure,
} from "@whitespace/gatsby-theme-wordpress-basic/src/utils/pageTree";
import cx from "classnames";
import { navigate } from "gatsby";
import React from "react";

import TreeNavigationItem from "./TreeNavigationItem";

export default function TreeNavigation({ ...restProps }) {
  let allPages = usePages();
  const treeData = getTreeStructure(allPages);

  console.log(treeData);

  const location = useLocation();

  return <TreeMenu items={treeData} location={location} />;
}
