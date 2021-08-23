import { camelCase, upperFirst } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import * as indexLayoutComponents from "./index-layouts";

IndexPostsModule.propTypes = {
  module: PropTypes.shape({
    modPostsDataDisplay: PropTypes.shape({ layout: PropTypes.string }),
  }),
};

function fromLayoutToComponentName(layout) {
  return layout && upperFirst(camelCase(layout)) + "IndexPostsModule";
}

export default function IndexPostsModule({ module, ...restProps }) {
  const { modPostsDataDisplay: { layout = "grid" } = {} } = module;

  let componentName = fromLayoutToComponentName(layout);
  let Component =
    // eslint-disable-next-line import/namespace
    (componentName && indexLayoutComponents[componentName]) ||
    // eslint-disable-next-line import/namespace
    indexLayoutComponents.GridIndexPostsModule;
  return <Component module={module} {...restProps} />;
}
