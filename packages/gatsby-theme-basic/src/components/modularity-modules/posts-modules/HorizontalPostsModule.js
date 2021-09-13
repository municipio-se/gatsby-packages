// import PropTypes from "prop-types";
import React from "react";

import { PostsModuleIndexItem } from "./items";
import { PostsModuleGridLayout } from "./layouts";

DefaultPostsModule.propTypes = {};

export default function DefaultPostsModule({ ...restProps }) {
  console.warn(
    `Display mode "horizontal" is deprecated for Posts module. Use "index" instead, combined with the "grid" layout.`,
  );
  return (
    <PostsModuleGridLayout
      itemComponent={PostsModuleIndexItem}
      {...restProps}
    />
  );
}
