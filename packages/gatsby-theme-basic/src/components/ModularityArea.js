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
    <div
      className={clsx(styles.component, styles[`area-${area}`], className)}
      {...restProps}
    >
      {!!modules &&
        modules.map(({ hidden, node: module, columnWidth }) => {
          // TODO: implement columnWidth
          void columnWidth;
          if (hidden || !module) {
            return null;
          }
          return <ModuleController module={module} key={module.id} />;
        })}
    </div>
  );
}
