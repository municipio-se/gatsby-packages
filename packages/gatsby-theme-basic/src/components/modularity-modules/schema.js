import kebabCase from "lodash/kebabCase";
import * as Yup from "yup";

export function buildInitialValues({ formFields }) {
  let initialValues = {};
  formFields.forEach((field) => {
    switch (field.fieldGroupName) {
      case "modForm_Form_FormFields_Sender":
        {
          let { fields: includedFields } = field;
          if (includedFields && includedFields.includes("firstname")) {
            initialValues["fornamn"] = "";
          }
          if (includedFields && includedFields.includes("lastname")) {
            initialValues["efternamn"] = "";
          }
          if (includedFields && includedFields.includes("email")) {
            initialValues["e-post"] = "";
          }
          if (includedFields && includedFields.includes("phone")) {
            initialValues["telefonnummer"] = "";
          }
          if (includedFields && includedFields.includes("address")) {
            initialValues["adress"] = {
              gatuadress: "",
              postnummer: "",
              stad: "",
            };
          }
        }
        break;
      case "modForm_Form_FormFields_Message":
      case "modForm_Form_FormFields_Input":
      case "modForm_Form_FormFields_Radio":
      case "modForm_Form_FormFields_Select":
        {
          let { label } = field;
          initialValues[kebabCase(label)] = "";
        }
        break;
      case "modForm_Form_FormFields_Checkbox":
        {
          let { label } = field;
          initialValues[kebabCase(label)] = [];
        }
        break;
      default: {
        // Skip
      }
    }
  });
  return initialValues;
}

function setRequiredOrNullable(schema, required) {
  if (required) {
    schema = schema.required("Du måste fylla i fältet");
  } else {
    schema = schema.nullable();
  }
  return schema;
}

