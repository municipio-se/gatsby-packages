import ModularityArea from "@municipio/gatsby-theme-basic/src/components/ModularityArea";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import cx from "classnames";
// import useLocation from "gatsby-theme-municipio/src/hooks/location";
// import usePrevious from "gatsby-theme-municipio/src/hooks/previous";
import React, {
  createContext,
  useState,
  // useEffect
} from "react";

import AccessWall from "../../../components/AccessWall";
import Sidebar from "../../../components/Sidebar";
import Toolbar from "../../../components/Toolbar";

import * as styles from "./SiteLayout.module.css";

export default function SiteLayout({ children }) {
  const [siteContext, setSiteContext] = useState({ menuOpen: false });
  const { menuOpen } = siteContext;

  const {
    contentNode: { sliderArea },
  } = usePageContext();
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
    <SiteLayoutContext.Provider value={[siteContext, setSiteContext]}>
      <AccessWall autoLogin={true}>
        <div className={cx(styles.component, menuOpen && styles.sidebarIsOpen)}>
          <Sidebar />
          <main className={styles.main} id="main">
            <Toolbar />
            <ModularityArea
              area={sliderArea}
              className={cx(styles.sliderArea)}
            />
            <div className={styles.content}>{children}</div>
          </main>
        </div>
      </AccessWall>
    </SiteLayoutContext.Provider>
  );
}

export const SiteLayoutContext = createContext();
