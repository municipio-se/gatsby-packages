import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

import userContext from "../contexts/userContext";

UserProvider.propTypes = {};

export default function UserProvider({
  children,
  userInfoURL,
  loginURL,
  logoutURL,
}) {
  const { Provider } = userContext;
  const [user, setUser] = useState();
  const [pending, setPending] = useState(true);

  const pollUser = useCallback(async () => {
    let response, user;
    try {
      response = await window.fetch(userInfoURL);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      user = await response.json();
      setUser(user);
    } catch (error) {
      //
    }
    setPending(false);
  }, [userInfoURL]);

  useEffect(() => {
    pollUser();
    let id = setInterval(pollUser, 10 * 1000);
    () => {
      clearInterval(id);
    };
  }, [pollUser]);

  const login = useCallback(() => {
    let redirectURL = new URL(loginURL, window.location.origin);
    redirectURL.searchParams.set("returnTo", window.location.href);
    window.location = redirectURL.href;
  }, [user?.wordpress?.profile?.username, loginURL]);

  const logout = useCallback(() => {
    let redirectURL = new URL(logoutURL, window.location.origin);
    redirectURL.searchParams.set("returnTo", window.location.href);
    window.location = redirectURL.href;
  }, [logoutURL]);

  return (
    <Provider
      value={{ user, pending, logout, login, userInfoURL, loginURL, logoutURL }}
    >
      {children}
    </Provider>
  );
}
