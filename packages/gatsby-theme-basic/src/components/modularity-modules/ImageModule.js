import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
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
    modImageOptions: {
      modImageImage: {
        altText,
        base64,
        caption,
        height,
        src,
        srcSet,
        srcSetWebp,
        width,
      } = {},
      modImageLinkUrl,
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
        alt={altText}
        base64={base64}
        caption={processedCaption}
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
