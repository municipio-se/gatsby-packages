import { H } from "@jfrk/react-heading-levels";
import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import PropTypes from "prop-types";
import React from "react";

import Excerpt from "./Excerpt";

CardList.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  excerpt: PropTypes.any,
  date: PropTypes.any,
  url: PropTypes.string,
};

export default function CardList({ title, excerpt, date, url, ...restProps }) {
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
