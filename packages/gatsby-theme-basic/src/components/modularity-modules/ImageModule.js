import { H } from "@jfrk/react-heading-levels";
import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import React from "react";

import * as defaultStyles from "./ImageModule.module.css";

export default function ImageModule({
  styles = defaultStyles,
  className,
  title,
  titleProps: { ...titleRestProps } = {},
  ...restProps
}) {
  return (
    <>
      {title && <H {...titleRestProps}>{title}</H>}
      <Image className={clsx(styles.component, className)} {...restProps} />
    </>
  );
}
