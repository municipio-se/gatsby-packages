import { css } from "@emotion/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./RuledList.module.css";

RuledList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  gap: PropTypes.number,
  ruleBottom: PropTypes.bool,
  ruleTop: PropTypes.bool,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function RuledList({
  children,
  className,
  gap,
  ruleBottom,
  ruleTop,
  styles = defaultStyles,
  ...restProps
}) {
  let childCount = React.Children.count(children);
  return (
    <ul
      css={css({
        "--list-gap": gap,
      })}
      className={clsx(
        styles.list,
        ruleTop && styles.ruleTop,
        ruleBottom && styles.ruleBottom,
        className,
      )}
      {...restProps}
    >
      {React.Children.map(children, (child, index) => {
        return (
          <li
            className={clsx(
              styles.item,
              ruleTop && index === 0 && styles.ruleTop,
              ruleBottom && index === childCount - 1 && styles.ruleBottom,
            )}
          >
            {child}
          </li>
        );
      })}
      {/* {React.Children.map(children, (item) => {
      return React.cloneElement(item, {className: clsx(item.props.className, styles.item)})
    })} */}
    </ul>
  );
}
