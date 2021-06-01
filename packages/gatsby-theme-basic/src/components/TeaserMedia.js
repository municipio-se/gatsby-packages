import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { useComponentContext } from "../contexts/componentContext";

TeaserMedia.propTypes = {
  className: PropTypes.string,
  image: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function TeaserMedia({
  className,
  image,
  styles,
  ...restProps
}) {
  let { styles: defaultStyles = {} } = useComponentContext("teaser");
  styles = styles ?? defaultStyles;
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
