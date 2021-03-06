import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./IframeModule.module.css";

IframeModule.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
  module: PropTypes.shape({
    modIframeOptions: PropTypes.shape({
      iframeHeight: PropTypes.number,
      iframeUrl: PropTypes.string,
    }),
  }),
};

export default function IframeModule({
  styles = defaultStyles,
  className,
  title,
  module = {},
  ...restProps
}) {
  const { modIframeOptions: { iframeHeight, iframeUrl } = {} } = module;

  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      <iframe
        src={iframeUrl}
        height={iframeHeight}
        width="100%"
        frameBorder={0}
      />
    </ModuleWrapper>
  );
}
