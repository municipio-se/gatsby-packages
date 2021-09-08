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
          <div className={styles.hasIcon}>
            <Icon name={noticeType} className={styles.icon} />
            <span>{title}</span>
          </div>
        )
      }
      styles={styles}
      css={{
        "--box-background": `var(--color-${noticeType})`,
        "--box-color": `var(--color-${noticeType}-foreground, #ffffff)`,
      }}
      {...restProps}
    >
      <div className={clsx(styles.content, !title && styles.hasIcon)}>
        {!title && <Icon name={noticeType} className={styles.icon} />}
        {noticeText}
      </div>
    </ModuleWrapper>
  );
}
