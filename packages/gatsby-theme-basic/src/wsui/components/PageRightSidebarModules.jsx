import { useThemeProps } from "@wsui/base";
import React from "react";

import PageModules from "./PageModules.jsx";

export default function PageRightSidebarModules(props) {
  props = useThemeProps({ props, name: "PageRightSidebarModules" });
  let { ...restProps } = props;
  return <PageModules area="rightSidebar" {...restProps} />;
}
