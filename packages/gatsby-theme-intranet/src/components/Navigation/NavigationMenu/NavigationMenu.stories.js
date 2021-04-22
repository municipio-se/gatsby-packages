import React from "react";

import { NavigationMenu as NavigationMenuComponent } from "./NavigationMenu";

export default {
  title: "Components/Navigation",
  component: NavigationMenuComponent,
};

export const NavigationMenu = () => (
  <NavigationMenuComponent
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
