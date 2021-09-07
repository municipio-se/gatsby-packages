import { Link, withComponentDefaults } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Logo.module.css";

Logo.propTypes = {
  "aria-label": PropTypes.string,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  linkProps: PropTypes.object,
  linkTo: PropTypes.any,
  styles: PropTypes.objectOf(PropTypes.string),
};

function DefaultLogo({ ...restProps }) {
  return <span {...restProps}>Municipio</span>;
}

export default withComponentDefaults(Logo, "logo");

function Logo({
  // color = "currentColor",
  // align = "left",
  "aria-label": ariaLabel,
  components: { Logo = DefaultLogo } = {
    Logo: DefaultLogo,
  },
  className,
  linkProps: { ...linkRestProps } = {},
  linkTo,
  styles = defaultStyles,
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
