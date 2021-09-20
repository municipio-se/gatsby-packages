import { Button } from "@whitespace/components";
import clsx from "clsx";
import { Field } from "formik";
import PropTypes from "prop-types";
import React, { useRef } from "react";

import FormFieldDescription from "./FormFieldDescription";
import FormFieldError from "./FormFieldError";
import FormFieldLabel from "./FormFieldLabel";
import FormFieldWrapper from "./FormFieldWrapper";
import * as defaultStyles from "./FormFileUploadField.module.css";

FormFileUploadField.propTypes = {
  className: PropTypes.string,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  multiple: PropTypes.bool,
  setUploadedFiles: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string),
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

export default function FormFileUploadField({
  className,
  fileTypes,
  multiple,
  setUploadedFiles,
  styles = defaultStyles,
  uploadedFiles,
  ...restProps
}) {
  let fileUploadRef = useRef(null);

  return (
    <FormFieldWrapper
      className={clsx(styles.component, className)}
      {...restProps}
    >
      {({ id, name, controlProps }) => (
        <>
          <FormFieldLabel className={styles.label} />
          <FormFieldDescription className={styles.description} />
          <FormFieldError className={styles.error} />
          <div className={styles.innerWrapper}>
            <Field
              accept={fileTypes.join(",")}
              hidden
              multiple={multiple}
              name={name}
              onChange={(e) => setUploadedFiles(e.target.files)}
              ref={fileUploadRef}
              type="file"
            />
            <div className={styles.field}>
              <div className={styles.uploadField}>
                <Button
                  className={styles.uploadButton}
                  id={id("button")}
                  {...controlProps}
                  onClick={() => {
                    fileUploadRef.current.click();
                  }}
                >
                  Välj {multiple ? "flera filer" : "en fil"}
                </Button>
                {uploadedFiles.length ? (
                  <span>
                    {uploadedFiles.length > 1
                      ? uploadedFiles.length + "filer"
                      : "1 fil"}{" "}
                    har valts
                  </span>
                ) : (
                  <span>Ingen fil har valts</span>
                )}
              </div>
              <ol
                className={clsx(
                  styles.filesList,
                  uploadedFiles.length && styles.hasChildren,
                )}
                aria-live="polite"
                aria-label="Valda filer"
                id="uploaded-files"
              >
                {uploadedFiles?.map((file, index) => {
                  return <li key={index}>{file.name}</li>;
                })}
              </ol>
            </div>
          </div>
        </>
      )}
    </FormFieldWrapper>
  );
}
