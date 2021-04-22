import { H } from "@jfrk/react-heading-levels";
import cx from "classnames";
import { navigate } from "gatsby";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import usePages from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/pages";
import React from "react";
import TreeMenu from "react-simple-tree-menu";

import {
  getAncestors,
  getTreeStructure,
} from "@whitespace/gatsby-theme-wordpress-basic/src/utils/pageTree";

import TreeNavigationItem from "./TreeNavigationItem";

export default function TreeNavigation({ ...restProps }) {
  let allPages = usePages();
  const treeData = getTreeStructure(allPages);

  const { contentNode: { id: currentPageId } = {} } = usePageContext();
  let openNodeString = "";
  let openNodes = [];

  if (currentPageId) {
    getAncestors(allPages, currentPageId)
      .filter((ancestor) => ancestor.showInMenu)
      .map((ancestor, index) => {
        if (!index) {
          openNodeString += ancestor.id;
        } else {
          openNodeString += "/" + ancestor.id;
        }

        openNodes.push(openNodeString);
      });

    openNodeString += openNodes.length ? "/" + currentPageId : currentPageId;
    openNodes.push(openNodeString);
  }

  return (
    <TreeMenu
      hasSearch={false}
      data={treeData}
      onClickItem={({ ...props }) => {
        navigate(props.url);
        props.toggleNode && props.toggleNode();
      }}
      initialActiveKey={openNodeString}
      initialFocusKey={openNodeString}
      initialOpenNodes={openNodes}
      {...restProps}
    >
      {({ items }) => (
        <nav
          className={cx("navigation", "navigation--tree", "hidden-print")}
          aria-label="Innehåll"
        >
          <H className={cx("navigation__label")}>Innehåll</H>
          <ul className={cx("navigation__list")}>
            {items.map((props, index) => {
              return <TreeNavigationItem key={index} {...props} />;
            })}
          </ul>
        </nav>
      )}
    </TreeMenu>
  );
}
