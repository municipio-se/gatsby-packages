import ModularityArea from "@municipio/gatsby-theme-basic/src/components/ModularityArea";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import clsx from "clsx";
// import useLocation from "gatsby-theme-municipio/src/hooks/location";
// import usePrevious from "gatsby-theme-municipio/src/hooks/previous";
import PropTypes from "prop-types";
import React, {
  createContext,
  useState,
  // useEffect
} from "react";

import AccessWall from "../../../components/AccessWall";
import Sidebar from "../../../components/Sidebar";
import Toolbar from "../../../components/Toolbar";

import * as styles from "./SiteLayout.module.css";

SiteLayout.propTypes = { children: PropTypes.node };

export default function SiteLayout({ children }) {
  const [siteContext, setSiteContext] = useState({ menuOpen: false });
  const { menuOpen } = siteContext;

  const { contentNode: { sliderArea } = {} } = usePageContext();
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
        <div
          className={clsx(styles.component, menuOpen && styles.sidebarIsOpen)}
        >
          <Sidebar />
          <main className={styles.main} id="main">
            <Toolbar />
            <ModularityArea
              area={sliderArea}
              className={clsx(styles.sliderArea)}
            />
            <div className={styles.content}>{children}</div>
          </main>
        </div>
      </AccessWall>
    </SiteLayoutContext.Provider>
  );
}

export const SiteLayoutContext = createContext();
