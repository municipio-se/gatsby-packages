import { useThemeProps } from "@wsui/base";
import React from "react";

import PageModules from "./PageModules.jsx";

export default function PageTopSidebarModules(props) {
  props = useThemeProps({ props, name: "PageTopSidebarModules" });
  let { defaultColspan = 12, ...restProps } = props;
  return (
    <PageModules
      defaultColspan={defaultColspan}
      area="topSidebar"
      {...restProps}
    />
  );
}
