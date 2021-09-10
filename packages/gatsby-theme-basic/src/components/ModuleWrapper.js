import { H, Section } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./ModuleWrapper.module.css";

ModuleWrapper.propTypes = {
  as: PropTypes.elementType,
  border: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  module: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default function ModuleWrapper({
  as: Component = "div",
  children,
  className,
  components: { ModuleWrapperHeader = "div" } = { ModuleWrapperHeader: "div" },
  styles = defaultStyles,
  title,
  ...restProps
}) {
  // TODO: implement columnWidth
  // const { columnWidth } = useModularityModule()

  const MaybeSection = title ? Section : React.Fragment;

  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      {!!title && (
        <ModuleWrapperHeader className={clsx(styles.header)}>
          {typeof title === "function" ? (
            title({ H })
          ) : (
            <H className={styles.title}>{title}</H>
          )}
        </ModuleWrapperHeader>
      )}
      <MaybeSection>{children}</MaybeSection>
    </Component>
  );
}
