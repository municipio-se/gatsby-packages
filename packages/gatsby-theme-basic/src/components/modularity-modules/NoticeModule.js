import { Icon } from "@whitespace/components/src";
import clsx from "clsx";
import React from "react";

import Box from "../Box";
import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./NoticeModule.module.css";

export default function NoticeModule({
  styles = defaultStyles,
  className,
  module: {
    modNoticeOptions: { noticeText, noticeType },
  },
  title,
  ...restProps
}) {
  return (
    <ModuleWrapper
      as={Box}
      title={
        title && (
          <>
            <Icon name={noticeType} className={styles.icon} />
            <span className={styles.title}>{title}</span>
          </>
        )
      }
      {...restProps}
      className={clsx(styles.component, className)}
      css={{
        "--box-background": `var(--color-${noticeType})`,
        "--box-color": "var(--color-foreground-inverse)",
      }}
    >
      {!title && <Icon name={noticeType} className={styles.icon} />}
      {noticeText}
    </ModuleWrapper>
  );
}
