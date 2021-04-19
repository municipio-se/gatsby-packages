import { useField } from "formik";
import kebabCase from "lodash/kebabCase";
import React from "react";

import TextField from "../FormFields/TextField";

export default function FormModuleMessageField({
  field: {
    label,
    description,
    required,
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
  return (
    <TextField
      {...field}
      meta={meta}
      // helpers={helpers}
      required={required}
      label={label}
      description={description}
      {...restProps}
    />
  );
}
