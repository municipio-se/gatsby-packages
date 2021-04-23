import { H, Section } from "@jfrk/react-heading-levels";
import cx from "classnames";
import React, { useContext, useEffect, useRef } from "react";

import { SiteLayoutContext } from "../@whitespace/gatsby-theme-wordpress-basic/components/SiteLayout";
import Header from "../components/Header/Header";
import {
  TopNavigation,
  TreeNavigation,
  HelpMenu,
} from "../components/Navigation";
import { SearchForm } from "../components/SidebarSearch";
import { useMenu } from "../hooks/menus";
import { useTool } from "../hooks/tools";
// import { Bookmarks, Tools } from "../components/DnDMenu";

import * as styles from "./Sidebar.module.css";

export default function Sidebar({ ...restProps }) {
  const [siteContext, setSiteContext] = useContext(SiteLayoutContext);
  const sidebar = useRef(null);
  const {
    menuOpen,
    // bookmarks = [
    //   {
    //     id: "1",
    //     label: "Ledighet och frånvaro",
    //     url: "/page-1",
    //   },
    //   {
    //     id: "2",
    //     label: "Stöd och verktyg",
    //     url: "/page-2",
    //   },
    //   {
    //     id: "3",
    //     label: "Tidsredovisning",
    //     url: "/page-2",
    //   },
    //   {
    //     id: "4",
    //     label: "Resor",
    //     url: "/page-2",
    //   },
    //   {
    //     id: "5",
    //     label: "Nyheter",
    //     url: "/page-2",
    //   },
    //   {
    //     id: "6",
    //     label: "Kalendarium",
    //     url: "/page-5",
    //   },
    //   {
    //     id: "7",
    //     label: "Hem",
    //     url: "/page-5",
    //   },
    // ],
  } = siteContext;

  useEffect(() => {
    function handleCloseMenu() {
      setSiteContext({
        ...siteContext,
        menuOpen: false,
      });
    }

    const handleCloseMenuOnClick = (e) => {
      if (
        sidebar.current.contains(e.target) ||
        e.target.classList.contains("header__dropdown-trigger") ||
        e.target.classList.contains("dnd-menu__toggle")
      )
        return;
      handleCloseMenu();
    };

    const handleCloseMenuOnEsc = (e) => {
      if (e.key.toLowerCase() !== "escape") return;
      handleCloseMenu();
    };

    if (menuOpen) {
      window.addEventListener("click", handleCloseMenuOnClick);
      document.addEventListener("keyup", handleCloseMenuOnEsc);
    }

    return function cleanup() {
      window.removeEventListener("click", handleCloseMenuOnClick);
      document.removeEventListener("keyup", handleCloseMenuOnEsc);
    };
  }, [siteContext]);

  let { items: mainMenu } = useMenu("MAIN_MENU");
  let { items: helpMenu } = useMenu("HELP_MENU");
  let tools = useTool();

  // console.log("mainMenu", mainMenu);
  // console.log("helpMenu", helpMenu);

  return (
    <aside
      className={cx(styles.component, menuOpen && styles.isOpen)}
      ref={sidebar}
      {...restProps}
    >
      <Header />
      <div className={styles.content}>
        <SearchForm placeholderText="Sök på intranätet" modifierClass />
        <Section>
          {mainMenu?.length > 0 && <TopNavigation items={mainMenu} />}
          {/* <TreeNavigation /> */}
          {/* {bookmarks?.length > 0 && (
            <Bookmarks
              items={bookmarks}
              title="myBookmarksLabel"
              showMoreLabel="allBookmarksLabel"
              showLessLabel="hideBookmarksLabel"
            />
          )}
          {tools?.length > 0 && (
            <Tools
              items={tools}
              title="myToolsLabel"
              showMoreLabel="allToolsLabel"
              showLessLabel="hideToolsLabel"
              nothingToShowLabel="noSelectedToolsLabel"
            />
          )} */}
          {/* {helpMenu?.length > 0 && (
            <HelpMenu
              title="Hjälp"
              items={helpMenu}
              aria-label="Hjälpmeny"
              modifier="--help"
            />
          )} */}
        </Section>
      </div>
    </aside>
  );
}
