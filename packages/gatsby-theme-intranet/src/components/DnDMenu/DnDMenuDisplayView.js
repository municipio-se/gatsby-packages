import { Link } from "@whitespace/components";
import clsx from "clsx";
import React, { useContext, useState } from "react";

import * as styles from "./DnDMenu.module.css";
import { DnDContainerContext } from "./DnDMenuContainer";

export default function DnDMenuDisplayView({ ...restProps }) {
  const { items, visibleItemCount } = useContext(DnDContainerContext);

  const [displayAllItems, setDisplayAllItems] = useState(false);

  return (
    <>
      <ul className={clsx(styles.list)} {...restProps}>
        {items.slice(0, visibleItemCount).map((item, index) => {
          return (
            <li className={clsx(styles.item)} key={index}>
              <Link className={clsx(styles.link)} to={item.url}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      {items.length > visibleItemCount && (
        <span
          role="button"
          className={clsx(
            styles.toggleButton,
            displayAllItems && styles.toggleButtonIsOpen,
          )}
          aria-pressed={displayAllItems}
          onClick={() => setDisplayAllItems((value) => !value)}
        >
          {!displayAllItems ? "Show more" : "Show less"}
        </span>
      )}
      {displayAllItems && items.length > visibleItemCount && (
        <ul className={clsx(styles.list)} {...restProps}>
          {items.slice(visibleItemCount).map((item, index) => {
            return (
              <li className={clsx(styles.item)} key={index}>
                <Link className={clsx(styles.link)} to={item.url}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
