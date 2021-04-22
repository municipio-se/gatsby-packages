import { H } from "@jfrk/react-heading-levels";
import { Link } from "@whitespace/components/src/components/Link";
import React from "react";
import cx from "classnames";

// import "../Navigation.scss";

export function NavigationMenu({
  namespace = "navigation",
  title,
  items,
  isMenu = true,
  children,
  modifier,
  ...restProps
}) {
  const WrapperComponent = isMenu ? "nav" : "div";
  return (
    <WrapperComponent
      className={cx("navigation", modifier, "hidden-print")}
      {...restProps}
    >
      <H className={cx("navigation__label")}>{title}</H>
      {items && items.length > 0 && (
        <ul className={cx("navigation__list")}>
          {items
            .filter((item) => ("showInMenu" in item ? item.showInMenu : item))
            .map((item, index) => {
              return (
                <li className={cx("navigation__list-item")} key={index}>
                  <Link
                    className={cx(
                      "navigation__list-link",
                      item.hasChildren && "navigation__list-link--has-children",
                      item.isOpen && "navigation__list-link--is-open",
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
