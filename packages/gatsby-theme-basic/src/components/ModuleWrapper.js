import { H, Section } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./ModuleWrapper.module.css";

export default function ModuleWrapper({
  as: Component = "div",
  children,
  className,
  styles = defaultStyles,
  title,
  ...restProps
}) {
  // TODO: implement columnWidth
  // const { columnWidth } = useModularityModule()

  const MaybeSection = title ? Section : React.Fragment;

  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      {!!title &&
        (typeof title === "function" ? (
          title({ H })
        ) : (
          <H className={styles.title}>{title}</H>
        ))}
      <MaybeSection>{children}</MaybeSection>
    </Component>
  );
}

ModuleWrapper.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  module: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
