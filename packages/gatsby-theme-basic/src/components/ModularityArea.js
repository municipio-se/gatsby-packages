import clsx from "clsx";
import React from "react";

import * as defaultStyles from "./ModularityArea.module.css";
import ModuleController from "./ModuleController";

export function ModularityArea({
  styles = defaultStyles,
  className,
  area,
  modules,
  ...restProps
}) {
  return (
    <div className={clsx(styles.component, className)}>
      {!!modules &&
        modules.map(({ hidden, node: module, columnWidth }) => {
          if (hidden || !module) {
            return null;
          }
          return (
            <div key={module.id}>
              <ModuleController
                moduleType={module?.contentType?.node?.name}
                module={module}
              />
            </div>
          );
        })}
    </div>
  );
}
