import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import React from "react";

import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./ImageModule.module.css";

export default function ImageModule({
  styles = defaultStyles,
  className,
  title,
  module = {},
  ...restProps
}) {
  const {
    image: {
      modImageImage: {
        altText,
        base64,
        caption,
        mediaDetails: { width, height } = {},
        src,
        srcSet,
        srcSetWebp,
      } = {},
      modImageLinkUrl,
      modImageCaption,
    } = {},
  } = module;
  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <Image
        alt={altText}
        base64={base64}
        caption={modImageCaption || caption}
        className={clsx(styles.image)}
        height={height}
        linkTo={modImageLinkUrl}
        src={src}
        srcSet={srcSet}
        srcSetWebp={srcSetWebp}
        srcWebp={src}
        width={width}
      />
    </ModuleWrapper>
  );
}
