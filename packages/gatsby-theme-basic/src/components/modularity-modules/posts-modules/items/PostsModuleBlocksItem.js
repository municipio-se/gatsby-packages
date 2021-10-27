import { css } from "@emotion/react";
import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Card from "../../../Card";
import CardContent from "../../../CardContent";
import CardMeta from "../../../CardMeta";
import CardTitle from "../../../CardTitle";
import Excerpt from "../../../Excerpt";

import * as defaultStyles from "./PostsModuleBlocksItem.module.css";

PostsModuleBlocksItem.propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.objectOf(PropTypes.string),
  item: PropTypes.shape({
    content: PropTypes.node,
    dateGmt: PropTypes.string,
    excerpt: PropTypes.node,
    image: PropTypes.object,
    theme: PropTypes.string,
    title: PropTypes.node,
    url: PropTypes.string,
  }),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function PostsModuleBlocksItem({
  className,
  dateFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  item,
  styles = defaultStyles,
  ...restProps
}) {
  const { dateGmt, excerpt, title, url, theme } = item;

  return (
    <Card
      css={css({
        "--card-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--card-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--card-meta-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
      })}
      className={clsx(styles.component, className)}
      {...restProps}
    >
      <CardContent className={clsx(styles.content)}>
        <CardTitle link={{ url }}>{title}</CardTitle>
        {dateGmt && (
          <CardMeta className={clsx(styles.meta)}>
            <Time
              className={clsx(styles.date)}
              date={dateGmt}
              format={dateFormat}
            />
          </CardMeta>
        )}
        {excerpt && <Excerpt text={excerpt} className={clsx(styles.excerpt)} />}
      </CardContent>
    </Card>
  );
}
