import React from "react";

import { TopNavigation } from "../TopNavigation";

export default {
  title: "Components/Navigation",
  component: TopNavigation,
};

export const topNavigation = () => (
  <TopNavigation
    items={[
      {
        label: "Hem",
        url: "/",
        icon: "house",
        themeColor: "education",
        target: null,
      },
      {
        label: "Nyheter",
        url: "/Nyheter",
        icon: "newspaper",
        themeColor: "living",
        target: null,
      },
      {
        label: "Kalendarium",
        url: "/Kalendarium",
        icon: "calendar",
        themeColor: "business",
        target: null,
      },
      {
        label: "Telefonbok",
        url: "/Telefonbok",
        icon: "people",
        themeColor: "care",
        target: null,
      },
    ]}
  />
);
