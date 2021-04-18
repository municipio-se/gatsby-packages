import cx from "classnames";
import React, { useRef } from "react";

export default function FileUploadField({
  required,
  multiple,
  error,
  fileTypes,
  uploadedFiles,
  setUploadedFiles,
  ...restProps
}) {
  let fileUploadRef = useRef(null);

  const files = [];

  {
    uploadedFiles &&
      uploadedFiles.forEach((file, index) => {
        files.push(<li key={index}>{file.name}</li>);
      });
  }

  return (
    <div
      className={cx(
        "c-form-field c-form-field--file",
        required && "c-form-field--required",
        error && "c-form-field--error",
      )}
      {...restProps}
    >
      <p className="c-form-field__label">{fieldLabel}</p>
      {fieldDescription && (
        <p className="c-form-field__field-description" id={fieldDescriptionId}>
          {fieldDescription}
        </p>
      )}
      <div
        className="c-form-field__field-error"
        role="region"
        id={fieldErrorsId}
        aria-label={`Felmeddelanden för ${fieldLabel}`}
        aria-live="polite"
      >
        {error && (
          <p
            className="c-form-field__field-error-message"
            id={fieldErrorMessageId}
          >
            {error.message}
          </p>
        )}
      </div>
      <div className="c-form-field__field-wrapper">
        <input
          type="file"
          name={fieldName}
          multiple={multiple}
          accept={fileTypes.join(",")}
          onChange={(e) => {
            setUploadedFiles(e.target.files);
          }}
          ref={fileUploadRef}
          required={required && "required"}
          hidden
        />
        <div className="c-form-field__field">
          <div className="c-form-field__upload-field">
            <button
              type="button"
              className="c-form-field__upload-button u-m-r--200"
              id={fieldId}
              aria-describedby={fieldDescription && fieldDescriptionId}
              aria-controls={`${fieldErrorsId} uploaded-files`}
              onClick={() => {
                fileUploadRef.current.click();
              }}
            >
              Välj {multiple ? "flera filer" : "en fil"}
            </button>
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
            className={cx(
              "c-form-field__fileslist",
              files.length && "has-children",
            )}
            aria-live="polite"
            aria-label="Valda filer"
            id="uploaded-files"
          >
            {files}
          </ol>
        </div>
      </div>
    </div>
  );
}
