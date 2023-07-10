import { useThemeProps } from "@wsui/base";
import React from "react";

import PageModules from "./PageModules.jsx";

export default function PageContentAreaBottomModules(props) {
  props = useThemeProps({ props, name: "PageContentAreaBottomModules" });
  let { ...restProps } = props;
  return <PageModules area="contentAreaBottom" {...restProps} />;
}
