import { H, Section } from "@jfrk/react-heading-levels";
import { Icon } from "@whitespace/components/src";
import clsx from "clsx";
import React from "react";

import Box from "../Box";

import * as defaultStyles from "./NoticeModule.module.css";

export default function NoticeModule({
  styles = defaultStyles,
  className,
  module: {
    noticeSettings: { noticeText, noticeType },
  },
  title,
  ...restProps
}) {
  const MaybeSection = title ? Section : React.Fragment;

  return (
    <Box
      className={clsx(styles.component, className)}
      css={{
        "--box-background": `var(--color-${noticeType})`,
        "--box-color": "var(--color-foreground-inverse)",
      }}
      {...restProps}
    >
      {title ? (
        <H className={styles.heading}>
          <Icon name={noticeType} className={styles.icon} />
          <span className={styles.title}>{title}</span>
        </H>
      ) : (
        <Icon name={noticeType} className={styles.icon} />
      )}
      <MaybeSection>{noticeText}</MaybeSection>
    </Box>
  );
}
