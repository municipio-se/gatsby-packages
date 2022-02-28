import { withComponentDefaults } from "@whitespace/components";
import { WPContentNodeCard } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import PropTypes from "prop-types";
import React from "react";

PostsModuleIndexItem.propTypes = {
  item: PropTypes.object,
};

export default withComponentDefaults(
  PostsModuleIndexItem,
  "postsModuleIndexItem",
);

function PostsModuleIndexItem({
  // dateFormat = {
  //   year: "numeric",
  //   month: "numeric",
  //   day: "numeric",
  // },
  item,
  ...restProps
}) {
  return <WPContentNodeCard contentNode={item} {...restProps} />;
}
