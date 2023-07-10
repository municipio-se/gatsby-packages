import { useThemeProps } from "@wsui/base";
import React from "react";

import PageModules from "./PageModules.jsx";

export default function PageBottomSidebarModules(props) {
  props = useThemeProps({ props, name: "PageBottomSidebarModules" });
  let { defaultColspan = 12, ...restProps } = props;
  return (
    <PageModules
      defaultColspan={defaultColspan}
      area="bottomSidebar"
      {...restProps}
    />
  );
}
