import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Card.module.css";

Card.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  horizontal: PropTypes.bool,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function Card({
  as: Component = "article",
  children,
  className,
  styles = defaultStyles,
  horizontal = false,
  ...restProps
}) {
  return (
    <Component
      className={clsx(
        styles.component,
        horizontal && styles.horizontal,
        className,
      )}
      {...restProps}
    >
      {horizontal ? <div className={styles.wrapper}>{children}</div> : children}
    </Component>
  );
}
