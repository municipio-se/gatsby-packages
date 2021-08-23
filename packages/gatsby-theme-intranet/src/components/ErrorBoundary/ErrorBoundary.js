import PropTypes from "prop-types";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

ErrorFallback.propTypes = {
  error: PropTypes.shape({ message: PropTypes.node }),
};

function ErrorFallback({ error }) {
  return <div className="c-error">{error.message}</div>;
}

const FallbackComponent =
  process.env.NODE_ENV === "development" ? ErrorFallback : null;

export default function WrappedErrorBoundary({ ...restProps }) {
  return <ErrorBoundary FallbackComponent={FallbackComponent} {...restProps} />;
}
