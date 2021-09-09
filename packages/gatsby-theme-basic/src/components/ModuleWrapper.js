import { H, Section } from "@jfrk/react-heading-levels";
import { Link, Icon } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import * as defaultStyles from "./ModuleWrapper.module.css";

export default function ModuleWrapper({
  as: Component = "div",
  children,
  className,
  styles = defaultStyles,
  title,
  archive,
  border = true,
  ...restProps
}) {
  // TODO: implement columnWidth
  // const { columnWidth } = useModularityModule()

  const { t } = useTranslation();

  const MaybeSection = title ? Section : React.Fragment;

  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      {!!title && (
        <div className={clsx(styles.header, border && styles.headerBorder)}>
          {typeof title === "function" ? (
            title({ H })
          ) : (
            <H className={styles.title}>{title}</H>
          )}
          {!!archive &&
            (typeof archive === "function" ? (
              archive()
            ) : (
              <Link className={styles.link} to={archive.url}>
                {archive.label}
                <span className={styles.icon}>
                  <Icon name="chevron-right" />
                </span>
              </Link>
            ))}
        </div>
      )}
      <MaybeSection>{children}</MaybeSection>
    </Component>
  );
}

ModuleWrapper.propTypes = {
  archive: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  as: PropTypes.elementType,
  border: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  module: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
