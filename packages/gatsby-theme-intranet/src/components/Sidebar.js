import { Section } from "@jfrk/react-heading-levels";
import { usePages } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import clsx from "clsx";
import produce from "immer";
import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { SiteLayoutContext } from "../@whitespace/gatsby-theme-wordpress-basic/components/SiteLayout";
import {
  TopNavigation,
  TreeNavigation,
  HelpMenu,
} from "../components/Navigation";
import { SearchForm } from "../components/SidebarSearch";
import userContext from "../contexts/userContext";
import { useMenu } from "../hooks/menus";
import { useTool } from "../hooks/tools";

import DnDMenuContainer from "./DnDMenu/DnDMenuContainer";
import Header from "./Header/Header";
import * as styles from "./Sidebar.module.css";

export default function Sidebar({ ...restProps }) {
  const [siteContext, setSiteContext] = useContext(SiteLayoutContext);
  const { userSettings, setUserSettings } = useContext(userContext);
  const sidebar = useRef(null);
  const { menuOpen } = siteContext;
  let allPages = usePages();
  const { t } = useTranslation();

  let bookmarks = (userSettings?.bookmarks || [])
    .map((bookmark) => allPages.find((page) => page.id === bookmark.pageId))
    .filter(Boolean)
    .map((page) => ({
      id: page.id,
      pageId: page.id,
      url: page.uri,
      label: page.title,
    }));

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

  return (
    <aside
      className={clsx(styles.component, menuOpen && styles.isOpen)}
      ref={sidebar}
      {...restProps}
    >
      <Header />
      <div className={styles.content}>
        <SearchForm
          className={clsx(styles.searchForm)}
          placeholderText="Sök på intranätet"
          modifierClass
        />
        <Section>
          {mainMenu?.length > 0 && <TopNavigation items={mainMenu} />}
          <TreeNavigation title="Innehåll" />
          {bookmarks?.length > 0 && (
            <DnDMenuContainer
              items={bookmarks}
              visibleItemCount={userSettings?.visibleBookmarksCount}
              onChange={({ items, visibleItemCount }) => {
                setUserSettings(
                  produce((userSettings = {}) => {
                    userSettings.bookmarks = items.map((item) => ({
                      pageId: item.pageId,
                    }));
                    userSettings.visibleBookmarksCount = visibleItemCount;
                    return userSettings;
                  }),
                );
              }}
              title={t("myBookmarksLabel")}
              showMoreLabel={t("allBookmarksLabel")}
              showLessLabel={t("hideBookmarksLabel")}
            />
          )}
          {tools?.length > 0 && (
            <DnDMenuContainer
              items={tools}
              onChange={(result) => console.log(result)}
              title={t("myToolsLabel")}
              showMoreLabel={t("allToolsLabel")}
              showLessLabel={t("hideToolsLabel")}
            />
          )}
          {helpMenu?.length > 0 && (
            <HelpMenu
              title="Hjälp"
              items={helpMenu}
              aria-label="Hjälpmeny"
              isHelpMenu={true}
              className={styles.last}
            />
          )}
        </Section>
      </div>
    </aside>
  );
}
