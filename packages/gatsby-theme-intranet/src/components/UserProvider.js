import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import userContext from "../contexts/userContext";

UserProvider.propTypes = {
  children: PropTypes.node,
  loginURL: PropTypes.string.isRequired,
  logoutURL: PropTypes.string.isRequired,
  requireLogin: PropTypes.bool,
  userInfoURL: PropTypes.string.isRequired,
  userSettingsURL: PropTypes.string,
};

export default function UserProvider({
  children,
  loginURL,
  logoutURL,
  requireLogin,
  userInfoURL,
  userSettingsURL,
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

  const userSettings = useMemo(() => user?.settings, [JSON.stringify(user)]);

  const setUserSettings = useCallback(
    async (newValue) => {
      if (!userSettingsURL || !user) {
        return;
      }
      if (typeof newValue === "function") {
        newValue = newValue(userSettings);
      }
      try {
        setUser({ ...user, settings: newValue });
        let response = await window.fetch(userSettingsURL, {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValue),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (error) {
        //
      }
    },
    [userSettingsURL, JSON.stringify(user), JSON.stringify(userSettings)],
  );

  return (
    <Provider
      value={{
        user,
        pending,
        logout,
        login,
        userInfoURL,
        loginURL,
        logoutURL,
        requireLogin,
        userSettings,
        setUserSettings,
      }}
    >
      {children}
    </Provider>
  );
}
