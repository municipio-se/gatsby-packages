import { H } from "@jfrk/react-heading-levels";
import { Button, Icon } from "@whitespace/components/src";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import React from "react";

import * as defaultStyles from "./NoticeModule.module.css";

export default function NoticeModule({
  styles = defaultStyles,
  className,
  headline,
  description,
  type,
  link,
  hideIcon = false,
  ...restProps
}) {
  const { processContent } = useHTMLProcessor();
  description = processContent(description);

  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <div>
        <div>
          {!hideIcon && <Icon name={type} />}
          {headline && <H>{headline}</H>}
        </div>
        {description && <div>{description}</div>}
      </div>
      {link && (
        <Button
          title={"More information"}
          link={link}
          buttonModifier="light"
          iconBefore={true}
          iconBeforeSize="20px"
          iconAfterSize="12px"
          iconAfter={true}
          iconBeforeName="info"
          iconAfterName="arrow-right-1"
          iconModifier="secondary"
        />
      )}
    </div>
  );
}
