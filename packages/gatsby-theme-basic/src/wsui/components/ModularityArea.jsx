/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import {
  MaybeFragment,
  PageSection as DefaultPageSection,
  PageGrid,
  PageGridItem,
  useThemeProps,
  handleComponentsProp,
  Section,
} from "@wsui/base";
import clsx from "clsx";
import { omit } from "lodash/fp";

import modularityAreaContext from "../../modularityAreaContext";
import modularityModuleContext from "../../modularityModuleContext";
import modularityRowContext from "../../modularityRowContext";

import ModuleController from "./ModuleController.jsx";

export default function ModularityArea(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "ModularityArea" });
  let {
    moduleRows,
    defaultColspan = 7,
    context = {},
    gap = [8.75, 17.5],
    headingVariant,
    maxColspan,
    pageGridProps = {},
    sectionPadding = gap,
    components,
    promoteFirstHeading = false,
    ...restProps
  } = omit(["marginAfter", "marginBefore"], props);

  let { PageSection } = handleComponentsProp(components, {
    PageSection: DefaultPageSection,
  });

  if (!moduleRows?.length) {
    return null;
  }

  // let allRowsHaveSameBackground = moduleRows.every((row, _, rows) => row.background === rows[0].background)

  return (
    <MaybeFragment {...restProps}>
      <modularityAreaContext.Provider value={{ ...context }}>
        {moduleRows.map(({ modules, background }, rowIndex) => {
          // let isFirstSection = rowIndex === 0;
          // let isLastSection = rowIndex === moduleRows.length - 1;
          return (
            <modularityRowContext.Provider
              key={rowIndex}
              value={{ modules, index: rowIndex }}
            >
              <PageSection
                background={background}
                spacing={sectionPadding}
                className={clsx({
                  "wsui-modularity-area-page-section": true,
                })}
              >
                <PageGrid
                  key={rowIndex}
                  as="div"
                  rowGap={gap}
                  maxColspan={maxColspan}
                  {...pageGridProps}
                >
                  {modules.map(
                    ({ hidden, module, colspan, ...rest }, index) => {
                      return (
                        <PageGridItem
                          key={index}
                          colspan={colspan || defaultColspan}
                        >
                          <Section
                            adjustLevel={
                              promoteFirstHeading &&
                              rowIndex === 0 &&
                              index === 0
                                ? -1
                                : 0
                            }
                          >
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
                          </Section>
                        </PageGridItem>
                      );
                    },
                  )}
                </PageGrid>
              </PageSection>
            </modularityRowContext.Provider>
          );
        })}
      </modularityAreaContext.Provider>
    </MaybeFragment>
  );
}
