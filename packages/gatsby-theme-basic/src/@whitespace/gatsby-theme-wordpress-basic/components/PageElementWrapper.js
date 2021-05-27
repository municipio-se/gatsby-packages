import ParentPageElementWrapper from "@whitespace/gatsby-theme-wordpress-basic/src/components/PageElementWrapper";
import PropTypes from "prop-types";
import React from "react";

import ChildPageElementWrapper from "../../../components/PageElementWrapper";

PageElementWrapper.propTypes = {
  pageContext: PropTypes.object,
  children: PropTypes.node,
};

export default function PageElementWrapper({
  pageContext,
  children,
  ...restProps
}) {
  return (
    <ParentPageElementWrapper pageContext={pageContext} {...restProps}>
      <ChildPageElementWrapper pageContext={pageContext} {...restProps}>
        {children}
      </ChildPageElementWrapper>
    </ParentPageElementWrapper>
  );
}
