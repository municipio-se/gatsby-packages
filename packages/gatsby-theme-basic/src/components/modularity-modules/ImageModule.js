import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./ImageModule.module.css";

ImageModule.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
  module: PropTypes.shape({
    modImageOptions: PropTypes.shape({
      link: PropTypes.shape({
        url: PropTypes.string,
      }),
      modImageCaption: PropTypes.any,
    }),
  }),
};

export default function ImageModule({
  className,
  module = {},
  styles = defaultStyles,
  title,
  ...restProps
}) {
  const {
    modImageOptions: {
      modImageImage: {
        alt,
        base64,
        caption,
        credit,
        height,
        src,
        srcSet,
        srcSetWebp,
        width,
      } = {},
      link,
      modImageCaption,
    } = {},
  } = module;

  const { processContent } = useHTMLProcessor();
  let processedCaption = processContent(modImageCaption || caption);

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <Image
        alt={alt}
        base64={base64}
        caption={processedCaption}
        className={clsx(styles.image)}
        credit={credit}
        height={height}
        linkTo={link?.url}
        src={src}
        srcSet={srcSet}
        srcSetWebp={srcSetWebp}
        srcWebp={src}
        width={width}
      />
    </ModuleWrapper>
  );
}
