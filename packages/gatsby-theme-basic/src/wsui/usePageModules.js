import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";

import makeModuleSections from "./makeModuleSections";

export default function usePageModules(areaName, options = {}) {
  const pageContext = usePageContext();
  let area = pageContext?.[areaName];
  return makeModuleSections(area?.modules, options);
}
