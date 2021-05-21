import { Icon, Link } from "@whitespace/components";
import clsx from "clsx";
import React from "react";

import * as styles from "./TopNavigation.module.css";

export function TopNavigation({ items, ...restProps }) {
  return (
    <nav
      className={clsx(styles.component, "hidden-print")}
      aria-label="primär"
      {...restProps}
    >
      <ul className={clsx(styles.list)}>
        {items.map(({ url, target, icon, label }, index) => {
          return (
            <li key={index} className={clsx(styles.item)}>
              <Link className={clsx(styles.link)} to={url} target={target}>
                <span className={clsx(styles.iconWrapper, !!icon == false && `${styles.transparent}`)}>
                  <Icon
                    name={icon}
                    className={clsx(styles.icon, icon && `${styles.icon}--${icon}`)}
                    size="1.5rem"
                  />
                </span>
                <div className={clsx(styles.text)}>
                  <span className={clsx(styles.label)}>{label}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
