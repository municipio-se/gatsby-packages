import cx from "classnames";
// import useLocation from "gatsby-theme-municipio/src/hooks/location";
import { PageContextProvider } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
// import usePrevious from "gatsby-theme-municipio/src/hooks/previous";
import React, { createContext, useState, useEffect } from "react";

import Sidebar from "../../../components/Sidebar";
import Toolbar from "../../../components/Toolbar";

import * as styles from "./SiteLayout.module.css";

export default function SiteLayout({ pageContext, children }) {
  const [siteContext, setSiteContext] = useState({ menuOpen: false });
  // const location = useLocation();
  // const prevLocation = usePrevious(location);

  // useEffect(() => {
  //   if (location !== prevLocation) {
  //     setSiteContext({
  //       ...siteContext,
  //       menuOpen: false,
  //     });
  //   }
  // }, [location, prevLocation, setSiteContext]);

  return (
    <PageContextProvider value={pageContext}>
      <SiteLayoutContext.Provider value={[siteContext, setSiteContext]}>
        <div
          className={cx(
            styles.component,
            siteContext.menuOpen && "sidebar-open",
          )}
        >
          <Sidebar />
          <main className={styles.main} id="main">
            <Toolbar />
            <div className={styles.content}>{children}</div>
          </main>
        </div>
      </SiteLayoutContext.Provider>
    </PageContextProvider>
  );
}

export const SiteLayoutContext = createContext();
