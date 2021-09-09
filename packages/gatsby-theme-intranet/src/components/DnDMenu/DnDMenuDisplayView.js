import { Link } from "@whitespace/components";
import clsx from "clsx";
import React, { useContext, useState } from "react";

import * as styles from "./DnDMenu.module.css";
import { DnDContainerContext } from "./DnDMenuContainer";

export default function DnDMenuDisplayView({ ...restProps }) {
  const [DnDContext] = useContext(DnDContainerContext);

  const {
    itemsToHide,
    itemsToShow,
    showMoreLabel,
    showLessLabel,
    nothingToShowLabel,
  } = DnDContext;

  const [displayAllItems, setDisplayAllItems] = useState(false);

  const toggleItems = () => {
    setDisplayAllItems(!displayAllItems);
  };

  return (
    <>
      <ul className={clsx(styles.list)} {...restProps}>
        {itemsToShow.length == 0 && (
          <li className={clsx(styles.item)} key={0}>
            <span className={clsx(styles.link, styles.linkEmpty)}>
              {t(nothingToShowLabel)}
            </span>
          </li>
        )}
        {itemsToShow.map((item, index) => {
          return (
            <li className={clsx(styles.item)} key={index}>
              <Link className={clsx(styles.link)} to={item.url}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      {itemsToHide?.length > 0 && (
        <span
          role="button"
          className={clsx(
            styles.toggleButton,
            displayAllItems && styles.toggleButtonIsOpen,
          )}
          aria-pressed={displayAllItems}
          onClick={toggleItems}
        >
          {!displayAllItems ? showMoreLabel : showLessLabel}
        </span>
      )}
      {displayAllItems && itemsToHide?.length > 0 && (
        <ul className={clsx(styles.list)} {...restProps}>
          {itemsToHide.map((item, index) => {
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
