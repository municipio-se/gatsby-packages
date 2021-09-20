import ModuleWrapper from "@municipio/gatsby-theme-basic/src/components/ModuleWrapper";
import { Button } from "@whitespace/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import Axios from "axios";
import clsx from "clsx";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./FormModule.module.css";
import FormModuleCheckboxField from "./FormModuleCheckboxField";
import FormModuleCustomContentField from "./FormModuleCustomContentField";
import FormModuleInputField from "./FormModuleInputField";
import FormModuleMessageField from "./FormModuleMessageField";
import FormModuleRadioField from "./FormModuleRadioField";
import FormModuleSelectField from "./FormModuleSelectField";
import FormModuleSenderField from "./FormModuleSenderField";
import { buildInitialValues, buildSchema } from "./schema";

FormModule.propTypes = {
  module: PropTypes.shape({
    databaseId: PropTypes.string,
    nonce: PropTypes.string,
    title: PropTypes.string,
    modFormOptions: PropTypes.shape({
      formFields: PropTypes.arrayOf(PropTypes.object),
      submissionNotice: PropTypes.string,
      submitButtonText: PropTypes.string,
      submissionPublicAct: PropTypes.bool,
      submissionPublicActContent: PropTypes.string,
      gdprComplienceNotice: PropTypes.bool,
      gdprComplienceNoticeContent: PropTypes.string,
    }),
  }),
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

const axios = Axios.create({
  baseURL:
    process.env.GATSBY_WORDPRESS_JSON_URL ||
    process.env.GATSBY_WORDPRESS_URL + "/wp-json",
});

// eslint-disable-next-line react/prop-types
function FormModuleField({ field, ...restProps }) {
  // TODO: Check the conditional logic when this is fixed:
  // https://github.com/helsingborg-stad/modularity-form-builder/issues/18

  // const { values } = useFormikContext();
  // if (field.conditionalLogic) {
  //   const otherField = JSON.parse(field.conditonalField);
  //   Object.entries(values).find(([name, value]) => )
  // }

  // eslint-disable-next-line react/prop-types
  switch (field.fieldGroupName) {
    case "ModForm_Modformoptions_FormFields_Sender": {
      return <FormModuleSenderField field={field} {...restProps} />;
    }
    case "ModForm_Modformoptions_FormFields_Message": {
      return <FormModuleMessageField field={field} {...restProps} />;
    }
    case "ModForm_Modformoptions_FormFields_Input": {
      return <FormModuleInputField field={field} {...restProps} />;
    }
    case "ModForm_Modformoptions_FormFields_Radio": {
      return <FormModuleRadioField field={field} {...restProps} />;
    }
    case "ModForm_Modformoptions_FormFields_Checkbox": {
      return <FormModuleCheckboxField field={field} {...restProps} />;
    }
    case "ModForm_Modformoptions_FormFields_Select": {
      return <FormModuleSelectField field={field} {...restProps} />;
    }
    // case "ModForm_Modformoptions_FormFields_FileUpload": {
    //   return <FormModuleFileUploadField field={field} {...restProps} />;
    // }
    case "ModForm_Modformoptions_FormFields_CustomContent": {
      return <FormModuleCustomContentField field={field} {...restProps} />;
    }
  }
  return null;
}

export default function FormModule({
  module,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  let {
    databaseId,
    nonce,
    title,
    modFormOptions: {
      formFields,
      submissionNotice,
      submitButtonText,
      submissionPublicAct,
      submissionPublicActContent,
      gdprComplienceNotice,
      gdprComplienceNoticeContent,
    },
  } = module;

  const validationSchema = buildSchema({
    formFields,
  });

  const { processContent } = useHTMLProcessor();

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <Formik
        initialValues={buildInitialValues({
          formFields,
        })}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
          values["modularity-form"] = nonce;
          values["modularity-form-id"] = databaseId;
          values["modularity-form-post-type"] = "form-submissions";
          values["modularity-form-url"] = window.location.href; // Unique identifier
          // modularity-gdpr-data
          // modularity-form-history
          values["_wp_http_referer"] = window.location.href;

          const result = await axios({
            method: "post",
            data: values,
            url: `/modularity/mod-form/`,
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
        {...restProps}
      >
        {({ isSubmitting, status: { success, failure } = {} }) => (
          <Form className={styles.form}>
            <div className={styles.fieldWrapper}>
              {formFields.map((field, index) => {
                return <FormModuleField key={index} field={field} />;
              })}
            </div>
            <div className={styles.gdprWrapper}>
              {!!(submissionPublicAct && submissionPublicActContent) && (
                <p className={styles.gdprText}>{submissionPublicActContent}</p>
              )}
              {!!(gdprComplienceNotice && gdprComplienceNoticeContent) && (
                <div className={styles.gdprText}>
                  {processContent(gdprComplienceNoticeContent)}
                </div>
              )}
            </div>

            {isSubmitting ? null : success ? (
              <div
                role="alert"
                className="alert alert--success o-content"
                {...restProps}
              >
                {processContent(submissionNotice)}
              </div>
            ) : failure ? (
              <div
                role="alert"
                className="alert alert--error o-content"
                {...restProps}
              >
                <p>
                  Ett fel inträffade när formuläret skulle skickas. Prova igen
                  senare.
                </p>
              </div>
            ) : null}

            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              {...restProps}
            >
              {submitButtonText || "Skicka"}
            </Button>
          </Form>
        )}
      </Formik>
    </ModuleWrapper>
  );
}
