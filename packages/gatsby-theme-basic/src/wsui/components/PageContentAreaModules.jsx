import { useThemeProps } from "@wsui/base";
import React from "react";

import PageModules from "./PageModules.jsx";

export default function PageContentAreaModules(props) {
  props = useThemeProps({ props, name: "PageContentAreaModules" });
  let { ...restProps } = props;
  return <PageModules area="contentArea" {...restProps} />;
}
