import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Card.module.css";

Card.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  contentType: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function Card({
  as: Component = "article",
  children,
  className,
  contentType,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Component
      className={clsx(
        styles.component,
        className,
        contentType && styles[contentType],
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
}
