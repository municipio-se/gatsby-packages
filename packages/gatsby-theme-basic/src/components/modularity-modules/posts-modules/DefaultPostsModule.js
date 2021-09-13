import { camelCase, upperFirst } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import * as itemComponents from "./items";
import * as layoutComponents from "./layouts";

function getComponentForDisplayMode(displayMode) {
  let componentName =
    displayMode && `PostsModule${upperFirst(camelCase(displayMode))}Item`;
  return (
    // eslint-disable-next-line import/namespace
    componentName && itemComponents[componentName]
  );
}

function getComponentForLayout(layout) {
  let componentName =
    layout && `PostsModule${upperFirst(camelCase(layout))}Layout`;
  return (
    // eslint-disable-next-line import/namespace
    componentName && layoutComponents[componentName]
  );
}

DefaultPostsModule.propTypes = {
  module: PropTypes.shape({
    modPostsDataDisplay: PropTypes.shape({ layout: PropTypes.string }),
  }),
};

export default function DefaultPostsModule({ module, ...restProps }) {
  const { modPostsDataDisplay: { layout, postsDisplayAs } = {} } = module;

  const Layout = getComponentForLayout(layout);
  if (!Layout) {
    // Don’t render this component in production
    if (process.env.NODE_ENV === "production") {
      return null;
    }

    return (
      <details>
        <summary>
          <code>
            {layout
              ? `Unimplemented "${layout}" layout for posts module`
              : `Missing layout for posts module`}
          </code>
        </summary>
        <pre>
          <code>{JSON.stringify(module, null, 2)}</code>
        </pre>
      </details>
    );
  }

  const Item = getComponentForDisplayMode(postsDisplayAs);
  if (!Item) {
    // Don’t render this component in production
    if (process.env.NODE_ENV === "production") {
      return null;
    }

    return (
      <details>
        <summary>
          <code>
            {layout
              ? `Unimplemented "${postsDisplayAs}" display mode for posts module`
              : `Missing display mode for posts module`}
          </code>
        </summary>
        <pre>
          <code>{JSON.stringify(module, null, 2)}</code>
        </pre>
      </details>
    );
  }

  return <Layout module={module} itemComponent={Item} {...restProps} />;
}
