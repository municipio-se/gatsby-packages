import { H } from "@jfrk/react-heading-levels";
import { Link } from "@whitespace/components";
import {
  Image,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import React from "react";

import Box from "./Box";
import * as defaultStyles from "./Card.module.css";

export default function Card({
  styles = defaultStyles,
  className,
  title,
  date,
  url,
  description,
  // content,
  image,
  // category,
  ...restProps
}) {
  return (
    <Box
      as="article"
      className={clsx(styles.component, className)}
      {...restProps}
    >
      {image && (
        <Image
          base64={image.base64}
          src={image.src}
          srcSet={image.srcSet}
          srcWebp={image.srcWebp}
          srcSetWebp={image.srcSetWebp}
          aspectRatio={image.aspectRatio}
          width={image.width}
          height={image.height}
          alt={image.altText}
          className={clsx(styles.image)}
        />
      )}
      <div className={clsx(styles.content)}>
        {title && (
          <div className={clsx(styles.title)}>
            <div>
              <H className={clsx(styles.titleHeading)}>
                {url ? (
                  <Link to={url} className={clsx(styles.titleHeadingLink)}>
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </H>
            </div>
            {date && (
              <Time
                className={clsx(styles.date)}
                date={date}
                format={{
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }}
              />
            )}
            {/* {category && (
              <div className={clsx(styles.category)}>
                <RoundIcon
                  name={categoryIconName}
                  size="1rem"
                  color="var(--color-light)"
                  bgColor="var(--color-tertiary)"
                />
                {category}
              </div>
            )} */}
          </div>
        )}
        {description}
      </div>
    </Box>
  );
}
