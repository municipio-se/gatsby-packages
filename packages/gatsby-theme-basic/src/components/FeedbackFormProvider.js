import { useLocation } from "@gatsbyjs/reach-router";
import { useHasMounted } from "@whitespace/gatsby-hooks";
import { differenceInDays, differenceInMinutes } from "date-fns";
import { produce } from "immer";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import createPersistedState from "use-persisted-state";

import feedbackFormContext from "../contexts/feedbackFormContext";

FeedbackFormProvider.propTypes = {
  eventName: PropTypes.string,
  children: PropTypes.node,
};

const usePersistedState = createPersistedState(
  "@municipio/gatsby-theme-basic/FeedbackForm",
);

export default function FeedbackFormProvider({
  eventName,
  children,
  ...restProps
}) {
  const hasMounted = useHasMounted();
  const location = useLocation();
  const [reactions, setReactions] = usePersistedState([]);
  const react = useCallback(
    (reaction) => {
      window._paq.push(["trackEvent", "Reaction", reaction, eventName]);
      setReactions(
        produce((reactions) => {
          reactions.push({
            pathname: location.pathname,
            reaction,
            date: new Date().toISOString(),
          });
        }),
      );
    },
    [location.pathname, eventName],
  );

  let canReact = hasMounted && typeof window !== "undefined" && !!window._paq;

  let previousReactions =
    reactions?.filter((reaction) => reaction.pathname === location.pathname) ||
    [];

  let reactedJustNow = previousReactions.some(
    (reaction) => differenceInMinutes(new Date(), new Date(reaction.date)) < 15,
  );

  let hasRecentReaction = previousReactions.some(
    (reaction) => differenceInDays(new Date(), new Date(reaction.date)) < 2,
  );

  let value = {
    // reactions,
    canReact,
    react,
    previousReactions,
    reactedJustNow,
    hasRecentReaction,
  };
  return (
    <feedbackFormContext.Provider value={value} {...restProps}>
      {children}
    </feedbackFormContext.Provider>
  );
}
