import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import { useThemeProps } from "@wsui/base";
import React from "react";

import ModularityArea from "./ModularityArea.jsx";

export default function PageContentAreaModules(props) {
  props = useThemeProps({ props, name: "PageContentAreaModules" });
  let { centerLonelyModules = false, ...restProps } = props;
  let { contentArea } = usePageContext();
  return (
    <ModularityArea
      area={contentArea}
      context={{ centerLonelyModules }}
      {...restProps}
    />
  );
}
