import { Link } from "@whitespace/components";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./SidebarNavItem.module.css";

SidebarNavItem.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function SidebarNavItem({
  styles = defaultStyles,
  ...restProps
}) {
  return <Link styles={styles} {...restProps} />;
}
