import { Button, withComponentDefaults } from "@whitespace/components";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./ToolbarButton.module.css";

ToolbarButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(ToolbarButton, "toolbarButton");

function ToolbarButton({ children, styles = defaultStyles, ...restProps }) {
  return (
    <Button styles={styles} {...restProps}>
      {children}
    </Button>
  );
}
