import { Icon } from "@whitespace/components/src";
import cx from "classnames";
import React from "react";

import useID from "../../hooks/id";

export default function SelectField({
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
  ...restProps
}) {
  const id = useID();
  return (
    <div
      className={cx(
        "c-form-field c-form-field--select",
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
        aria-label={`Felmeddelanden för ${label}`}
        aria-live="polite"
      >
        {error && touched ? (
          <p className="c-form-field__field-error-message">{error}</p>
        ) : null}
      </div>
      <div className="c-form-field__field-wrapper">
        <select
          className="c-form-field__field"
          name={name}
          id={id(name)}
          aria-describedby={description && id(`${name}-description`)}
          required={required && "required"}
          aria-invalid={error && true}
          aria-controls={id(`${name}-errors`)}
          {...restProps}
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
        </select>
        <Icon name="arrow-down-1" className="c-form-field__icon" />
      </div>
    </div>
  );
}
