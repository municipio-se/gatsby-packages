import { Link, RoundIcon, withComponentDefaults } from "@whitespace/components";
import { getMainArchivePagePathFromPageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/contentType";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { useModularityModule } from "../hooks";

import * as defaultStyles from "./PostsModuleHeader.module.css";

PostsModuleHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  icon: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(PostsModuleHeader, "postsModuleHeader");

function PostsModuleHeader({
  children,
  className,
  components: { Icon = RoundIcon } = { Icon: RoundIcon },
  icon = { name: "chevron-right" },
  styles = defaultStyles,
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
          {!!icon && <Icon className={styles.linkIcon} {...icon} />}
        </Link>
      )}
    </div>
  );
}
