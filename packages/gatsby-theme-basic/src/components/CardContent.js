import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Card.module.css";

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function CardContent({
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <div className={clsx(styles.content, className)} {...restProps}>
      {children}
    </div>
  );
}
