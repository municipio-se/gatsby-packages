import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useFormField from "../hooks/useFormField";

import * as defaultStyles from "./FormFieldError.module.css";

FormFieldError.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormFieldError({
  as: Component = "div",
  className,
  styles = defaultStyles,
  ...restProps
}) {
  const { meta, description, id, label } = useFormField();
  if (!description) {
    return null;
  }
  return (
    <Component
      className={clsx(styles.component, className)}
      role="region"
      id={id(`errors`)}
      aria-label={`Felmeddelanden för ${label}`}
      aria-live="polite"
      {...restProps}
    >
      {meta.error && meta.touched && (
        <p className={styles.message}>{meta.error}</p>
      )}
    </Component>
  );
}
