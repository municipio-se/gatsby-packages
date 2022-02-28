import { parseColumnWidth } from "@municipio/gatsby-theme-basic/src/utils";
import { MaybeFragment, PageGridGroup } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import modularityAreaContext from "../modularityAreaContext";
import modularityModuleContext from "../modularityModuleContext";

import * as defaultStyles from "./ModularityArea.module.css";
import ModuleController from "./ModuleController";

ModularityArea.propTypes = {
  area: PropTypes.any,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function ModularityArea({
  area = {},
  className,
  styles = defaultStyles,
  ...restProps
}) {
  const { modules } = area;
  if (!modules?.length) {
    return null;
  }
  // TODO: Wrap in PageGridGroup components based on columnWidth
  return (
    <modularityAreaContext.Provider value={area}>
      {!!modules && (
        <MaybeFragment
          as="div"
          className={clsx(styles.component, className)}
          {...restProps}
        >
          {modules.map(({ hidden, module, columnWidth, ...rest }, index) => {
            if (hidden || !module) {
              return null;
            }
            const MaybePageGridGroup =
              parseColumnWidth(columnWidth) || area.defaultModuleColSpan
                ? PageGridGroup
                : React.Fragment;
            return (
              <modularityModuleContext.Provider
                value={{ hidden, module, columnWidth, ...rest }}
                key={index}
              >
                <MaybePageGridGroup>
                  <ModuleController module={module} />
                </MaybePageGridGroup>
              </modularityModuleContext.Provider>
            );
          })}
        </MaybeFragment>
      )}
    </modularityAreaContext.Provider>
  );
}
