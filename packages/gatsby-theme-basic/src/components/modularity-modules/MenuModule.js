import { DashboardMenu } from "@whitespace/components";
import usePages from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/pages";
import { getPage } from "@whitespace/gatsby-theme-wordpress-basic/src/utils/pageTree";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./MenuModule.module.css";

MenuModule.propTypes = {
  className: PropTypes.string,
  module: PropTypes.shape({
    menu: PropTypes.shape({ contacts: PropTypes.array }),
  }),
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.node,
  transformMenuItem: PropTypes.func,
};

function defaultTransformMenuItem(menuItem, { pages }) {
  let { connectedNode, label, description, url, target, ...rest } = menuItem;
  let { contentType: { node: { name: type = "custom" } = {} } = {}, id } =
    connectedNode?.node || {};
  let content = type === "page" ? getPage(pages, id) : {};
  return {
    type,
    url,
    target: connectedNode?.node?.id ? target : "_blank",
    ...content,
    label,
    description: description || (content && content.description),
    ...rest,
  };
}

export default function MenuModule({
  className,
  module = {},
  styles = defaultStyles,
  title,
  transformMenuItem = defaultTransformMenuItem,
  ...restProps
}) {
  const pages = usePages();
  const { menu } = module;

  let menuItems = menu?.node?.menuItems?.nodes?.map((node) =>
    transformMenuItem(node, { pages }),
  );

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <DashboardMenu items={menuItems} />
    </ModuleWrapper>
  );
}
