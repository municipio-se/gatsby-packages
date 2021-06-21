import React from "react";

import UserProvider from "./src/components/UserProvider";

import "./src/fonts/index.css";

export const wrapRootElement = (
  { element, props },
  {
    auth: {
      loginURL = "/api/auth/wordpress",
      logoutURL = "/api/auth/wordpress/logout",
      userInfoURL = "/api/user",
      requireLogin = false,
    } = {},
  },
) => {
  return (
    <UserProvider
      loginURL={loginURL}
      logoutURL={logoutURL}
      userInfoURL={userInfoURL}
      requireLogin={requireLogin}
    >
      {element}
    </UserProvider>
  );
};
