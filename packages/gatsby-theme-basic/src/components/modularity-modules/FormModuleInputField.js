import kebabCase from "lodash/kebabCase";
import PropTypes from "prop-types";
import React from "react";

import FormInputField from "../FormInputField";

FormModuleInputField.propTypes = {
  field: PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    valueType: PropTypes.string,
    minTimeValue: PropTypes.string,
    maxTimeValue: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    step: PropTypes.number,
  }),
};

export default function FormModuleInputField({
  field: {
    label,
    description,
    required,
    valueType,
    minTimeValue,
    maxTimeValue,
    minValue,
    maxValue,
    step,
    // conditionalLogic,
    // conditonalField,
  },
  ...restProps
}) {
  const inputProps = {};
  switch (valueType) {
    case "range":
    case "number":
      inputProps.step = step;
      inputProps.min = minValue;
      inputProps.max = maxValue;
      break;
    case "date":
      inputProps.min = String(minValue).replace(
        /^(\d{4})(\d{2})(\d{2})$/,
        "$1-$2-$3",
      );
      inputProps.max = String(maxValue).replace(
        /^(\d{4})(\d{2})(\d{2})$/,
        "$1-$2-$3",
      );
      break;
    case "time":
      inputProps.min = minTimeValue;
      inputProps.max = maxTimeValue;
      break;
    // case "text":
    // case "month":
    // case "week":
    // case 'email':
    // case 'tel':
    // case 'color':
    // case 'search':
    // case 'url':
  }
  return (
    <FormInputField
      name={kebabCase(label)}
      label={label}
      type={valueType}
      inputProps={inputProps}
      required={required}
      description={description}
      {...restProps}
    />
  );
}
