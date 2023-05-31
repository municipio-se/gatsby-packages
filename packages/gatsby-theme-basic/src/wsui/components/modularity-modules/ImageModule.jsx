import {
  Html,
  Image,
  TextContent,
} from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import React from "react";

import ModuleWrapper from "../ModuleWrapper.jsx";

export default function ImageModule({ module = {}, title, ...restProps }) {
  let modImageOptions = module?.modImageOptions;
  let modImageImage = modImageOptions?.modImageImage;

  if (!modImageImage) return null;

  let caption = modImageImage?.caption || modImageOptions?.modImageCaption;
  let alt = modImageImage?.alt;
  let base64 = modImageImage?.base64;
  let credit = modImageImage?.credit;
  let height = modImageImage?.height;
  let linkTo = modImageImage?.link?.url;
  let src = modImageImage?.src;
  let srcSet = modImageImage?.srcSet;
  let srcSetWebp = modImageImage?.srcSetWebp;
  let width = modImageImage?.width;

  if (!src) return null;

  return (
    <ModuleWrapper title={title} {...restProps}>
      <Image
        alt={alt}
        base64={base64}
        caption={
          <TextContent>
            <Html>{caption}</Html>
          </TextContent>
        }
        credit={credit}
        height={height}
        linkTo={linkTo}
        src={src}
        srcSet={srcSet}
        srcSetWebp={srcSetWebp}
        srcWebp={src}
        width={width}
      />
    </ModuleWrapper>
  );
}
