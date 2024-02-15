/** @jsx jsx */
import { jsx } from "@emotion/react";
import Html from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components/Html.jsx";
import {
  Box as DefaultBox,
  TypographyBlock,
  handleComponentsProp,
  useThemeProps,
} from "@wsui/base";
import { FormModule as WsuiFormModule } from "@wsui/municipio";
import Axios from "axios";

import ModuleWrapper from "../ModuleWrapper.jsx";

const axios = Axios.create({
  baseURL:
    process.env.GATSBY_WORDPRESS_JSON_URL ||
    process.env.GATSBY_WORDPRESS_URL + "/wp-json",
});

export default function FormModule(props) {
  props = useThemeProps({ props, name: "MunicipioFormModuleController" });
  let { module, components, ...restProps } = props;
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
  components = handleComponentsProp(components, {
    DisclaimerWrapper: DefaultBox,
    DisclaimerTypographyBlock: TypographyBlock,
  });
  const { DisclaimerWrapper, DisclaimerTypographyBlock } = components;

  let disclaimer =
    (submissionPublicAct && submissionPublicActContent) ||
    (gdprComplienceNotice && gdprComplienceNoticeContent) ? (
      <DisclaimerWrapper>
        <DisclaimerTypographyBlock>
          {submissionPublicAct && submissionPublicActContent ? (
            <p>{submissionPublicActContent}</p>
          ) : null}
          {gdprComplienceNotice && gdprComplienceNoticeContent ? (
            <Html>{gdprComplienceNoticeContent}</Html>
          ) : null}
        </DisclaimerTypographyBlock>
      </DisclaimerWrapper>
    ) : null;

  return (
    <ModuleWrapper title={title} {...restProps}>
      <WsuiFormModule
        fields={formFields.map(({ fieldGroupName, ...field }) => ({
          fieldType: fieldGroupName
            .replace("ModForm_Modformoptions_FormFields_", "")
            .replace(/^./, (str) => str.toLowerCase()),
          ...field,
          // For customContent fields:
          content: field.content && <Html>{field.content}</Html>,
        }))}
        disclaimer={disclaimer}
        submitButtonText={submitButtonText}
        submissionNotice={
          submissionNotice && (
            <TypographyBlock>
              <Html>{submissionNotice}</Html>
            </TypographyBlock>
          )
        }
        onSubmit={async (values, { setStatus, resetForm }) => {
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
        }}
        formProps={{ id: `modularity-form-${databaseId}` }}
        {...restProps}
      />
    </ModuleWrapper>
  );
}
