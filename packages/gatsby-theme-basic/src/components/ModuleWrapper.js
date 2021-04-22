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
  const MaybeSection = title ? Section : React.Fragment;

  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      {!!title && <H>{title}</H>}
      <MaybeSection>{children}</MaybeSection>
    </Component>
  );
}

ModuleWrapper.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.node,
};
