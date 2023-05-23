import { Html } from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import { TypographyBlock } from "@wsui/base";
import clsx from "clsx";
import urlParser from "js-video-url-parser";
import PropTypes from "prop-types";
import React from "react";

import ModuleWrapper from "../ModuleWrapper";
import VideoIframe from "../VideoIframe.js";

import * as defaultStyles from "./VideoModule.module.css";

VideoModule.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
  module: PropTypes.shape({
    modVideoOptions: PropTypes.shape({
      // type: PropTypes.string,
      // videoMp4: PropTypes.shape({
      //   mediaItemUrl: PropTypes.string,
      //   mimeType: PropTypes.string,
      // }),
      embedLink: PropTypes.string,
    }),
    modDescription: PropTypes.shape({
      description: PropTypes.string,
    }),
  }),
};

export default function VideoModule({
  className,
  module = {},
  styles = defaultStyles,
  title,
  ...restProps
}) {
  const {
    modVideoOptions: { embedLink } = {},
    modDescription: { description },
  } = module;
  const url = urlParser.create({
    videoInfo: urlParser.parse(embedLink),
    format: "embed",
  });

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      {description && (
        <TypographyBlock>
          <Html>{description}</Html>
        </TypographyBlock>
      )}
      <VideoIframe url={url} aspectRatio={"16/9"} />
    </ModuleWrapper>
  );
}
