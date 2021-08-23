import React from "react";

import { HelpMenu } from "./HelpMenu";

export default {
  title: "Components/Navigation",
  component: HelpMenu,
};

export const NavigationMenu = () => (
  <HelpMenu
    title="Hjälp"
    items={[
      {
        label: "Kontakta support",
        url: "/kontake-support",
        showInMenu: true,
      },
      {
        label: "Hjalpguide",
        url: "/hjalpguide",
        showInMenu: true,
      },
    ]}
    aria-label="Hjälpmeny"
  />
);
