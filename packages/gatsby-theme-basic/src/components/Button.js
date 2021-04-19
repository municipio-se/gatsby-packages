import { Link } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import React from "react";

import * as defaultStyles from "./Button.module.css";

export default function Button({
  styles = defaultStyles,
  className,
  title,
  link,
  roundIcon = false,
  iconBgColor,
  iconColor,
  iconBeforeName,
  iconAfterName,
  iconBeforeSize,
  iconAfterSize,
  iconClassName,
  iconBefore,
  iconAfter,
  ...restProps
}) {
  const iconComponent = (iconName = "arrow-right-1", iconSize = "12px") => {
    return roundIcon ? (
      <RoundIcon
        name={iconName}
        size={iconSize}
        color={iconColor}
        bgColor={iconBgColor}
      />
    ) : (
      <Icon name={iconName} size={iconSize} color={iconColor} />
    );
  };

  return (
    <Link
      className={clsx(styles.component, className)}
      to={link}
      {...restProps}
    >
      {iconBefore ? iconComponent(iconBeforeName, iconBeforeSize) : null}
      {title}
      {iconAfter ? iconComponent(iconAfterName, iconAfterSize) : null}
    </Link>
  );
}
