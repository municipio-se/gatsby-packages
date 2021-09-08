import { css } from "@emotion/react";
import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Card from "../../Card";
import CardContent from "../../CardContent";
import CardMedia from "../../CardMedia";
import CardMeta from "../../CardMeta";
import CardTitle from "../../CardTitle";
import Taxonomies from "../../Taxonomies";

import * as defaultStyles from "./IndexPostsModule.module.css";

IndexPostsModuleCard.propTypes = {
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
  visibleFields: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function IndexPostsModuleCard({
  dateFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  item,
  visibleFields,
  styles = defaultStyles,
  ...restProps
}) {
  const { dateGmt, excerpt, image, title, url, theme, taxonomies } = item;
  let showDate = visibleFields.includes("date");
  let showImage = visibleFields.includes("image");
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
      {...restProps}
    >
      {showImage && <CardMedia image={image} />}
      <CardContent>
        <CardTitle link={{ url }}>{title}</CardTitle>
        {showDate && dateGmt && (
          <CardMeta>
            <Time
              className={clsx(styles.date)}
              date={dateGmt}
              format={dateFormat}
            />
          </CardMeta>
        )}
        <p className={clsx(styles.excerpt)}>{excerpt}</p>
        {taxonomies && taxonomies.length > 0 && (
          <Taxonomies taxonomies={taxonomies} />
        )}
      </CardContent>
    </Card>
  );
}
