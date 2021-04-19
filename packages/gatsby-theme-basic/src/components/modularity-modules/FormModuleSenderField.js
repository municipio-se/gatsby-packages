import { useField } from "formik";
import React from "react";

import InputField from "../FormFields/InputField";

function FormModuleSenderFirstnameField({ customLabel, ...restProps }) {
  const [
    field,
    meta,
    // helpers,
  ] = useField("fornamn");
  return (
    <InputField
      {...field}
      meta={meta}
      // helpers={helpers}
      {...restProps}
      label={customLabel || "Förnamn"}
    />
  );
}

function FormModuleSenderLastnameField({ customLabel, ...restProps }) {
  const [field, meta] = useField("efternamn");
  return (
    <InputField
      {...field}
      meta={meta}
      {...restProps}
      label={customLabel || "Efternamn"}
    />
  );
}

function FormModuleSenderEmailField({ customLabel, ...restProps }) {
  const [field, meta] = useField("e-post");
  return (
    <InputField
      {...field}
      meta={meta}
      {...restProps}
      type="email"
      label={customLabel || "E-post"}
    />
  );
}

function FormModuleSenderPhoneField({ customLabel, ...restProps }) {
  const [field, meta] = useField("telefonnummer");
  return (
    <InputField
      {...field}
      meta={meta}
      {...restProps}
      type="phone"
      label={customLabel || "Telefonnummer"}
    />
  );
}

function FormModuleSenderAddressStreetAddressField({
  customLabel,
  ...restProps
}) {
  const [field, meta] = useField("adress.gatuadress");
  return (
    <InputField
      {...field}
      meta={meta}
      {...restProps}
      label={customLabel || "Gatuadress"}
    />
  );
}

function FormModuleSenderAddressPostalCodeField({ customLabel, ...restProps }) {
  const [field, meta] = useField("adress.postnummer");
  return (
    <InputField
      {...field}
      meta={meta}
      {...restProps}
      label={customLabel || "Postnummer"}
    />
  );
}

function FormModuleSenderAddressCityField({ customLabel, ...restProps }) {
  const [field, meta] = useField("adress.stad");
  return (
    <InputField
      {...field}
      meta={meta}
      {...restProps}
      label={customLabel || "Stad"}
    />
  );
}

export default function FormModuleSenderField({
  field: {
    fields,
    requiredFields,
    customSenderLabels: { addSenderLabels, ...labels },
  },
  ...restProps
}) {
  return (
    <div {...restProps}>
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
