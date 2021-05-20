import { Link } from "@whitespace/components";
import withComponentDefaults from "@whitespace/components/dist/withComponentDefaults";
import clsx from "clsx";
import React from "react";

import * as defaultStyles from "./Logo.module.css";

function DefaultLogo({ ...restProps }) {
  return <span {...restProps}>Municipio</span>;
}

export default withComponentDefaults(Logo, "logo");

function Logo({
  // color = "currentColor",
  // align = "left",
  styles = defaultStyles,
  className,
  linkTo,
  linkProps: { ...linkRestProps } = {},
  "aria-label": ariaLabel,
  components: { Logo = DefaultLogo } = {
    Logo: DefaultLogo,
  },
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
        <Logo className={styles.text} />
      </Link>
    </div>
  );
}
