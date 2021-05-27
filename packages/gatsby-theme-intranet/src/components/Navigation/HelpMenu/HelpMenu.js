import { H } from "@jfrk/react-heading-levels";
import { Link } from "@whitespace/components";
import { utilities } from "@whitespace/gatsby-theme-wordpress-basic/src/foundation";
import clsx from "clsx";
import React from "react";

import * as defaultStyles from "./HelpMenu.module.css";

export function HelpMenu({
  className,
  styles = defaultStyles,
  title,
  items,
  children,
  ...restProps
}) {
  return (
    <div className={clsx(styles.component)} {...restProps}>
      <H className={clsx(styles.label)}>{title}</H>
      <nav
      className={clsx(
        styles.navigation,
        utilities.hiddenPrint,
        className,
      )}
      {...restProps}
    >
      {items && items.length > 0 && (
        <ul className={clsx(styles.list)}>
          {items
            .filter((item) => ("showInMenu" in item ? item.showInMenu : item))
            .map((item, index) => {
              return (
                <li className={clsx(styles.item)} key={index}>
                  <Link
                    className={clsx(styles.link)}
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
      </nav>
    </div>
  );
}
