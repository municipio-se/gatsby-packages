import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";

import { parseColumnWidth } from "../utils";

import makeModuleSections from "./makeModuleSections";

export default function usePageModules(areaName, options = {}) {
  const pageContext = usePageContext();

  let area = pageContext?.[areaName];

  if (!area?.modules?.length) {
    return [];
  }

  let modules = area.modules
    .map(({ columnWidth, ...module }) => ({
      colspan: parseColumnWidth(columnWidth),
      ...module,
    }))
    .filter(({ module, hidden }) => module && !hidden);

  let moduleSections = makeModuleSections(modules, options);

  return moduleSections;
}
