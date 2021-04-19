import cx from "classnames";
import React from "react";

import useID from "../../hooks/id";

export default function TextField({
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
  // helpers: { setError, setTouched, setValue } = {},
  ...restProps
}) {
  const id = useID();
  return (
    <div
      className={cx(
        "c-form-field c-form-field--text",
        required && "c-form-field--required",
        error && touched && "c-form-field--error",
      )}
    >
      <label htmlFor={id(name)} className="c-form-field__label">
        {label}
      </label>
      {description && (
        <p
          className="c-form-field__field-description"
          id={id(`${name}-description`)}
        >
          {description}
        </p>
      )}
      <div
        className="c-form-field__field-error"
        role="region"
        id={id(`${name}-errors`)}
        aria-label={`Felmeddelanden för ${label}`}
        aria-live="polite"
      >
        {error && touched && (
          <p className="c-form-field__field-error-message">{error}</p>
        )}
      </div>
      <div className="c-form-field__field-wrapper">
        <textarea
          className="c-form-field__field"
          id={id(name)}
          name={name}
          aria-describedby={description && id(`${name}-description`)}
          required={required}
          aria-invalid={!!error}
          aria-controls={id(`${name}-errors`)}
          {...restProps}
        />
      </div>
    </div>
  );
}
