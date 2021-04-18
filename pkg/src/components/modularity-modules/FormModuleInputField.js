import { useField } from "formik";
import kebabCase from "lodash/kebabCase";
import React from "react";

import InputField from "../FormFields/InputField";

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
  const [
    field,
    meta,
    // helpers,
  ] = useField(kebabCase(label));
  const attributes = {};
  switch (valueType) {
    case "range":
    case "number":
      attributes.step = step;
      attributes.min = minValue;
      attributes.max = maxValue;
      break;
    case "date":
      attributes.min = String(minValue).replace(
        /^(\d{4})(\d{2})(\d{2})$/,
        "$1-$2-$3",
      );
      attributes.max = String(maxValue).replace(
        /^(\d{4})(\d{2})(\d{2})$/,
        "$1-$2-$3",
      );
      break;
    case "time":
      attributes.min = minTimeValue;
      attributes.max = maxTimeValue;
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
    <InputField
      {...field}
      meta={meta}
      label={label}
      type={valueType}
      {...attributes}
      // helpers={helpers}
      required={required}
      description={description}
      {...restProps}
    />
  );
}
