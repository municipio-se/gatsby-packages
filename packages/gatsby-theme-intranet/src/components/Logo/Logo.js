import { Link } from "@whitespace/components/src";
import clsx from "clsx";
import React from "react";

import * as styles from "./Logo.module.css";

export default function Logo({
  // color = "currentColor",
  // align = "left",
  className,
  linkTo,
  linkProps: { ...linkRestProps } = {},
  "aria-label": ariaLabel,
  ...restProps
}) {
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <Link
        to={linkTo}
        className={clsx(styles.link)}
        // fallbackElement="span"
        aria-label={ariaLabel}
        {...linkRestProps}
      >
        <span className={styles.text}>Municipio</span>
      </Link>
    </div>
  );
}
