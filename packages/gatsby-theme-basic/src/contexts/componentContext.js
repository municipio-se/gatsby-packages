import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";

const contexts = {};

export function getComponentContext(identifier) {
  if (!contexts[identifier]) {
    contexts[identifier] = createContext();
  }
  return contexts[identifier];
}

ComponentProvider.propTypes = {
  children: PropTypes.node,
  component: PropTypes.string.isRequired,
  props: PropTypes.object,
};

export function ComponentProvider({ children, component, props }) {
  const { Provider } = getComponentContext(component);
  return <Provider value={props}>{children}</Provider>;
}

export function useComponentContext(component) {
  const value = useContext(getComponentContext(component));
  if (value == null && process.env.NODE_ENV !== "production") {
    console.warn(
      new Error(
        `Tried to fetch component context outside "${component}" component`,
      ),
    );
  }
  return value || {};
}

export function useComponentStyles(component, defaultStyles = {}) {
  let { styles = defaultStyles } = useComponentContext(component);
  return styles;
}
