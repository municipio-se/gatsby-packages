import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import React from "react";

import ModularityArea from "./ModularityArea.jsx";

export default function PageContentAreaModules({ ...restProps }) {
  let { contentArea } = usePageContext();
  return <ModularityArea area={contentArea} {...restProps} />;
}
