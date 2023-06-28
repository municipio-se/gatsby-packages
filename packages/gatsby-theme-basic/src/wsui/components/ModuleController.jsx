import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { camelCase, upperFirst } from "lodash/fp";
import React from "react";

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
  // TODO: Deprecate `modDescription` in favor of `content`
  let { content, headingContent: heading } = module?.modDescription?.description
    ? processPageContent(module.modDescription.description, {
        extractHeading: !!module.hideTitle,
        leavePreamble: true,
      })
    : module?.content
    ? processPageContent(module.content, {
        extractHeading: !!module.hideTitle,
        leavePreamble: true,
        contentMedia: module.contentMedia,
        contentModularityModules: module.contentModularityModules,
        semanticHeadings: true,
      })
    : {};
  let description = content;
  let componentName = fromContentTypeToComponentName(moduleType);
  let Component =
    // eslint-disable-next-line import/namespace
    (componentName && moduleComponents[componentName]) ||
    // eslint-disable-next-line import/namespace
    moduleComponents.FallbackModule;
  return (
    <Component
      module={module}
      title={module.hideTitle ? heading : module.title}
      description={description}
    />
  );
}
