import cx from "classnames";
import React from "react";

import useID from "../../hooks/id";

export default function Checkbox({
  meta: {
    error,
    // initialError,
    // initialTouched,
    // initialValue,
    touched,
  } = {},
  helpers,
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
        "c-form-field c-form-field--checkbox",
        required && "c-form-field--required",
        error && touched && "c-form-field--error",
      )}
    >
      <fieldset
        className="c-form-field__checkbox-wrapper"
        aria-required={required}
        aria-describedby={description && id(`${name}-description`)}
        aria-invalid={error && touched && true}
      >
        <legend className="c-form-field__label">{label}</legend>
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
        <div
          className="c-form-field__field"
          aria-controls={id(`${name}-errors`)}
        >
          {options.map((option) => {
            return (
              <label className="c-form-field__checkbox-label" key={option}>
                <input
                  className="c-form-field__checkbox"
                  type="checkbox"
                  name={name}
                  value={option}
                  checked={value.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) helpers.push(option);
                    else {
                      const itemKey = value.indexOf(option);
                      helpers.remove(itemKey);
                    }
                  }}
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
