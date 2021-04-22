import clsx from "clsx";
import React from "react";

import * as defaultStyles from "./Box.module.css";

export default function Box({
  as: Component = "div",
  children,
  className,
  style = defaultStyles,
  ...restProps
}) {
  return (
    <Component className={clsx(style.component, className)} {...restProps}>
      {children}
    </Component>
  );
}
