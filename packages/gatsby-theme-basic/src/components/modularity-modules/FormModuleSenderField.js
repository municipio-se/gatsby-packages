import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import FormInputField from "../FormInputField";

FormModuleSenderField.propTypes = {
  field: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    requiredFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    customSenderLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  }),
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

import * as defaultStyles from "./FormModuleSenderField.module.css";

// eslint-disable-next-line react/prop-types
function FormModuleSenderFirstnameField({ customLabel, ...restProps }) {
  return (
    <FormInputField
      {...restProps}
      label={customLabel || "Förnamn"}
      name="fornamn"
    />
  );
}

// eslint-disable-next-line react/prop-types
function FormModuleSenderLastnameField({ customLabel, ...restProps }) {
  return (
    <FormInputField
      {...restProps}
      label={customLabel || "Efternamn"}
      name="efternamn"
    />
  );
}

// eslint-disable-next-line react/prop-types
function FormModuleSenderEmailField({ customLabel, ...restProps }) {
  return (
    <FormInputField
      {...restProps}
      type="email"
      label={customLabel || "E-post"}
      name="e-post"
    />
  );
}

// eslint-disable-next-line react/prop-types
function FormModuleSenderPhoneField({ customLabel, ...restProps }) {
  return (
    <FormInputField
      {...restProps}
      type="phone"
      label={customLabel || "Telefonnummer"}
      name="telefonnummer"
    />
  );
}

function FormModuleSenderAddressStreetAddressField({
  // eslint-disable-next-line react/prop-types
  customLabel,
  ...restProps
}) {
  return (
    <FormInputField
      {...restProps}
      label={customLabel || "Gatuadress"}
      name="adress.gatuadress"
    />
  );
}

// eslint-disable-next-line react/prop-types
function FormModuleSenderAddressPostalCodeField({ customLabel, ...restProps }) {
  return (
    <FormInputField
      {...restProps}
      label={customLabel || "Postnummer"}
      name={"adress.postnummer"}
    />
  );
}

// eslint-disable-next-line react/prop-types
function FormModuleSenderAddressCityField({ customLabel, ...restProps }) {
  return (
    <FormInputField
      {...restProps}
      label={customLabel || "Stad"}
      name={"adress.stad"}
    />
  );
}

export default function FormModuleSenderField({
  field: {
    fields,
    requiredFields,
    customSenderLabels: { addSenderLabels, ...labels },
  },
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      {fields.includes("firstname") ? (
        <FormModuleSenderFirstnameField
          required={requiredFields && requiredFields.includes("firstname")}
          customLabel={addSenderLabels && labels["firstname"]}
        />
      ) : null}
      {fields.includes("lastname") ? (
        <FormModuleSenderLastnameField
          required={requiredFields && requiredFields.includes("lastname")}
          customLabel={addSenderLabels && labels["lastname"]}
        />
      ) : null}
      {fields.includes("email") ? (
        <FormModuleSenderEmailField
          required={requiredFields && requiredFields.includes("email")}
          customLabel={addSenderLabels && labels["email"]}
        />
      ) : null}
      {fields.includes("phone") ? (
        <FormModuleSenderPhoneField
          required={requiredFields && requiredFields.includes("phone")}
          customLabel={addSenderLabels && labels["phone"]}
        />
      ) : null}
      {fields.includes("address") ? (
        <>
          <FormModuleSenderAddressStreetAddressField
            required={requiredFields && requiredFields.includes("address")}
            customLabel={addSenderLabels && labels["streetAddress"]}
          />
          <FormModuleSenderAddressPostalCodeField
            required={requiredFields && requiredFields.includes("address")}
            customLabel={addSenderLabels && labels["postalCode"]}
          />
          <FormModuleSenderAddressCityField
            required={requiredFields && requiredFields.includes("address")}
            customLabel={addSenderLabels && labels["city"]}
          />
        </>
      ) : null}
    </div>
  );
}
