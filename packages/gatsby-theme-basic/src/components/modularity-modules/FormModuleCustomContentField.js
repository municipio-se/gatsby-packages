import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./FormModuleCustomContentField.module.css";

FormModuleCustomContentField.propTypes = {
  field: PropTypes.shape({
    content: PropTypes.string,
  }),
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormModuleCustomContentField({
  field: {
    content,
    // conditionalLogic,
    // conditonalField,
  },
  className,
  styles = defaultStyles,
  ...restProps
}) {
  const { processContent } = useHTMLProcessor();
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      {processContent(content)}
    </div>
  );
}
