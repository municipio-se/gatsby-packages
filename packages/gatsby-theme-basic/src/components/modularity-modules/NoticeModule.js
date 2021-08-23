import { Icon } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import Box from "../Box";
import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./NoticeModule.module.css";

NoticeModule.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
  module: PropTypes.shape({
    modNoticeOptions: PropTypes.shape({
      noticeText: PropTypes.string,
      noticeType: PropTypes.string.isRequired,
    }),
  }),
};

export default function NoticeModule({
  className,
  module: {
    modNoticeOptions: { noticeText, noticeType },
  },
  styles = defaultStyles,
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
