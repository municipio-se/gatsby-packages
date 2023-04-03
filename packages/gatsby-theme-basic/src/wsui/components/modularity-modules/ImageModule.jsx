import {
  Image,
  TextContent,
} from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import React from "react";

import ModuleWrapper from "../ModuleWrapper.jsx";

export default function ImageModule({ module = {}, title, ...restProps }) {
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

  return (
    <ModuleWrapper title={title} {...restProps}>
      <Image
        alt={alt}
        base64={base64}
        caption={<TextContent>{modImageCaption || caption}</TextContent>}
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
