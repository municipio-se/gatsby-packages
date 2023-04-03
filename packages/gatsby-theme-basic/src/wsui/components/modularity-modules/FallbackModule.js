import React from "react";

import ModuleWrapper from "../ModuleWrapper.jsx";

export default function FallbackModule({ module, title, ...restProps }) {
  const moduleType = module?.contentType?.node?.name;

  return (
    <ModuleWrapper title={title} {...restProps}>
      {process.env.NODE_ENV !== "production" && (
        <details>
          <summary>
            <code>{`Unimplemented <${moduleType}/>`}</code>
          </summary>
          <pre>
            <code>{JSON.stringify(module, null, 2)}</code>
          </pre>
        </details>
      )}
    </ModuleWrapper>
  );
}
