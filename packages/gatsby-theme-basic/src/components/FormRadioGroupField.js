import clsx from "clsx";
import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";

import FormFieldDescription from "./FormFieldDescription";
import FormFieldError from "./FormFieldError";
import FormFieldLabel from "./FormFieldLabel";
import FormFieldWrapper from "./FormFieldWrapper";
import * as defaultStyles from "./FormRadioGroupField.module.css";

FormRadioGroupField.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormRadioGroupField({
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
      {({ name, controlProps }) => (
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
                    type="radio"
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
