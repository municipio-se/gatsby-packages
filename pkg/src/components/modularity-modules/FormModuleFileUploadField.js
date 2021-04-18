import { useField } from "formik";
import kebabCase from "lodash/kebabCase";
import React from "react";

import FileUploadField from "../FormFields/FileUploadField";

export default function FormModuleFileUploadField({
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
    <FileUploadField
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
