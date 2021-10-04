import { css } from "@emotion/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./VideoIframe.module.css";

VideoIframe.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  url: PropTypes.string,
  aspectRatio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default function VideoIframe({
  styles = defaultStyles,
  className,
  url,
  aspectRatio = "16/9",
  ...restProps
}) {
  return (
    <iframe
      className={clsx(styles.component, className)}
      {...restProps}
      css={css({
        aspectRatio: aspectRatio.toString(),
      })}
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowtransparency="true"
      allowFullScreen
    />
  );
}
