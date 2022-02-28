import kebabCase from "lodash/kebabCase";
import PropTypes from "prop-types";
import React from "react";

import FormTextField from "../FormTextField";

FormModuleMessageField.propTypes = {
  field: PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
  }),
};

export default function FormModuleMessageField({
  field: { label, description, required },
  ...restProps
}) {
  return (
    <FormTextField
      description={description}
      label={label}
      name={kebabCase(label)}
      required={required}
      {...restProps}
    />
  );
}
