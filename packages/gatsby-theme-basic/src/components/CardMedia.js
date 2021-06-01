import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Card.module.css";

CardMedia.propTypes = {
  className: PropTypes.string,
  image: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function CardMedia({
  className,
  image,
  styles = defaultStyles,
  ...restProps
}) {
  if (!image) {
    return null;
  }
  return (
    <Image
      {...image}
      className={clsx(styles.image, className)}
      {...restProps}
      caption={null}
      credit={null}
    />
  );
}
