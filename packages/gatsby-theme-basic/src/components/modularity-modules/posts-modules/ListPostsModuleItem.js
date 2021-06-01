import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import Teaser from "../../Teaser";
import TeaserContent from "../../TeaserContent";
import TeaserMedia from "../../TeaserMedia";
import TeaserMeta from "../../TeaserMeta";
import TeaserTitle from "../../TeaserTitle";

import * as defaultStyles from "./ListPostsModule.module.css";

ListPostsModuleItem.propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.objectOf(PropTypes.string),
  item: PropTypes.shape({
    dateGmt: PropTypes.string,
    excerpt: PropTypes.node,
    image: PropTypes.object,
    title: PropTypes.node,
    url: PropTypes.string,
  }),
  teaserStyles: PropTypes.objectOf(PropTypes.string),
  visibleFields: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function ListPostsModuleItem({
  className,
  dateFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  item,
  styles = defaultStyles,
  teaserStyles,
  visibleFields,
  ...restProps
}) {
  const { dateGmt, excerpt, image, title, url } = item;
  let showDate = visibleFields.includes("date");
  let showImage = visibleFields.includes("image");
  let showExcerpt = visibleFields.includes("excerpt");
  return (
    <Teaser
      className={clsx(className, styles.teaser)}
      styles={teaserStyles}
      {...restProps}
    >
      <TeaserContent>
        <TeaserTitle link={{ url }}>{title}</TeaserTitle>
        {showDate && (
          <TeaserMeta>
            <Time
              className={clsx(styles.date)}
              date={dateGmt}
              format={dateFormat}
            />
          </TeaserMeta>
        )}
        {showExcerpt && excerpt && (
          <p className={clsx(styles.excerpt)}>{excerpt}</p>
        )}
      </TeaserContent>
      {showImage && <TeaserMedia image={image} />}
    </Teaser>
  );
}
