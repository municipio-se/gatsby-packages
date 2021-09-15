import { H } from "@jfrk/react-heading-levels";
import { utilities } from "@whitespace/gatsby-theme-wordpress-basic/src/foundation";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

import * as defaultStyles from "./DnDMenu.module.css";
import DnDMenuDisplayView from "./DnDMenuDisplayView";
import DnDMenuEditView from "./DnDMenuEditView";

DnDMenuContainer.propTypes = {
  items: PropTypes.array,
  showLessLabel: PropTypes.string,
  showMoreLabel: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.node,
};

export default function DnDMenuContainer({
  items = [],
  visibleItemCount = 5,
  onChange,
  title,
  styles = defaultStyles,
  ...restProps
}) {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <DnDContainerContext.Provider value={{ items, visibleItemCount, onChange }}>
      <div
        className={clsx(styles.component, utilities.hiddenPrint)}
        {...restProps}
      >
        <div className={clsx(styles.header)}>
          <H className={clsx(styles.label)}>{title}</H>
          {isEditing ? (
            <span
              className={clsx(styles.toggle, styles.toggleView)}
              role="button"
              onClick={() => setIsEditing(false)}
            >
              {t("done")}
            </span>
          ) : (
            <span
              className={clsx(styles.toggle, styles.toggleView)}
              role="button"
              onClick={() => setIsEditing(true)}
            >
              {t("edit")}
            </span>
          )}
        </div>
        {isEditing ? <DnDMenuEditView /> : <DnDMenuDisplayView />}
      </div>
    </DnDContainerContext.Provider>
  );
}

export const DnDContainerContext = createContext();
