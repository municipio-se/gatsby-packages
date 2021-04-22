import cx from "classnames";
import { Link } from "gatsby";
import React from "react";

export default function TreeNavigationItem({
  active,
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

  return (
    <li
      className={cx(
        "navigation__list-item",
        `navigation__list-item-level${level}`,
      )}
    >
      <Link
        className={cx(
          "navigation__list-link",
          hasNodes && "navigation__list-link--has-children",
          isOpen && "navigation__list-link--is-open",
          focused && "navigation__list-link--is-focused",
          active && "navigation__list-link--is-active",
        )}
        onClick={(e) => {
          hasNodes && toggleNode && toggleNode();
          onClick();
          e.stopPropagation();
        }}
        tabIndex="-1"
        to={url}
        {...restProps}
      >
        {label}
      </Link>
    </li>
  );
}
