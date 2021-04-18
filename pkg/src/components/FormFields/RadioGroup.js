import cx from "classnames";
import React from "react";

import useID from "../../hooks/id";

export default function RadioGroup({
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
  options,
  value,
  ...restProps
}) {
  const id = useID();
  return (
    <div
      className={cx(
        "c-form-field c-form-field--radio",
        required && "c-form-field--required",
        error && touched && "c-form-field--error",
      )}
    >
      <fieldset
        className="c-form-field__radio-group-wrapper"
        aria-describedby={description ? id(`${name}-description`) : null}
        aria-invalid={error && true}
        aria-controls={id(`${name}-errors`)}
        aria-required={required}
      >
        <legend className="c-form-field__label">{label}</legend>
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
          aria-label={`Felmeddelanden för ${label}`}
          aria-live="polite"
        >
          {error && touched && (
            <p className="c-form-field__field-error-message">{error}</p>
          )}
        </div>
        <div className="c-form-field__field">
          {options.map((option) => {
            return (
              <label className="c-form-field__radio-label" key={option}>
                <input
                  className="c-form-field__radio"
                  type="radio"
                  name={name}
                  value={option}
                  checked={option === value}
                  {...restProps}
                />
                <span className="checkmark" />
                {option}
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
