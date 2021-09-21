import { css } from "@emotion/react";
import { useComponentSize } from "@whitespace/gatsby-hooks";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Children, Fragment, useMemo, useRef } from "react";

import * as defaultStyles from "./Grid.module.css";

function useComputedCSSGridColumns(ref, deps) {
  const { width } = useComponentSize(ref);
  return useMemo(() => {
    if (
      typeof window === "undefined" ||
      !window.getComputedStyle ||
      !ref.current
    ) {
      return;
    }
    let { gridTemplateColumns } = window.getComputedStyle(ref.current);
    return gridTemplateColumns.split(/\s+/g).map((width) => ({
      width: parseFloat(width),
    }));
  }, [width, ...deps]);
}

Grid.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  columnMinWidth: PropTypes.number,
  components: PropTypes.objectOf(PropTypes.elementType),
  gap: PropTypes.number,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function Grid({
  as: Wrapper = "ul",
  children,
  className,
  columnMinWidth,
  components: { ItemWrapper = null } = { ItemWrapper: null },
  gap,
  styles = defaultStyles,
  ...restProps
}) {
  const ref = useRef();
  const columns = useComputedCSSGridColumns(ref, [
    columnMinWidth,
    gap,
    className,
    JSON.stringify(styles),
  ]);
  if (ItemWrapper == null) {
    ItemWrapper = Wrapper === "ul" || Wrapper === "ol" ? "li" : Fragment;
  }
  return (
    <Wrapper
      ref={ref}
      className={clsx(styles.component, styles.list, className)}
      css={css({
        "--grid-column-min-width": columnMinWidth,
        "--grid-gap": gap,
      })}
      {...restProps}
    >
      {Children.map(
        typeof children === "function" ? children({ columns }) : children,
        (child, index) => {
          return (
            child && (
              <ItemWrapper key={index} className={styles.item}>
                {child}
              </ItemWrapper>
            )
          );
        },
      )}
    </Wrapper>
  );
}
