import { H } from "@jfrk/react-heading-levels";
import { CoverLink } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Card.module.css";

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  link: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function CardTitle({
  children,
  className,
  link = {},
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <H className={clsx(styles.title, className)} {...restProps}>
      <CoverLink className={styles.titleLink} {...link}>
        {children}
      </CoverLink>
    </H>
  );
}
