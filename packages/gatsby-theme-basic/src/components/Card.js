import { useComponentWidth } from "@whitespace/components/dist/hooks";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Card.module.css";

Card.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function Card({
  as: Component = "article",
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  const [width, ref] = useComponentWidth();
  const isHorizontal = width >= 768;

  return (
    <Component
      ref={ref}
      className={clsx(
        styles.component,
        isHorizontal && styles.horizontal,
        className,
      )}
      {...restProps}
    >
      {isHorizontal ? (
        <div className={styles.wrapper}>{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}
