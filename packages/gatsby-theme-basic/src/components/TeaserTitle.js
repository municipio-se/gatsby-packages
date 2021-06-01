import { H } from "@jfrk/react-heading-levels";
import { CoverLink } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { useComponentContext } from "../contexts/componentContext";

TeaserTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  link: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function TeaserTitle({
  children,
  className,
  link = {},
  styles,
  ...restProps
}) {
  let { styles: defaultStyles = {} } = useComponentContext("teaser");
  styles = styles ?? defaultStyles;
  return (
    <H className={clsx(styles.title, className)} {...restProps}>
      <CoverLink className={styles.titleLink} {...link}>
        {children}
      </CoverLink>
    </H>
  );
}
