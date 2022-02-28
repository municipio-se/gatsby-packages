import useID from "@municipio/gatsby-theme-basic/src/hooks/id";
import clsx from "clsx";
import { useField } from "formik";
import PropTypes from "prop-types";
import React from "react";

import formFieldContext from "../contexts/formFieldContext";

import * as defaultStyles from "./FormFieldWrapper.module.css";

FormFieldWrapper.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  description: PropTypes.node,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormFieldWrapper({
  as: Component = "div",
  children,
  className,
  description,
  label,
  name,
  required,
  styles = defaultStyles,
  ...restProps
}) {
  const id = useID();
  const [input, meta, helpers] = useField({ name, multiple: true });

  const context = {
    description,
    helpers,
    id,
    input,
    label,
    meta,
    name,
    required,
    controlProps: {
      required,
      "aria-controls": id(`errors`),
      "aria-required": required,
      "aria-invalid": meta.touched && meta.error,
      "aria-describedby": description && id(`description`),
    },
  };

  return (
    <Component
      className={clsx(
        styles.component,
        required && styles.required,
        meta.error && meta.touched && styles.error,
        className,
      )}
      {...restProps}
    >
      <formFieldContext.Provider value={context}>
        {children(context)}
      </formFieldContext.Provider>
    </Component>
  );
}
