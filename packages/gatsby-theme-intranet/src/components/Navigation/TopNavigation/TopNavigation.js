import { Icon } from "@whitespace/components/src";
import { Link } from "@whitespace/components/src/components/Link";
import cx from "classnames";
import React from "react";

// import "./TopNavigation.scss";

export function TopNavigation({
  namespace = "top-navigation",
  items,
  ...restProps
}) {
  return (
    <nav
      className={cx("top-navigation", "hidden-print")}
      aria-label="primär"
      {...restProps}
    >
      <ul className={cx("top-navigation__list")}>
        {items.map(({ url, target, icon, label }, index) => {
          return (
            <li key={index} className={cx("top-navigation__item")}>
              <Link
                className={cx("top-navigation__link")}
                to={url}
                target={target}
              >
                <Icon
                  name={icon}
                  className={cx("top-navigation__icon", `--${icon}`)}
                  size="1.5rem"
                />
                <div className={cx("top-navigation__text")}>
                  <span className={cx("top-navigation__label")}>{label}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
