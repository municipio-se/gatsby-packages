import clsx from "clsx";
import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";

import FormFieldDescription from "./FormFieldDescription";
import FormFieldError from "./FormFieldError";
import FormFieldLabel from "./FormFieldLabel";
import FormFieldWrapper from "./FormFieldWrapper";
import * as defaultStyles from "./FormInputField.module.css";

FormInputField.propTypes = {
  className: PropTypes.string,
  inputProps: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
  type: PropTypes.string,
};

export default function FormInputField({
  className,
  inputProps,
  styles = defaultStyles,
  type,
  ...restProps
}) {
  return (
    <FormFieldWrapper
      className={clsx(styles.component, className)}
      {...restProps}
    >
      {({ name, controlProps }) => (
        <>
          <FormFieldLabel className={styles.label} />
          <FormFieldDescription className={styles.description} />
          <FormFieldError className={styles.error} />
          <div className={styles.control}>
            <Field
              type={type}
              className={styles.input}
              name={name}
              {...controlProps}
              {...inputProps}
            />
          </div>
        </>
      )}
    </FormFieldWrapper>
  );
}
