import { css } from "@emotion/react";
import clsx from "clsx";
import React, { Children } from "react";

import * as defaultStyles from "./Grid.module.css";

export default function Grid({
  styles = defaultStyles,
  className,
  children,
  columnMinWidth,
  gap,
  ...restProps
}) {
  return (
    <ul
      className={clsx(styles.component, styles.list, className)}
      css={css({
        "--grid-column-min-width": columnMinWidth,
        "--grid-gap": gap,
      })}
      {...restProps}
    >
      {Children.map(children, (child, index) => {
        return <li key={index}>{child}</li>;
      })}
    </ul>
  );
}
