import clsx from "clsx";
import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./FormCheckboxField.module.css";
import FormFieldDescription from "./FormFieldDescription";
import FormFieldError from "./FormFieldError";
import FormFieldLabel from "./FormFieldLabel";
import FormFieldWrapper from "./FormFieldWrapper";

FormCheckboxField.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormCheckboxField({
  className,
  options,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <FormFieldWrapper
      className={clsx(styles.component, className)}
      {...restProps}
    >
      {({ controlProps, name }) => (
        <fieldset className={styles.control} {...controlProps}>
          <FormFieldLabel as="legend" className={styles.label} />
          <FormFieldDescription className={styles.description} />
          <FormFieldError className={styles.error} />
          <div className={styles.list}>
            {options.map((option) => {
              return (
                <label className={styles.itemLabel} key={option}>
                  <Field
                    className={styles.item}
                    type="checkbox"
                    name={name}
                    value={option}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}
    </FormFieldWrapper>
  );
}
