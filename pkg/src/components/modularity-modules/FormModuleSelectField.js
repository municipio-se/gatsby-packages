import { useField } from "formik";
import kebabCase from "lodash/kebabCase";
import React from "react";

import SelectField from "../FormFields/SelectField";

export default function FormModuleSelectField({
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
    <SelectField
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
