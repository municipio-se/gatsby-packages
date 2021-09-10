import { Icon, Button } from "@whitespace/components";
import PageBreadcrumbs from "@whitespace/gatsby-theme-wordpress-basic/src/components/PageBreadcrumbs";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import clsx from "clsx";
import React, { useContext } from "react";

import { SiteLayoutContext } from "../@whitespace/gatsby-theme-wordpress-basic/components/SiteLayout";

import * as styles from "./Toolbar.module.css";

export default function Toolbar({ ...restProps }) {
  const { contentNode: { isFrontPage } = {} } = usePageContext();
  const [siteContext, setSiteContext] = useContext(SiteLayoutContext);

  return (
    <div className={clsx(styles.component, styles.sticky)} {...restProps}>
      <div className={clsx(styles.content)}>
        <Button
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
      </div>
      <div className={clsx(styles.content)}>
        <Button
          className={clsx(styles.button, styles.bookmark)}
          onClick={() => {}}
        >
          <Icon name="star-outline" /> Bokmärk
        </Button>
      </div>
    </div>
  );
}
