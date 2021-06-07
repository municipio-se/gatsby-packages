import React from "react";

import UserProvider from "./src/components/UserProvider";

export const wrapRootElement = (
  { element, props },
  {
    auth: {
      loginURL = "/api/auth/wordpress",
      logoutURL = "/api/auth/wordpress/logout",
      userInfoURL = "/api/user",
    } = {},
  },
) => {
  return (
    <UserProvider
      loginURL={loginURL}
      logoutURL={logoutURL}
      userInfoURL={userInfoURL}
    >
      {element}
    </UserProvider>
  );
};
