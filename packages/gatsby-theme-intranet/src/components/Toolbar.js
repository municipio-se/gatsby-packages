import { Icon, Button } from "@whitespace/components/src";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import clsx from "clsx";
import React, { useContext } from "react";

import { SiteLayoutContext } from "../@whitespace/gatsby-theme-wordpress-basic/components/SiteLayout";
import Breadcrumb from "../components/Breadcrumb/BreadcrumbContainer";

import * as styles from "./Toolbar.module.css";

export default function Toolbar({ ...restProps }) {
  const { contentNode: { isFrontPage } = {} } = usePageContext();
  const [siteContext, setSiteContext] = useContext(SiteLayoutContext);

  return (
    <div
      className={clsx(
        styles.component,
        styles.sticky,
        siteContext.menuOpen && "is-active",
      )}
      {...restProps}
    >
      <div className={clsx(styles.content)}>
        {/* <Button
          className={clsx("__menu-button button--outline button--small")}
          title={"Meny"}
          iconBefore={true}
          iconBeforeName="menu-sidebar"
          onClick={() => {
            setSiteContext({
              ...siteContext,
              menuOpen: true,
            });
          }}
          isTitleHidden={true}
          aria-expanded={siteContext.menuOpen}
        /> */}
        {!isFrontPage && <Breadcrumb />}
      </div>
      <div className={clsx(styles.content)}>
        <Button
          className={clsx(styles.bookmark)}
          title={"Bookmark"}
          onClick={() => {}}
        >
          <Icon name="star-outline" />
        </Button>
        <Button
          className={clsx(styles.tools)}
          title={"tools"}
          // isTitleHidden={true}
          onClick={() => {}}
          aria-expanded={false}
        >
          <Icon name="tools-menu" />
        </Button>
      </div>
    </div>
  );
}
