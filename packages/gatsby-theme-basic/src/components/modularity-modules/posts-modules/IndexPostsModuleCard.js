import { css } from "@emotion/react";
import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import { kebabCase, mapKeys, transform } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Card from "../../Card";
import CardContent from "../../CardContent";
import CardMedia from "../../CardMedia";
import CardMeta from "../../CardMeta";
import CardTitle from "../../CardTitle";

import * as defaultStyles from "./IndexPostsModule.module.css";

IndexPostsModuleCard.propTypes = {
  dateFormat: PropTypes.objectOf(PropTypes.string),
  item: PropTypes.shape({
    dateGmt: PropTypes.string,
    content: PropTypes.node,
    image: PropTypes.object,
    title: PropTypes.node,
    url: PropTypes.string,
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
  const { dateGmt, excerpt, image, title, url, theme } = item;
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
      })}
      {...restProps}
    >
      {showImage && <CardMedia image={image} />}
      <CardContent>
        <CardTitle link={{ url }}>{title}</CardTitle>
        {showDate && (
          <CardMeta>
            <Time
              className={clsx(styles.date)}
              date={dateGmt}
              format={dateFormat}
            />
          </CardMeta>
        )}
        <p className={clsx(styles.excerpt)}>{excerpt}</p>
      </CardContent>
    </Card>
  );
}
