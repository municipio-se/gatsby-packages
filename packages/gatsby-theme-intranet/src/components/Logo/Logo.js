import { Link } from "@whitespace/components/src";
import clsx from "clsx";
import React, { useRef } from "react";

import * as styles from "./Logo.module.css";
import RiksarkivetLogo from "./RiksarkivetLogo";

export default function Logo({
  color = "currentColor",
  // align = "left",
  className,
  linkTo,
  linkProps: { ...linkRestProps } = {},
  "aria-label": ariaLabel,
  ...restProps
}) {
  let ref = useRef(null);

  return (
    <div className={clsx(styles.component, className)} ref={ref} {...restProps}>
      <Link
        to={linkTo}
        className={clsx(styles.link)}
        // fallbackElement="span"
        aria-label={ariaLabel}
        {...linkRestProps}
      >
        <RiksarkivetLogo color={color} />
      </Link>
    </div>
  );
}
