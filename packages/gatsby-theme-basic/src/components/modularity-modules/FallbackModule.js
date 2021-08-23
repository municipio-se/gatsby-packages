import PropTypes from "prop-types";
import React from "react";

import ModuleWrapper from "../ModuleWrapper";

FallbackModule.propTypes = {
  module: PropTypes.shape({
    contentType: PropTypes.shape({
      node: PropTypes.shape({ name: PropTypes.string }),
    }),
  }),
};

export default function FallbackModule({ module }) {
  // Don’t render this component in production
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const moduleType = module?.contentType?.node?.name;

  return (
    <ModuleWrapper>
      <details>
        <summary>
          <code>{`Unimplemented <${moduleType}/>`}</code>
        </summary>
        <pre>
          <code>{JSON.stringify(module, null, 2)}</code>
        </pre>
      </details>
    </ModuleWrapper>
  );
}
