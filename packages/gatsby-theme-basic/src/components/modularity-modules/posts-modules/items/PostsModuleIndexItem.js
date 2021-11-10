import { css } from "@emotion/react";
import {
  Card,
  CardContent,
  CardMedia,
  CardMeta,
  CardTitle,
} from "@whitespace/components";
import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Taxonomies from "../../../Taxonomies";

import * as defaultStyles from "./PostsModuleIndexItem.module.css";

PostsModuleIndexItem.propTypes = {
  dateFormat: PropTypes.objectOf(PropTypes.string),
  item: PropTypes.shape({
    content: PropTypes.node,
    dateGmt: PropTypes.string,
    excerpt: PropTypes.node,
    image: PropTypes.object,
    theme: PropTypes.string,
    title: PropTypes.node,
    url: PropTypes.string,
    taxonomies: PropTypes.arrayOf(PropTypes.object),
  }),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function PostsModuleIndexItem({
  dateFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  item,
  styles = defaultStyles,
  ...restProps
}) {
  const { dateGmt, excerpt, image, title, url, theme, taxonomies } = item;
  return (
    <Card
      link={{ url }}
      css={css({
        "--card-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--card-hover-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--card-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--card-hover-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--card-meta-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
      })}
      {...restProps}
    >
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {dateGmt && (
          <CardMeta>
            <Time
              className={clsx(styles.date)}
              date={dateGmt}
              format={dateFormat}
            />
          </CardMeta>
        )}
        {excerpt && <p className={clsx(styles.excerpt)}>{excerpt}</p>}
        {taxonomies && taxonomies.length > 0 && (
          <Taxonomies taxonomies={taxonomies} />
        )}
      </CardContent>
      {image && <CardMedia image={image} />}
    </Card>
  );
}
