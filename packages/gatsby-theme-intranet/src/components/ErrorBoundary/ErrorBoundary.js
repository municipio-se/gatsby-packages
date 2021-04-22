import React from "react";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  return <div className="c-error">{error.message}</div>;
}

const FallbackComponent =
  process.env.NODE_ENV === "development" ? ErrorFallback : null;

export default function WrappedErrorBoundary({ ...restProps }) {
  return <ErrorBoundary FallbackComponent={FallbackComponent} {...restProps} />;
}
