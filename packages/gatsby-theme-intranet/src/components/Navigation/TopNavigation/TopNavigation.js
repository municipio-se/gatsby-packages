import { Icon, Link } from "@whitespace/components";
import { utilities } from "@whitespace/gatsby-theme-wordpress-basic/src/foundation";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./TopNavigation.module.css";

TopNavigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.any,
      label: PropTypes.node,
      target: PropTypes.any,
      url: PropTypes.any,
    }),
  ),
};

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

export function TopNavigation({ items, ...restProps }) {
  return (
    <nav
      className={clsx(styles.component, utilities.hiddenPrint)}
      aria-label="primär"
      {...restProps}
    >
      <ul className={clsx(styles.list)}>
        {items.map(({ url, target, icon, label }, index) => {
          return (
            <li key={index} className={clsx(styles.item)}>
              <Link className={clsx(styles.link)} to={url} target={target}>
                <span
                  className={clsx(
                    styles.iconWrapper,
                    typeof icon === "undefined" && `${styles.transparent}`,
                    icon && styles[`iconWrapper${capitalize(icon)}Icon`],
                  )}
                >
                  <Icon
                    name={icon}
                    className={clsx(
                      styles.icon,
                      // icon && `${styles.icon}--${icon}`,
                    )}
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
