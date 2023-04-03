import { parseColumnWidth } from "@municipio/gatsby-theme-basic/src/utils";
import { PageGrid, PageGridItem } from "@wsui/base";
import React from "react";

import modularityAreaContext from "../../modularityAreaContext";
import modularityModuleContext from "../../modularityModuleContext";

import ModuleController from "./ModuleController.jsx";

function makeRows(modules) {
  let rows = [];
  let currentRow = { modules: [] };
  let currentRowColspan = 0;
  for (let module of modules) {
    const colspan = module.colspan || 12;
    if (colspan + currentRowColspan > 12) {
      rows.push(currentRow);
      currentRow = { modules: [] };
      currentRowColspan = 0;
    }
    currentRow.modules.push(module);
    currentRowColspan += colspan;
  }
  if (currentRow.modules.length) {
    rows.push(currentRow);
  }
  return rows;
}

export default function ModularityArea({
  area = {},
  defaultColspan = 7,
  ...restProps
}) {
  const { modules } = area;
  if (!modules?.length) {
    return null;
  }
  let moduleRows = makeRows(
    modules
      .filter(({ module, hidden }) => module && !hidden)
      .map(({ columnWidth, ...rest }) => ({
        colspan: parseColumnWidth(columnWidth),
        ...rest,
      })),
  );
  return (
    <modularityAreaContext.Provider value={area}>
      {moduleRows.map(({ modules }, index) => {
        return (
          <PageGrid key={index} as="div" {...restProps}>
            {modules.map(({ hidden, module, colspan, ...rest }, index) => {
              return (
                <PageGridItem key={index} colspan={colspan || defaultColspan}>
                  <modularityModuleContext.Provider
                    value={{ hidden, module, colspan, ...rest }}
                  >
                    <ModuleController module={module} />
                  </modularityModuleContext.Provider>
                </PageGridItem>
              );
            })}
          </PageGrid>
        );
      })}
    </modularityAreaContext.Provider>
  );
}
