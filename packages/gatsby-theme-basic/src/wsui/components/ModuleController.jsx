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
  switch (moduleType) {
    default: {
      let componentName = fromContentTypeToComponentName(moduleType);
      let Component =
        // eslint-disable-next-line import/namespace
        (componentName && moduleComponents[componentName]) ||
        // eslint-disable-next-line import/namespace
        moduleComponents.FallbackModule;
      return (
        <Component module={module} title={!module.hideTitle && module.title} />
      );
    }
  }
}
