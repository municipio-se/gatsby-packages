// import PropTypes from "prop-types";
import React from "react";

import { PostsModuleIndexItem } from "./items";
import { PostsModuleMixedLayout } from "./layouts";

NewsPostsModule.propTypes = {};

export default function NewsPostsModule({ ...restProps }) {
  console.warn(
    `Display mode "news" is deprecated for Posts module. Use "index" instead, combined with the "mixed" layout.`,
  );
  return (
    <PostsModuleMixedLayout
      itemComponent={PostsModuleIndexItem}
      {...restProps}
    />
  );
}
