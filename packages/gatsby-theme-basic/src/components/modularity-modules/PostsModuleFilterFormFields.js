import SearchFormField from "@whitespace/gatsby-plugin-search/src/components/SearchFormField";
import React from "react";

PostsModuleFilterFormFields.propTypes = {};

export default function PostsModuleFilterFormFields() {
  return (
    <>
      <SearchFormField param="tags" />
    </>
  );
}
