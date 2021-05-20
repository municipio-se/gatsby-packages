// import { Icon, RoundIcon } from "gatsby-theme-municipio/src/components/Icon";
// import { FluidImage } from "gatsby-theme-municipio/src/components/Image";
import { Icon } from "@whitespace/components";
import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import React from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

import Logo from "../Logo/Logo";

import * as styles from "./Header.module.css";

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
    <header className={clsx(styles.component, styles.sticky)} {...restProps}>
      <div className={clsx(styles.wrapper)}>
        <Logo className={clsx(styles.logo)} linkTo="/" />
        <div
          className={clsx(styles.dropdownTrigger)}
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
              className={clsx(styles.image)}
            />
          ) : (
            <Icon
              name="avatar"
              className={clsx(styles.image)}
              color="var(--logo-foreground)"
              // bgColor="var(--logo-background)"
              size="28px"
            />
          )}
          <Icon
            name="chevron-down"
            className={clsx(styles.dropdownIcon, "transparent")}
            size="12px"
          />
        </div>
      </div>
      <nav
        id="dropdown"
        className={clsx(styles.dropdown, isOpen && styles.dropdownOpen)}
        aria-label="AnvändarMeny"
      >
        <ul className={clsx(styles.dropdownList)}>
          {dropdownMenu.length > 0 &&
            dropdownMenu.map((item, index) => (
              <li className={clsx(styles.dropdownListItem)} key={index}>
                <a
                  className={clsx(styles.dropdownLink)}
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