export function buildSchema({ formFields }) {
  let schemaShape = {};
  formFields.forEach((field) => {
    switch (field.fieldGroupName) {
      case "modForm_Form_FormFields_Sender":
        {
          let { fields: includedFields, requiredFields } = field;
          if (includedFields && includedFields.includes("firstname")) {
            schemaShape["fornamn"] = setRequiredOrNullable(
              Yup.string(),
              requiredFields && requiredFields.includes("firstname"),
            );
          }
          if (includedFields && includedFields.includes("lastname")) {
            schemaShape["efternamn"] = setRequiredOrNullable(
              Yup.string(),
              requiredFields && requiredFields.includes("lastname"),
            );
          }
          if (includedFields && includedFields.includes("email")) {
            schemaShape["e-post"] = setRequiredOrNullable(
              Yup.string().email("Fyll i en giltig e-postadress"),
              requiredFields && requiredFields.includes("email"),
            );
          }
          if (includedFields && includedFields.includes("phone")) {
            schemaShape["telefonnummer"] = setRequiredOrNullable(
              Yup.string(),
              requiredFields && requiredFields.includes("phone"),
            );
          }
          if (includedFields && includedFields.includes("address")) {
            let required = requiredFields && requiredFields.includes("address");
            schemaShape["adress"] = Yup.object().shape({
              gatuadress: setRequiredOrNullable(Yup.string(), required),
              postnummer: setRequiredOrNullable(Yup.string(), required),
              stad: setRequiredOrNullable(Yup.string(), required),
            });
          }
        }
        break;
      case "modForm_Form_FormFields_Input":
        {
          let {
            label,
            required,
            valueType,
            minTimeValue,
            maxTimeValue,
            minValue,
            maxValue,
          } = field;
          let schema;
          switch (valueType) {
            case "range":
            case "number":
              schema = Yup.number();
              if (minValue != null) {
                schema = schema.min(
                  minValue,
                  "Värdet får inte vara mindre än ${min}",
                );
              }
              if (maxValue != null) {
                schema = schema.max(
                  maxValue,
                  "Värdet får inte vara större än ${max}",
                );
              }
              break;
            case "date":
              schema = Yup.date();
              if (minValue != null) {
                schema = schema.min(
                  minValue,
                  `Datumet får inte vara före ${String(minValue).replace(
                    /^(\d{4})(\d{2})(\d{2})$/,
                    "$1-$2-$3",
                  )}`,
                );
              }
              if (maxValue != null) {
                schema = schema.max(
                  maxValue,
                  `Datumet får inte vara efter ${String(maxValue).replace(
                    /^(\d{4})(\d{2})(\d{2})$/,
                    "$1-$2-$3",
                  )}`,
                );
              }
              break;
            case "time":
              schema = Yup.string();
              if (minTimeValue != null) {
                schema = schema.test(
                  "minTime",
                  `Tiden får inte vara före ${minTimeValue}`,
                  (value) =>
                    // We can’t be sure if the values contain seconds, so we
                    // place the digits after the decimal point before we
                    // compare them as numbers
                    Number("0." + value.replace(/\D/g, "")) >=
                    Number("0." + minTimeValue.replace(/\D/g, "")),
                );
              }
              if (maxTimeValue != null) {
                schema = schema.test(
                  "maxTime",
                  `Tiden får inte vara efter ${maxTimeValue}`,
                  (value) =>
                    // We can’t be sure if the values contain seconds, so we
                    // place the digits after the decimal point before we
                    // compare them as numbers
                    Number("0." + value.replace(/\D/g, "")) <=
                    Number("0." + maxTimeValue.replace(/\D/g, "")),
                );
              }
              break;
            // case "text":
            // case "month":
            // case "week":
            case "email":
              schema = Yup.string().email("Fyll i en giltig e-postadress");
              break;
            // case "tel":
            // case "color":
            // case "search":
            case "url":
              schema = Yup.string().url("Fyll i en giltig webbadress");
              break;
            default:
              schema = Yup.string();
          }
          schemaShape[kebabCase(label)] = setRequiredOrNullable(
            schema,
            required,
          );
        }
        break;
      case "modForm_Form_FormFields_Checkbox":
        {
          let { label, required } = field;
          schemaShape[kebabCase(label)] = setRequiredOrNullable(
            Yup.array().of(Yup.string()),
            required,
          );
        }
        break;

      case "modForm_Form_FormFields_Message":
      case "modForm_Form_FormFields_Radio":
      case "modForm_Form_FormFields_Select":
        {
          let { label, required } = field;
          schemaShape[kebabCase(label)] = setRequiredOrNullable(
            Yup.string(),
            required,
          );
        }
        break;
      default: {
        // Skip
      }
    }
  });
  return Yup.object().shape(
    schemaShape,
    // {
    // message: obj.isMessageRequired
    //   ? Yup.string().required("Du måste fylla i fältet")
    //   : Yup.string().nullable(),
    // radioGroup: obj.isRadioRequired
    //   ? Yup.string().required("Du måste välja ett alternativ")
    //   : Yup.string().nullable(),
    // select: obj.isSelectRequired
    //   ? Yup.string().required("Du måste välja ett alternativ")
    //   : Yup.string().nullable(),
    // checkboxes: obj.isCheckboxRequired
    //   ? Yup.array().required("Du måste välja ett alternativ")
    //   : Yup.array(),
    // number: Yup.number().required("Du måste fylla i fältet"),
    // color: Yup.string().required("Välj en färg"),
    // date: Yup.date().required("Du måste fylla i fältet"),
    // month: Yup.date().required("Du måste fylla i fältet"),
    // week: Yup.string().required("Du måste fylla i fältet"),
    // // range: Yup.string().required("Du måste fylla i fältet"),
    // search: Yup.string().required("Du måste fylla i fältet"),
    // time: Yup.string().required("Du måste fylla i fältet"),
    // url: Yup.string()
    //   .matches(
    //     /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    //     "Fyll i en giltig länk",
    //   )
    //   .required("Du måste fylla i fältet"),
    // }
  );
}
