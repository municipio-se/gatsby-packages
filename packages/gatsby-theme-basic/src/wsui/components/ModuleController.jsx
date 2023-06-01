import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { camelCase, upperFirst } from "lodash/fp";
import React, { Fragment } from "react";

import * as moduleComponents from "./modularity-modules";

function fromContentTypeToComponentName(contentTypeName) {
  return (
    contentTypeName &&
    upperFirst(camelCase(contentTypeName.replace(/^mod-/, ""))) + "Module"
  );
}

export default function ModuleController({ module }) {
  const moduleType = module?.contentType?.node?.name;
  const { processPageContent } = useHTMLProcessor();
  let { content, headingContent: heading } = processPageContent(
    module?.modDescription?.description,
    {
      extractHeading: true,
      leavePreamble: true,
    },
  );
  let description = <Fragment>{content}</Fragment>;
  switch (moduleType) {
    default: {
      let componentName = fromContentTypeToComponentName(moduleType);
      let Component =
        // eslint-disable-next-line import/namespace
        (componentName && moduleComponents[componentName]) ||
        // eslint-disable-next-line import/namespace
        moduleComponents.FallbackModule;
      return (
        <Component
          module={module}
          title={heading || (!module.hideTitle && module.title)}
          description={description}
        />
      );
    }
  }
}
