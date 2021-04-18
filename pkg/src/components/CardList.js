import { H } from "@jfrk/react-heading-levels";
import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import React from "react";

import Excerpt from "./Excerpt";

export default function CardList({
  className,
  title,
  excerpt,
  date,
  url,
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
          {excerpt && <Excerpt text={excerpt} />}
        </div>
      )}
    </article>
  );
}
