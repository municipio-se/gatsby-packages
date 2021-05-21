import { H } from "@jfrk/react-heading-levels";
import { utilities  } from "@whitespace/gatsby-theme-wordpress-basic/src/foundation";
import { usePageContext, usePages } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import {
  getAncestors,
  getTreeStructure,
} from "@whitespace/gatsby-theme-wordpress-basic/src/utils/pageTree";
import clsx from "clsx";
import { navigate } from "gatsby";
import React from "react";
import TreeMenu from "react-simple-tree-menu";

import * as defaultStyles from "../Navigation.module.css";

import TreeNavigationItem from "./TreeNavigationItem";



export default function TreeNavigation({
  styles = defaultStyles,
  ...restProps
}) {
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
          className={clsx(styles.component, styles.componentTree, utilities.hiddenPrint)}
          aria-label="Innehåll"
        >
          <H className={clsx(styles.label)}>Innehåll</H>
          <ul className={clsx(styles.list)}>
            {items.map((props, index) => {
              return <TreeNavigationItem key={index} {...props} />;
            })}
          </ul>
        </nav>
      )}
    </TreeMenu>
  );
}
