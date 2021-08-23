import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";

import userContext from "../contexts/userContext";

AccessWall.propTypes = {
  autoLogin: PropTypes.bool,
  children: PropTypes.node,
  fallback: PropTypes.elementType,
};

function DefaultFallbackComponent() {
  return "Logging in…";
}

export default function AccessWall({
  autoLogin,
  children,
  fallback: FallbackComponent = DefaultFallbackComponent,
}) {
  const { user, login, pending, requireLogin } = useContext(userContext);
  useEffect(() => {
    if (requireLogin && !pending && !user && autoLogin) {
      login();
    }
  }, [requireLogin, autoLogin, !!user, login, pending]);

  if (requireLogin && !user) {
    return <FallbackComponent />;
  }
  return children;
}
