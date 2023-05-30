/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

import modularityAreaContext from "../../modularityAreaContext";
import modularityModuleContext from "../../modularityModuleContext";
import modularityRowContext from "../../modularityRowContext";
import { parseColumnWidth } from "../../utils";

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

export default function ModularityArea(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "ModularityArea" });
  let {
    area = {},
    defaultColspan = 7,
    context = {},
    gap = [4, 8],
    headingVariant,
    ...restProps
  } = props;
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
    <modularityAreaContext.Provider value={{ ...area, ...context }}>
      {moduleRows.map(({ modules }, index) => {
        return (
          <modularityRowContext.Provider key={index} value={{ modules, index }}>
            <PageGrid
              key={index}
              as="div"
              css={css`
                margin-bottom: ${index < moduleRows.length - 1
                  ? theme.getLength(gap)
                  : null};
              `}
              {...restProps}
            >
              {modules.map(({ hidden, module, colspan, ...rest }, index) => {
                return (
                  <PageGridItem key={index} colspan={colspan || defaultColspan}>
                    <modularityModuleContext.Provider
                      value={{
                        hidden,
                        module,
                        colspan,
                        headingVariant,
                        ...rest,
                      }}
                    >
                      <ModuleController module={module} />
                    </modularityModuleContext.Provider>
                  </PageGridItem>
                );
              })}
            </PageGrid>
          </modularityRowContext.Provider>
        );
      })}
    </modularityAreaContext.Provider>
  );
}
