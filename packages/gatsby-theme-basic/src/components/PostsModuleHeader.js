import { Link, Icon } from "@whitespace/components";
import { getMainArchivePagePathFromPageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/contentType";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { useModularityModule } from "../hooks";

import * as defaultStyles from "./PostsModuleHeader.module.css";

PostsModuleHeader.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default function PostsModuleHeader({
  styles = defaultStyles,
  className,
  children,
  ...restProps
}) {
  const { module } = useModularityModule();

  const archiveLinkLabel =
    module.modPostsDataSource?.postsDataPostType?.labels?.allItems;
  const archiveLinkUri =
    module.modPostsDataSource?.postsDataPostType &&
    getMainArchivePagePathFromPageContext({
      contentType: module.modPostsDataSource?.postsDataPostType,
    });
  const showArchiveLink =
    module.modPostsDataSource?.archiveLink &&
    module.modPostsDataSource?.postsDataPostType?.hasArchive &&
    archiveLinkUri &&
    archiveLinkLabel;

  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      {children}
      {!!showArchiveLink && (
        <Link className={styles.link} to={archiveLinkUri}>
          {archiveLinkLabel}
          <span className={styles.linkIcon}>
            <Icon name="chevron-right" />
          </span>
        </Link>
      )}
    </div>
  );
}
