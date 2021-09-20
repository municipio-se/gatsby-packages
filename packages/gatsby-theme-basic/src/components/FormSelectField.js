import clsx from "clsx";
import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";

import FormFieldDescription from "./FormFieldDescription";
import FormFieldError from "./FormFieldError";
import FormFieldLabel from "./FormFieldLabel";
import FormFieldWrapper from "./FormFieldWrapper";
import * as defaultStyles from "./FormSelectField.module.css";

FormSelectField.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function FormSelectField({
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
        <>
          <FormFieldLabel className={styles.label} />
          <FormFieldDescription className={styles.description} />
          <FormFieldError className={styles.error} />
          <div className={styles.control}>
            <Field
              as="select"
              className={styles.input}
              name={name}
              {...controlProps}
            >
              <option value="">Välj ett alternativ</option>
              {options
                ? options.map((option) => {
                    return (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    );
                  })
                : null}
            </Field>
          </div>
        </>
      )}
    </FormFieldWrapper>
  );
}
