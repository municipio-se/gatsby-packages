import { useField } from "formik";
import kebabCase from "lodash/kebabCase";
import React from "react";

import RadioGroup from "../FormFields/RadioGroup";

export default function FormModuleRadioField({
  field: {
    label,
    description,
    required,
    values,
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
  let options = values.map(({ value }) => value);
  return (
    <RadioGroup
      {...field}
      meta={meta}
      label={label}
      // helpers={helpers}
      required={required}
      description={description}
      options={options}
      {...restProps}
    />
  );
}
