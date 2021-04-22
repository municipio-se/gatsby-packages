import React from "react";

export default function FallbackModule({ module }) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  const moduleType = module?.contentType?.node?.name;
  return (
    <details>
      <summary>
        <code>{`Unimplemented <${moduleType}/>`}</code>
      </summary>
      <pre>
        <code>{JSON.stringify(module, null, 2)}</code>
      </pre>
    </details>
  );
}
