import { useLocation } from "@gatsbyjs/reach-router";
import { H } from "@jfrk/react-heading-levels";
import { TreeMenu } from "@whitespace/components";
import usePages from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/pages";
import { getTreeStructure } from "@whitespace/gatsby-theme-wordpress-basic/src/utils/pageTree";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./TreeNavigation.module.css";

TreeNavigation.propTypes = {
  title: PropTypes.node,
};

export default function TreeNavigation({ title, ...restProps }) {
  let allPages = usePages();
  const treeData = getTreeStructure(allPages);

  const location = useLocation();

  return (
    <div {...restProps}>
      <H className={clsx(styles.label)}>{title}</H>
      <TreeMenu
        items={treeData}
        location={location}
        className={clsx(styles.component)}
      />
    </div>
  );
}
