import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useFormField from "../hooks/useFormField";

import * as defaultStyles from "./FormFieldDescription.module.css";

FormFieldDescription.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormFieldDescription({
  as: Component = "p",
  className,
  styles = defaultStyles,
  ...restProps
}) {
  const { description, id } = useFormField();
  if (!description) {
    return null;
  }
  return (
    <Component
      className={clsx(styles.component, className)}
      id={id(`description`)}
      {...restProps}
    >
      {description}
    </Component>
  );
}
