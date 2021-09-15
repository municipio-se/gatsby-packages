import { Icon, Button } from "@whitespace/components";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import clsx from "clsx";
import produce from "immer";
import PropTypes from "prop-types";
import React, { useContext } from "react";

import userContext from "../contexts/userContext";

import * as defaultStyles from "./BookmarkToggleButton.module.css";

BookmarkToggleButton.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

const toggleBookmark = (pageId) =>
  produce((settings = {}) => {
    pageId = String(pageId);
    settings.bookmarks = settings.bookmarks || [];
    let bookmark = settings.bookmarks.find(
      (bookmark) => bookmark.pageId === pageId,
    );
    if (bookmark) {
      settings.bookmarks = settings.bookmarks.filter(
        (bookmark) => bookmark.pageId !== pageId,
      );
    } else {
      bookmark = { pageId };
      settings.bookmarks.push(bookmark);
    }
    return settings;
  });

export default function BookmarkToggleButton({
  as: Component = Button,
  className,
  components: { CheckedIcon = Icon, UncheckedIcon = Icon } = {
    CheckedIcon: Icon,
    UncheckedIcon: Icon,
  },
  styles = defaultStyles,
  ...restProps
}) {
  const { contentNode: { isFrontPage, id: pageId } = {} } = usePageContext();
  const { userSettings, setUserSettings } = useContext(userContext);

  if (isFrontPage || pageId == null) {
    return null;
  }

  let isBookmarked = userSettings?.bookmarks?.some(
    (bookmark) => bookmark.pageId === String(pageId),
  );

  return (
    <Component
      className={clsx(styles.component, className)}
      isCurrent={isBookmarked}
      onClick={() => {
        setUserSettings(toggleBookmark(pageId));
      }}
      {...restProps}
    >
      {isBookmarked ? (
        <CheckedIcon name="star-filled" size="1.25em" />
      ) : (
        <UncheckedIcon name="star" size="1.25em" />
      )}{" "}
      {isBookmarked ? `Bokmärkt` : `Bokmärk`}
    </Component>
  );
}
