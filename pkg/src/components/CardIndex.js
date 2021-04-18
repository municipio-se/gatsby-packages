// import { Link } from "gatsby";
import { H } from "@jfrk/react-heading-levels";
import {
  Image,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import React from "react";

import Excerpt from "./Excerpt";

export default function CardIndex({
  className,
  title,
  date,
  url,
  excerpt,
  content,
  image,
  ...restProps
}) {
  return (
    <article {...restProps}>
      {title && (
        <div>
          <div>
            <H>{url ? <a href={url}>{title}</a> : title}</H>
          </div>
          {date && (
            <Time
              date={date}
              format={{
                month: "long",
                weekday: "long",
                day: "numeric",
              }}
            />
          )}
        </div>
      )}
      {excerpt && <Excerpt text={excerpt} />}
      {content && <div>{content}</div>}
      {image && (
        <Image
          base64={image.base64}
          src={image.src}
          srcSet={image.srcSet}
          srcWebp={image.srcWebp}
          srcSetWebp={image.srcSetWebp}
          width={image.width}
          height={image.height}
          aspectRatio={640 / 360}
          alt={image.altText}
        />
      )}
    </article>
  );
}
