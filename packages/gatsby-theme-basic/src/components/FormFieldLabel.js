import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useFormField from "../hooks/useFormField";

import * as defaultStyles from "./FormFieldLabel.module.css";

FormFieldLabel.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormFieldLabel({
  as: Component = "label",
  className,
  styles = defaultStyles,
  ...restProps
}) {
  const { id, label, name, required } = useFormField();
  return (
    <Component
      className={clsx(styles.component, required && styles.required, className)}
      htmlFor={Component === "label" && id(name)}
      {...restProps}
    >
      {label}
    </Component>
  );
}
