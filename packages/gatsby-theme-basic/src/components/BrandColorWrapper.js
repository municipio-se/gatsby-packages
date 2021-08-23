import { Global } from "@emotion/react";
import Color from "color";
import { graphql, useStaticQuery } from "gatsby";
import { kebabCase, transform } from "lodash";
import PropTypes from "prop-types";
import React from "react";

BrandColorWrapper.propTypes = {
  children: PropTypes.node,
};

export default function BrandColorWrapper({ children }) {
  let colorItems =
    useStaticQuery(graphql`
      query BrandColors {
        wp {
          ...WP_BrandColorsForHook
        }
      }
    `).wp.acfOptionsThemeOptions?.colorScheme?.brandColors || [];

  let colors = transform(
    colorItems,
    (colors, { key, value }) => (colors[key] = value),
    {},
  );

  let vars = {};

  Object.entries(colors).forEach(([key, value]) => {
    let color = Color(value);
    vars[`--brand-color-${kebabCase(key)}`] = value;
    vars[`--brand-color-${kebabCase(key)}-text`] = color.isDark(value)
      ? "white"
      : "black";
  });

  return (
    <>
      <Global
        styles={{
          ":root": vars,
        }}
      />
      {children}
    </>
  );
}
