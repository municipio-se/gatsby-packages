import React from "react";

import UserProvider from "./src/components/UserProvider";

import "./src/fonts/index.css";

export const wrapRootElement = (
  { element },
  {
    auth: {
      loginURL = "/api/auth/wordpress",
      logoutURL = "/api/auth/wordpress/logout",
      userInfoURL = "/api/user",
      userSettingsURL = "/api/user-settings",
      requireLogin = false,
    } = {},
  },
) => {
  return (
    <UserProvider
      loginURL={loginURL}
      logoutURL={logoutURL}
      userInfoURL={userInfoURL}
      userSettingsURL={userSettingsURL}
      requireLogin={requireLogin}
    >
      {element}
    </UserProvider>
  );
};
