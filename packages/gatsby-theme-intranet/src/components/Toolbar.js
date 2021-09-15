import { Icon, Button } from "@whitespace/components";
import PageBreadcrumbs from "@whitespace/gatsby-theme-wordpress-basic/src/components/PageBreadcrumbs";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useContext } from "react";

import { SiteLayoutContext } from "../@whitespace/gatsby-theme-wordpress-basic/components/SiteLayout";

import BookmarkToggleButton from "./BookmarkToggleButton";
import * as styles from "./Toolbar.module.css";
import ToolbarButton from "./ToolbarButton";

Toolbar.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType),
};

function DefaultSpacer({ ...restProps }) {
  return <span role="separator" {...restProps} />;
}

export default function Toolbar({
  components: { Spacer = DefaultSpacer } = { Spacer: DefaultSpacer },
  ...restProps
}) {
  const { contentNode: { isFrontPage } = {} } = usePageContext();
  const [siteContext, setSiteContext] = useContext(SiteLayoutContext);

  return (
    <div className={clsx(styles.component, styles.sticky)} {...restProps}>
      <Button
        as={ToolbarButton}
        className={clsx(styles.button, styles.menu)}
        onClick={() => {
          setSiteContext({
            ...siteContext,
            menuOpen: true,
          });
        }}
        aria-expanded={siteContext.menuOpen}
      >
        <Icon name="menu-sidebar" />
      </Button>
      {!isFrontPage && <PageBreadcrumbs />}
      <Spacer className={styles.spacer} />
      <BookmarkToggleButton as={ToolbarButton} />
    </div>
  );
}
