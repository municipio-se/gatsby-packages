// import { Icon, RoundIcon } from "gatsby-theme-municipio/src/components/Icon";
// import { FluidImage } from "gatsby-theme-municipio/src/components/Image";
import React from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import cx from "classnames";

import { Icon } from "@whitespace/components/src";
import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";

// import Logo from "../Logo/Logo";
import IconAvatar from "../../icons/avatar.svg";
import IconChevronDown from "../../icons/chevron-down.svg";

// import "./Header.scss";
import "./Header.module.css";

export default function Header({ image, ...restProps }) {
  const dropdownMenu = [
    {
      url: "/",
      label: "Dina uppgifter",
    },
    {
      url: "/",
      label: "Logga ut",
    },
  ];

  const { buttonProps, itemProps, isOpen } = useDropdownMenu(
    dropdownMenu.length,
  );

  delete buttonProps.ref;

  return (
    <header className={cx("header header--sticky")} {...restProps}>
      <div className={cx("header__wrapper")}>
        {/* <Logo className={cx("header__logo")} linkTo="/" /> */}
        <div
          className={cx("header__dropdown-trigger")}
          {...buttonProps}
          aria-controls="dropdown"
        >
          {image && image.src ? (
            <Image
              base64={image.base64}
              src={image.src}
              srcSet={image.srcSet}
              srcWebp={image.srcWebp}
              srcSetWebp={image.srcSetWebp}
              width="28"
              height="28"
              alt={image.altText}
              className={cx("header__image")}
            />
          ) : (
            <Icon
              src={IconAvatar}
              className={cx("header__image")}
              color="var(--logo-foreground)"
              // bgColor="var(--logo-background)"
              size="28px"
            />
          )}
          <Icon
            src={IconChevronDown}
            className={cx("header__dropdown-icon", "transparent")}
            size="12px"
          />
        </div>
      </div>
      <nav
        id="dropdown"
        className={cx("header__dropdown", isOpen && "--open")}
        aria-label="AnvändarMeny"
      >
        <ul className={cx("header__dropdown-list")}>
          {dropdownMenu.length > 0 &&
            dropdownMenu.map((item, index) => (
              <li className={cx("header__dropdown-list-item")} key={index}>
                <a
                  className={cx("header__dropdown-link")}
                  href={item.url}
                  {...itemProps[index]}
                >
                  {item.label}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}
