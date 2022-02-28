import kebabCase from "lodash/kebabCase";
import PropTypes from "prop-types";
import React from "react";

import FormFileUploadField from "../FormFileUploadField";

FormModuleFileUploadField.propTypes = {
  field: PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
  }),
};

export default function FormModuleFileUploadField({
  field: { description, label, required },
  ...restProps
}) {
  return (
    <FormFileUploadField
      name={kebabCase(label)}
      label={label}
      required={required}
      description={description}
      {...restProps}
    />
  );
}
