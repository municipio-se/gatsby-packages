import { H } from "@jfrk/react-heading-levels";
import { Link } from "@whitespace/components";
import { utilities } from "@whitespace/gatsby-theme-wordpress-basic/src/foundation";
import clsx from "clsx";
import React from "react";

import * as defaultStyles from "../Navigation.module.css";

export function NavigationMenu({
  className,
  styles = defaultStyles,
  title,
  items,
  isMenu = true,
  isHelpMenu = false,
  isTreeMenu = false,
  children,
  ...restProps
}) {
  const WrapperComponent = isMenu ? "nav" : "div";
  const componentModifer = isTreeMenu
    ? styles.componentTree
    : isHelpMenu
    ? styles.componentHelp
    : "";
  return (
    <WrapperComponent
      className={clsx(
        styles.component,
        componentModifer,
        utilities.hiddenPrint,
        className,
      )}
      {...restProps}
    >
      <H className={clsx(styles.label)}>{title}</H>
      {items && items.length > 0 && (
        <ul className={clsx(styles.list)}>
          {items
            .filter((item) => ("showInMenu" in item ? item.showInMenu : item))
            .map((item, index) => {
              return (
                <li className={clsx(styles.listItem)} key={index}>
                  <Link
                    className={clsx(
                      styles.listLink,
                      item.hasChildren && styles.listLinkHasChildren,
                      item.isOpen && styles.listLinkIsOpen,
                    )}
                    to={item.url}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
      {children}
    </WrapperComponent>
  );
}
