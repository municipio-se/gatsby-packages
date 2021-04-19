import { Icon } from "@whitespace/components/src";
import cx from "classnames";
import React from "react";

import useID from "../../hooks/id";

export default function InputField({
  meta: {
    error,
    // initialError,
    // initialTouched,
    // initialValue,
    touched,
  } = {},
  label,
  description,
  name,
  required,
  type = "text",
  // helpers: { setError, setTouched, setValue } = {},
  ...restProps
}) {
  const id = useID();
  if (!name) {
    return null;
  }
  return (
    <div
      className={cx(
        "c-form-field c-form-field--input",
        required && "c-form-field--required",
        error && touched && "c-form-field--error",
      )}
    >
      <label htmlFor={id(name)} className="c-form-field__label">
        {label}
      </label>
      {description ? (
        <p
          className="c-form-field__field-description"
          id={id(`${name}-description`)}
        >
          {description}
        </p>
      ) : null}
      <div
        className="c-form-field__field-error"
        role="region"
        id={id(`${name}-errors`)}
        aria-label={`Felmeddelanden för "${label}"`}
        aria-live="polite"
      >
        {error && touched ? (
          <p className="c-form-field__field-error-message">{error}</p>
        ) : null}
      </div>
      <div className="c-form-field__field-wrapper">
        <input
          className="c-form-field__field"
          name={name}
          id={id(name)}
          type={type}
          aria-describedby={description ? id(`${name}-description`) : null}
          required={required}
          aria-invalid={!!error}
          aria-controls={id(`${name}-errors`)}
          {...restProps}
        />
        {error && touched && (
          <Icon name="alert-circle" className="c-form-field__icon" />
        )}
      </div>
    </div>
  );
}
