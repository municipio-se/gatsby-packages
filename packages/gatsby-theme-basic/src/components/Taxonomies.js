import { Link } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Taxonomies.module.css";

Taxonomies.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  taxonomies: PropTypes.arrayOf(PropTypes.object),
};

export default function Taxonomies({
  taxonomies = [],
  classNames,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <ul
      className={clsx(styles.component, "taxonomies", classNames)}
      {...restProps}
    >
      {taxonomies.map((taxonomy, key) => {
        return (
          <li className={clsx(styles.taxonomy, "taxonomy")} key={key}>
            <Link to={taxonomy.url}>{taxonomy.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
