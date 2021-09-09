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
  title: PropTypes.node,
  styles: PropTypes.objectOf(PropTypes.string),
  showMoreLabel: PropTypes.string,
  showLessLabel: PropTypes.string,
};

export function DnDMenuContainer({
  items = [],
  title,
  styles = defaultStyles,
  showMoreLabel = "showMoreToolsLabel",
  showLessLabel = "showLessToolsLabel",
  nothingToShowLabel = "noToolsToShowLabel",
  ...restProps
}) {
  const { t } = useTranslation();

  title = t(title);
  showMoreLabel = t(showMoreLabel);
  showLessLabel = t(showLessLabel);

  const [DnDContext, setDnDContext] = useState({
    showMoreLabel,
    showLessLabel,
    nothingToShowLabel,
    itemsToShow: items.slice(0, 5),
    itemsToHide: items.slice(5, items.length),
    draggableItemsToShow: items.slice(0, 5),
    draggableItemsToHide: items.slice(5, items.length),
  });

  const [currentView, setCurrentView] = useState("display");

  const handleToggleView = () => {
    let newView = currentView === "display" ? "edit" : "display";

    setCurrentView(newView);

    // on click on the "save" button, we update the list of items
    if (currentView === "edit") {
      setDnDContext({
        ...DnDContext,
        itemsToShow: DnDContext.draggableItemsToShow,
        itemsToHide: DnDContext.draggableItemsToHide,
      });
    }
  };

  return (
    <DnDContainerContext.Provider value={[DnDContext, setDnDContext]}>
      <div
        className={clsx(styles.component, utilities.hiddenPrint)}
        {...restProps}
      >
        <div className={clsx(styles.header)}>
          <H className={clsx(styles.label)}>{title}</H>
          {DnDContext.itemsToShow?.length > 0 && (
            <span
              className={clsx(styles.toggle, styles.toggleView)}
              role="button"
              onClick={handleToggleView}
            >
              {currentView === "display" ? "Redigera" : "Visa"}
            </span>
          )}
        </div>
        {DnDContext.itemsToShow?.length > 0 && (
          <>
            {currentView === "display" ? (
              <DnDMenuDisplayView />
            ) : (
              <DnDMenuEditView />
            )}
          </>
        )}
      </div>
    </DnDContainerContext.Provider>
  );
}

export const DnDContainerContext = createContext();
