import clsx from "clsx";
import React from "react";

import modularityAreaContext from "../modularityAreaContext";
import modularityModuleContext from "../modularityModuleContext";

import * as defaultStyles from "./ModularityArea.module.css";
import ModuleController from "./ModuleController";

export default function ModularityArea({
  styles = defaultStyles,
  className,
  area = {},
  ...restProps
}) {
  const { modules } = area;
  if (!modules?.length) {
    return null;
  }
  return (
    <modularityAreaContext.Provider value={area}>
      {!!modules && (
        <div className={clsx(styles.component, className)} {...restProps}>
          {modules.map(({ hidden, module, columnWidth, ...rest }, index) => {
            if (hidden || !module) {
              return null;
            }
            return (
              <modularityModuleContext.Provider
                value={{ hidden, module, columnWidth, ...rest }}
                key={index}
              >
                <ModuleController module={module} />
              </modularityModuleContext.Provider>
            );
          })}
        </div>
      )}
    </modularityAreaContext.Provider>
  );
}
