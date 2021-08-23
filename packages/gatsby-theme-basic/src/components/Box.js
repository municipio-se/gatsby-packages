import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Box.module.css";

Box.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};

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
