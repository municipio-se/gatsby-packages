import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";

import userContext from "../contexts/userContext";

AccessWall.propTypes = {};

function DefaultFallbackComponent() {
  return "Logging in…";
}

export default function AccessWall({
  autoLogin,
  children,
  fallback: FallbackComponent = DefaultFallbackComponent,
  ...restProps
}) {
  const { user, login, pending } = useContext(userContext);
  useEffect(() => {
    if (!pending && !user && autoLogin) {
      login();
    }
  }, [autoLogin, !!user, login, pending]);
  if (!user) {
    return <FallbackComponent />;
  }
  return children;
}
