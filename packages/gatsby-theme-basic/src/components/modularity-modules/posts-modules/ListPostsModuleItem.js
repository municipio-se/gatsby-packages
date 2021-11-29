import { withComponentDefaults } from "@whitespace/components";
import { WPContentNodeTeaser } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import PropTypes from "prop-types";
import React from "react";

ListPostsModuleItem.propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.objectOf(PropTypes.string),
  item: PropTypes.any,
  teaserStyles: PropTypes.objectOf(PropTypes.string),
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(
  ListPostsModuleItem,
  "listPostsModuleItem",
);

function ListPostsModuleItem({ item, ...restProps }) {
  return <WPContentNodeTeaser contentNode={item} {...restProps} />;
}
