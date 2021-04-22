import clsx from "clsx";
// import { Icon, RoundIcon } from "@whitespace/components/src/components/Icon";
import { Icon } from "@whitespace/components/src/components/Icon";
import { Link } from "@whitespace/components/src/components/Link";
import React from "react";

// import "./Button.scss";

export function Button({
  namespace = "button",
  title,
  className,
  buttonModifier,
  fullSize,
  link,
  roundIcon,
  iconBgColor,
  iconColor,
  iconBeforeName,
  iconAfterName,
  iconBeforeSize,
  iconAfterSize,
  iconClass,
  iconBefore,
  iconAfter,
  isTitleHidden = false,
  ...restProps
}) {
  const iconComponent = (iconName = "chevron-left", iconSize = "16px") => {
    return roundIcon ? (
      // <RoundIcon
      //   name={iconName}
      //   size={iconSize}
      //   color={iconColor}
      //   bgColor={iconBgColor}
      //   className={clsx(iconClass)}
      // />
      <div></div>
    ) : (
      <Icon
        name={iconName}
        size={iconSize}
        color={iconColor}
        className={clsx(iconClass)}
      />
    );
  };

  return link ? (
    <Link
      to={link}
      className={clsx(
        "button",
        buttonModifier && `button--${buttonModifier}`,
        fullSize && "button--block",
        className,
      )}
      {...restProps}
    >
      {iconBefore ? iconComponent(iconBeforeName, iconBeforeSize) : null}
      <span
        className={clsx(
          isTitleHidden && "visually-hidden",
          (iconAfter || iconBefore) && title && !isTitleHidden && "m-l--200",
        )}
      >
        {title}
      </span>
      {iconAfter ? iconComponent(iconAfterName, iconAfterSize) : null}
    </Link>
  ) : (
    <button
      type="button"
      className={clsx(
        "button",
        buttonModifier && `button--${buttonModifier}`,
        className,
        fullSize && "button--block",
      )}
      {...restProps}
    >
      {iconBefore ? iconComponent(iconBeforeName, iconBeforeSize) : null}
      <span
        className={clsx(
          isTitleHidden && "visually-hidden",
          (iconAfter || iconBefore) && title && !isTitleHidden && "m-l--200",
        )}
      >
        {title}
      </span>
      {iconAfter ? iconComponent(iconAfterName, iconAfterSize) : null}
    </button>
  );
}
