import { Link } from "@whitespace/components";
import clsx from "clsx";
import React from "react";

import * as defaultStyles from "../Navigation.module.css";

export default function TreeNavigationItem({
  active,
  styles = defaultStyles,
  focused,
  hasNodes = false,
  id,
  index,
  isFrontPage,
  isOpen = false,
  label,
  level = 0,
  onClick,
  openNodes,
  pageTemplate,
  parent,
  parentId,
  showInMenu,
  title,
  toggleNode,
  uri,
  url,
  searchTerm,
  ...restProps
}) {
  if (hasNodes) {
    restProps["aria-expanded"] = isOpen;
  }

  const levels = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];

  return (
    <li
      className={clsx(styles.listItem, styles[`listItemLevel${levels[level]}`])}
    >
      <Link
        className={clsx(
          styles.listLink,
          hasNodes && styles.listLinkHasChildren,
          isOpen && styles.listLinkIsOpen,
          focused && styles.listLinkIsFocused,
          active && styles.listLinkIsActive,
        )}
        onClick={(e) => {
          hasNodes && toggleNode && toggleNode();
          onClick();
          e.stopPropagation();
        }}
        tabIndex="-1"
        to={uri}
        {...restProps}
      >
        {label}
      </Link>
    </li>
  );
}
