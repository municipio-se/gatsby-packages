import kebabCase from "lodash/kebabCase";
import PropTypes from "prop-types";
import React from "react";

import FormSelectField from "../FormSelectField";

FormModuleRadioField.propTypes = {
  field: PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    values: PropTypes.arrayOf(
      PropTypes.shape({ value: PropTypes.string.isRequired }),
    ).isRequired,
  }),
};

export default function FormModuleRadioField({
  field: { description, label, required, values },
  ...restProps
}) {
  let name = kebabCase(label);
  let options = values.map(({ value }) => value);

  return (
    <FormSelectField
      description={description}
      label={label}
      name={name}
      options={options}
      required={required}
      {...restProps}
    />
  );
}
