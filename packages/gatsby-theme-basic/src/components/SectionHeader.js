import { H } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./SectionHeader.module.css";

SectionHeader.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.node,
};

export default function SectionHeader({
  styles = defaultStyles,
  className,
  title,
  ...restProps
}) {
  if (!title) {
    return null;
  }
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <div>{title && <H>{title}</H>}</div>
    </div>
  );
}
