import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import Axios from "axios";
import clsx from "clsx";
import { Formik, Form, useFormikContext } from "formik";
import React from "react";

import SectionHeader from "../SectionHeader";

import * as defaultStyles from "./FormModule.module.css";
import FormModuleCheckboxField from "./FormModuleCheckboxField";
import FormModuleCustomContentField from "./FormModuleCustomContentField";
import FormModuleInputField from "./FormModuleInputField";
import FormModuleMessageField from "./FormModuleMessageField";
import FormModuleRadioField from "./FormModuleRadioField";
import FormModuleSelectField from "./FormModuleSelectField";
import FormModuleSenderField from "./FormModuleSenderField";
import { buildInitialValues, buildSchema } from "./schema";

const axios = Axios.create({
  baseURL: process.env.GATSBY_WORDPRESS_URL,
});

function FormModuleStatus({ successMessage, failureMessage, ...restProps }) {
  const {
    status: { success, failure } = {},
    isSubmitting,
  } = useFormikContext();
  if (isSubmitting) {
    return null;
  }
  if (success) {
    return (
      <div role="alert" {...restProps}>
        {successMessage}
      </div>
    );
  }
  if (failure) {
    return (
      <div role="alert" {...restProps}>
        {failureMessage}
      </div>
    );
  }
  return null;
}

function FormModuleSubmitButton({ ...restProps }) {
  const { isSubmitting } = useFormikContext();
  return (
    <button type="submit" disabled={isSubmitting} {...restProps}>
      Skicka
    </button>
  );
}

function FormModuleField({ field, ...restProps }) {
  // TODO: Check the conditional logic when this is fixed:
  // https://github.com/helsingborg-stad/modularity-form-builder/issues/18

  // const { values } = useFormikContext();
  // if (field.conditionalLogic) {
  //   const otherField = JSON.parse(field.conditonalField);
  //   Object.entries(values).find(([name, value]) => )
  // }

  switch (field.fieldGroupName) {
    case "modForm_Form_FormFields_Sender": {
      return <FormModuleSenderField field={field} {...restProps} />;
    }
    case "modForm_Form_FormFields_Message": {
      return <FormModuleMessageField field={field} {...restProps} />;
    }
    case "modForm_Form_FormFields_Input": {
      return <FormModuleInputField field={field} {...restProps} />;
    }
    case "modForm_Form_FormFields_Radio": {
      return <FormModuleRadioField field={field} {...restProps} />;
    }
    case "modForm_Form_FormFields_Checkbox": {
      return <FormModuleCheckboxField field={field} {...restProps} />;
    }
    case "modForm_Form_FormFields_Select": {
      return <FormModuleSelectField field={field} {...restProps} />;
    }
    // case "modForm_Form_FormFields_FileUpload": {
    //   return <FormModuleFileUploadField field={field} {...restProps} />;
    // }
    case "modForm_Form_FormFields_CustomContent": {
      return <FormModuleCustomContentField field={field} {...restProps} />;
    }
  }
  return null;
}

function FormModuleFormik({
  formFields,
  submissionPublicActContent,
  gdprComplienceNoticeContent,
  submissionNotice,
  submitButtonText,
  ...restProps
}) {
  const { processContent } = useHTMLProcessor();
  return (
    <Formik {...restProps}>
      <Form>
        <div>
          {formFields.map((field, index) => {
            return <FormModuleField key={index} field={field} />;
          })}
        </div>
        <div>
          {submissionPublicActContent && <p>{submissionPublicActContent}</p>}
          {gdprComplienceNoticeContent && (
            <div>{processContent(gdprComplienceNoticeContent)}</div>
          )}
        </div>
        <FormModuleStatus
          successMessage={processContent(submissionNotice)}
          failureMessage={
            <p>
              Ett fel inträffade när formuläret skulle skickas. Prova igen
              senare.
            </p>
          }
        />
        <FormModuleSubmitButton label={submitButtonText} />
      </Form>
    </Formik>
  );
}

export default function FormModule({
  styles = defaultStyles,
  className,
  id,
  nonce,
  title,
  description,
  formFields,
  submissionNotice,
  submitButtonText,
  submissionPublicAct,
  submissionPublicActContent,
  gdprComplienceNotice,
  gdprComplienceNoticeContent,
  ...restProps
}) {
  const validationSchema = buildSchema({
    formFields,
  });
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <SectionHeader
        title={title}
        description={description}
        withBorder={true}
      />
      <FormModuleFormik
        initialValues={buildInitialValues({
          formFields,
        })}
        onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
          values["modularity-form"] = nonce;
          values["modularity-form-id"] = id;
          values["modularity-form-post-type"] = "form-submissions";
          values["modularity-form-url"] = window.location.href; // Unique identifier
          // modularity-gdpr-data
          // modularity-form-history
          values["_wp_http_referer"] = window.location.href;

          const result = await axios({
            method: "post",
            data: values,
            url: `/wp-json/modularity/mod-form/`,
          });
          if (result.data.status == "Success") {
            resetForm();
            setStatus({
              success: true,
              failure: false,
            });
          } else {
            setStatus({
              success: false,
              failure: true,
            });
          }
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
        formFields={formFields}
        submissionPublicActContent={
          submissionPublicAct ? submissionPublicActContent : null
        }
        gdprComplienceNoticeContent={
          gdprComplienceNotice ? gdprComplienceNoticeContent : null
        }
        submissionNotice={submissionNotice}
        submitButtonText={submitButtonText}
      />
    </div>
  );
}
