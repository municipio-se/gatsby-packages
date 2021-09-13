// import PropTypes from "prop-types";
import React from "react";

import { PostsModuleIndexItem } from "./items";
import { PostsModuleGridLayout } from "./layouts";

ItemsPostsModule.propTypes = {};

export default function ItemsPostsModule({ ...restProps }) {
  console.warn(
    `Display mode "items" is deprecated for Posts module. Use "index" instead, combined with the "grid" layout.`,
  );
  return (
    <PostsModuleGridLayout
      itemComponent={PostsModuleIndexItem}
      {...restProps}
    />
  );
}
