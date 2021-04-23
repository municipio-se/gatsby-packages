import React from "react";

export default function DefaultPostsModule({ module }) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  return (
    <details>
      <summary>
        <code>{`Unimplemented display mode for posts module: "${module?.dataDisplay?.postsDisplayAs}"`}</code>
      </summary>
      <pre>
        <code>{JSON.stringify(module, null, 2)}</code>
      </pre>
    </details>
  );
}
