import { useSearch } from "@whitespace/gatsby-plugin-search/src/hooks";
import clsx from "clsx";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./PostsModuleFilterForm.module.css";
import PostsModuleFilterFormFields from "./PostsModuleFilterFormFields";

PostsModuleFilterForm.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function PostsModuleFilterForm({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  const { params, setParams, schema } = useSearch();

  // If there's no schema, filtering is not enabled for this module
  if (!schema) {
    return null;
  }

  return (
    <Formik
      initialValues={params}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values) => {
        setParams({ ...values, page: null });
      }}
      {...restProps}
    >
      <Form className={clsx(styles.component, className)}>
        <PostsModuleFilterFormFields />
      </Form>
    </Formik>
  );
}
