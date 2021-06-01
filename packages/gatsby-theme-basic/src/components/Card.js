import clsx from "clsx";
import React from "react";

import Box from "./Box";
import * as defaultStyles from "./Card.module.css";

export default function Card({
  as: Component = "article",
  styles = defaultStyles,
  className,
  children,
  ...restProps
}) {
  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      {children}
    </Component>
  );
}
